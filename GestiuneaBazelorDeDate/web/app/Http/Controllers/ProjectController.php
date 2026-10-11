<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use App\Models\Status;
use App\Models\Priority;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::with(['owner', 'members', 'tasks.status'])->withCount('tasks');

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('project_key', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $projects = $query->orderBy('created_at', 'desc')->paginate(9);

        return view('projects.index', compact('projects'));
    }

    public function create()
    {
        $users = User::where('status', 'active')->orderBy('name')->get();
        return view('projects.create', compact('users'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_key' => 'required|string|max:10|unique:projects,project_key',
            'name' => 'required|string|max:150',
            'description' => 'nullable|string',
            'owner_id' => 'required|exists:users,id',
            'status' => 'required|in:planning,active,paused,completed',
            'priority' => 'required|in:low,medium,high,critical',
            'start_date' => 'nullable|date',
            'due_date' => 'nullable|date|after_or_equal:start_date',
            'budget' => 'nullable|numeric|min:0',
            'members' => 'nullable|array',
            'members.*' => 'exists:users,id',
        ]);

        $validated['project_key'] = strtoupper(trim($validated['project_key']));

        DB::transaction(function () use ($validated, $request) {
            $project = Project::create($validated);

            // Adaugare owner ca membru lead
            $project->members()->attach($validated['owner_id'], ['project_role' => 'lead']);

            // Adaugare membri selectati
            if ($request->has('members')) {
                foreach ($request->members as $memberId) {
                    if ($memberId != $validated['owner_id']) {
                        $project->members()->attach($memberId, ['project_role' => 'contributor']);
                    }
                }
            }
        });

        return redirect()->route('projects.index')->with('success', 'Proiectul a fost creat cu succes!');
    }

    public function show(Project $project)
    {
        $project->load(['owner', 'members', 'tasks.status', 'tasks.priority', 'tasks.assignee', 'tasks.tags']);
        
        $statuses = Status::orderBy('position')->get();
        $priorities = Priority::orderBy('level')->get();
        $tags = Tag::all();
        $users = User::where('status', 'active')->get();

        // Grupare taskuri pe coloanele Kanban din statusuri
        $kanbanColumns = [];
        foreach ($statuses as $status) {
            $kanbanColumns[$status->id] = [
                'status' => $status,
                'tasks' => $project->tasks->where('status_id', $status->id)->sortBy('position')
            ];
        }

        return view('projects.show', compact('project', 'statuses', 'priorities', 'tags', 'users', 'kanbanColumns'));
    }

    public function edit(Project $project)
    {
        $users = User::where('status', 'active')->orderBy('name')->get();
        $project->load('members');
        return view('projects.edit', compact('project', 'users'));
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'description' => 'nullable|string',
            'owner_id' => 'required|exists:users,id',
            'status' => 'required|in:planning,active,paused,completed',
            'priority' => 'required|in:low,medium,high,critical',
            'start_date' => 'nullable|date',
            'due_date' => 'nullable|date',
            'budget' => 'nullable|numeric|min:0',
            'members' => 'nullable|array',
            'members.*' => 'exists:users,id',
        ]);

        DB::transaction(function () use ($validated, $project, $request) {
            $project->update($validated);

            if ($request->has('members')) {
                $syncData = [];
                foreach ($request->members as $memberId) {
                    $role = ($memberId == $validated['owner_id']) ? 'lead' : 'contributor';
                    $syncData[$memberId] = ['project_role' => $role];
                }
                $project->members()->sync($syncData);
            }
        });

        return redirect()->route('projects.show', $project)->with('success', 'Proiectul a fost actualizat cu succes!');
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return redirect()->route('projects.index')->with('success', 'Proiectul a fost şters din sistem.');
    }
}
