<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Project;
use App\Models\Status;
use App\Models\Priority;
use App\Models\Tag;
use App\Models\User;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $query = Task::with(['project', 'status', 'priority', 'assignee', 'tags']);

        if ($request->filled('project_id')) {
            $query->where('project_id', $request->project_id);
        }

        if ($request->filled('status_id')) {
            $query->where('status_id', $request->status_id);
        }

        if ($request->filled('priority_id')) {
            $query->where('priority_id', $request->priority_id);
        }

        if ($request->filled('assignee_id')) {
            $query->where('assignee_id', $request->assignee_id);
        }

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('task_key', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $tasks = $query->orderBy('created_at', 'desc')->paginate(15);
        $projects = Project::orderBy('name')->get();
        $statuses = Status::orderBy('position')->get();
        $priorities = Priority::orderBy('level')->get();
        $users = User::where('status', 'active')->orderBy('name')->get();

        return view('tasks.index', compact('tasks', 'projects', 'statuses', 'priorities', 'users'));
    }

    public function create(Request $request)
    {
        $projects = Project::orderBy('name')->get();
        $statuses = Status::orderBy('position')->get();
        $priorities = Priority::orderBy('level')->get();
        $tags = Tag::all();
        $users = User::where('status', 'active')->orderBy('name')->get();
        $selectedProjectId = $request->get('project_id');

        return view('tasks.create', compact('projects', 'statuses', 'priorities', 'tags', 'users', 'selectedProjectId'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status_id' => 'required|exists:statuses,id',
            'priority_id' => 'required|exists:priorities,id',
            'assignee_id' => 'nullable|exists:users,id',
            'type' => 'required|in:task,bug,feature,improvement',
            'story_points' => 'nullable|integer|min:0|max:100',
            'estimated_hours' => 'nullable|numeric|min:0',
            'due_date' => 'nullable|date',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
        ]);

        $project = Project::findOrFail($validated['project_id']);
        $creatorId = Auth::id() ?? 1; // Fallback la admin daca nu e sesiune activa

        // Generare automata cheie unica task (ex: GBD-9)
        $countTasks = Task::where('project_id', $project->id)->count() + 1;
        $taskKey = $project->project_key . '-' . $countTasks;

        while (Task::where('task_key', $taskKey)->exists()) {
            $countTasks++;
            $taskKey = $project->project_key . '-' . $countTasks;
        }

        $validated['task_key'] = $taskKey;
        $validated['creator_id'] = $creatorId;

        $task = DB::transaction(function () use ($validated, $request, $creatorId) {
            $task = Task::create($validated);

            if ($request->has('tags')) {
                $task->tags()->sync($request->tags);
            }

            // Inregistrare in Audit Trail
            ActivityLog::create([
                'task_id' => $task->id,
                'user_id' => $creatorId,
                'action' => 'created',
                'description' => "Taskul a fost creat cu cheia {$task->task_key}",
            ]);

            return $task;
        });

        return redirect()->route('projects.show', $project->id)->with('success', "Taskul {$task->task_key} a fost creat cu succes!");
    }

    public function show(Task $task)
    {
        $task->load([
            'project.owner',
            'status',
            'priority',
            'creator',
            'assignee',
            'tags',
            'comments.user',
            'activityLogs.user'
        ]);

        $statuses = Status::orderBy('position')->get();
        $priorities = Priority::orderBy('level')->get();
        $users = User::where('status', 'active')->orderBy('name')->get();

        return view('tasks.show', compact('task', 'statuses', 'priorities', 'users'));
    }

    public function edit(Task $task)
    {
        $projects = Project::orderBy('name')->get();
        $statuses = Status::orderBy('position')->get();
        $priorities = Priority::orderBy('level')->get();
        $tags = Tag::all();
        $users = User::where('status', 'active')->orderBy('name')->get();

        return view('tasks.edit', compact('task', 'projects', 'statuses', 'priorities', 'tags', 'users'));
    }

    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status_id' => 'required|exists:statuses,id',
            'priority_id' => 'required|exists:priorities,id',
            'assignee_id' => 'nullable|exists:users,id',
            'type' => 'required|in:task,bug,feature,improvement',
            'story_points' => 'nullable|integer|min:0|max:100',
            'estimated_hours' => 'nullable|numeric|min:0',
            'logged_hours' => 'nullable|numeric|min:0',
            'due_date' => 'nullable|date',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
        ]);

        $userId = Auth::id() ?? 1;

        DB::transaction(function () use ($validated, $task, $request, $userId) {
            $oldStatusId = $task->status_id;
            $oldPriorityId = $task->priority_id;
            $oldAssigneeId = $task->assignee_id;

            // Audit Trail pentru schimbare stare
            if ($oldStatusId != $validated['status_id']) {
                $oldStatus = Status::find($oldStatusId);
                $newStatus = Status::find($validated['status_id']);
                ActivityLog::create([
                    'task_id' => $task->id,
                    'user_id' => $userId,
                    'action' => 'status_changed',
                    'field_name' => 'status_id',
                    'old_value' => $oldStatus->name ?? '',
                    'new_value' => $newStatus->name ?? '',
                    'description' => "Starea a fost schimbată din '{$oldStatus->name}' în '{$newStatus->name}'",
                ]);

                if ($newStatus && $newStatus->is_final) {
                    $validated['completed_at'] = now();
                } else {
                    $validated['completed_at'] = null;
                }
            }

            // Audit Trail pentru schimbare prioritate
            if ($oldPriorityId != $validated['priority_id']) {
                $oldPriority = Priority::find($oldPriorityId);
                $newPriority = Priority::find($validated['priority_id']);
                ActivityLog::create([
                    'task_id' => $task->id,
                    'user_id' => $userId,
                    'action' => 'priority_updated',
                    'field_name' => 'priority_id',
                    'old_value' => $oldPriority->name ?? '',
                    'new_value' => $newPriority->name ?? '',
                    'description' => "Prioritatea a fost schimbată din '{$oldPriority->name}' în '{$newPriority->name}'",
                ]);
            }

            // Audit Trail pentru reatribuire
            if ($oldAssigneeId != $validated['assignee_id']) {
                $oldUser = User::find($oldAssigneeId);
                $newUser = User::find($validated['assignee_id']);
                ActivityLog::create([
                    'task_id' => $task->id,
                    'user_id' => $userId,
                    'action' => 'assignee_changed',
                    'field_name' => 'assignee_id',
                    'old_value' => $oldUser->name ?? 'Neatribuit',
                    'new_value' => $newUser->name ?? 'Neatribuit',
                    'description' => "Responsabilul a fost schimbat din '" . ($oldUser->name ?? 'Neatribuit') . "' în '" . ($newUser->name ?? 'Neatribuit') . "'",
                ]);
            }

            $task->update($validated);

            if ($request->has('tags')) {
                $task->tags()->sync($request->tags);
            }
        });

        return redirect()->route('tasks.show', $task)->with('success', 'Taskul a fost actualizat!');
    }

    public function updateStatus(Request $request, Task $task)
    {
        $request->validate([
            'status_id' => 'required|exists:statuses,id',
        ]);

        $userId = Auth::id() ?? 1;
        $oldStatus = $task->status;
        $newStatus = Status::findOrFail($request->status_id);

        if ($oldStatus->id != $newStatus->id) {
            $task->status_id = $newStatus->id;
            $task->completed_at = $newStatus->is_final ? now() : null;
            $task->save();

            ActivityLog::create([
                'task_id' => $task->id,
                'user_id' => $userId,
                'action' => 'status_changed',
                'field_name' => 'status_id',
                'old_value' => $oldStatus->name,
                'new_value' => $newStatus->name,
                'description' => "Mutat în coloana '{$newStatus->name}'",
            ]);
        }

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'message' => 'Stare actualizată!']);
        }

        return back()->with('success', "Starea taskului {$task->task_key} a fost actualizată!");
    }

    public function destroy(Task $task)
    {
        $projectId = $task->project_id;
        $task->delete();
        return redirect()->route('projects.show', $projectId)->with('success', 'Taskul a fost şters.');
    }
}
