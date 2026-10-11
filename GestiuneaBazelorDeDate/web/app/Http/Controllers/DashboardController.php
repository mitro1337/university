<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use App\Models\ActivityLog;
use App\Models\Status;
use App\Models\Priority;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        // 1. Statistici agregate de top
        $totalProjects = Project::count();
        $activeProjects = Project::where('status', 'active')->count();
        $totalTasks = Task::count();
        
        $completedTasksCount = Task::whereHas('status', function ($q) {
            $q->where('is_final', true);
        })->count();

        $openTasksCount = $totalTasks - $completedTasksCount;

        $overdueTasksCount = Task::where('due_date', '<', now())
            ->whereHas('status', function ($q) {
                $q->where('is_final', false);
            })->count();

        $totalMembers = User::where('status', 'active')->count();

        // 2. Raport SQL Agregat: Distribuţia taskurilor pe stări (GROUP BY cu JOIN)
        $tasksByStatus = DB::table('statuses')
            ->leftJoin('tasks', 'statuses.id', '=', 'tasks.status_id')
            ->select('statuses.name', 'statuses.color_hex', 'statuses.category', DB::raw('COUNT(tasks.id) as total'))
            ->groupBy('statuses.id', 'statuses.name', 'statuses.color_hex', 'statuses.category', 'statuses.position')
            ->orderBy('statuses.position')
            ->get();

        // 3. Raport SQL Agregat: Distribuţia taskurilor pe priorităţi
        $tasksByPriority = DB::table('priorities')
            ->leftJoin('tasks', 'priorities.id', '=', 'tasks.priority_id')
            ->select('priorities.name', 'priorities.color_hex', 'priorities.level', DB::raw('COUNT(tasks.id) as total'))
            ->groupBy('priorities.id', 'priorities.name', 'priorities.color_hex', 'priorities.level')
            ->orderBy('priorities.level', 'desc')
            ->get();

        // 4. Proiecte recente cu progres
        $recentProjects = Project::with(['owner', 'tasks.status'])
            ->withCount('tasks')
            ->orderBy('created_at', 'desc')
            ->take(4)
            ->get();

        // 5. Ultimele activităţi din Audit Trail
        $recentActivities = ActivityLog::with(['user', 'task.project'])
            ->orderBy('created_at', 'desc')
            ->take(8)
            ->get();

        return view('dashboard.index', compact(
            'totalProjects',
            'activeProjects',
            'totalTasks',
            'completedTasksCount',
            'openTasksCount',
            'overdueTasksCount',
            'totalMembers',
            'tasksByStatus',
            'tasksByPriority',
            'recentProjects',
            'recentActivities'
        ));
    }
}
