<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function index()
    {
        // 1. Raport SQL Complex 1: Metrici Proiecte şi Procentaj de Progres
        $projectMetrics = DB::table('projects as p')
            ->leftJoin('tasks as t', 'p.id', '=', 't.project_id')
            ->leftJoin('statuses as s', 't.status_id', '=', 's.id')
            ->select(
                'p.id',
                'p.project_key',
                'p.name as project_name',
                'p.status as project_status',
                'p.budget',
                'p.due_date',
                DB::raw('COUNT(t.id) as total_tasks'),
                DB::raw('SUM(CASE WHEN s.is_final = 1 THEN 1 ELSE 0 END) as completed_tasks'),
                DB::raw('SUM(CASE WHEN s.is_final = 0 THEN 1 ELSE 0 END) as open_tasks'),
                DB::raw('SUM(CASE WHEN t.due_date < CURDATE() AND s.is_final = 0 THEN 1 ELSE 0 END) as overdue_tasks'),
                DB::raw('COALESCE(SUM(t.story_points), 0) as total_story_points'),
                DB::raw('COALESCE(SUM(CASE WHEN s.is_final = 1 THEN t.story_points ELSE 0 END), 0) as completed_story_points'),
                DB::raw('ROUND(CASE WHEN COUNT(t.id) = 0 THEN 0 ELSE (SUM(CASE WHEN s.is_final = 1 THEN 1 ELSE 0 END) / COUNT(t.id)) * 100 END, 1) as progress_percentage')
            )
            ->groupBy('p.id', 'p.project_key', 'p.name', 'p.status', 'p.budget', 'p.due_date')
            ->orderBy('p.id')
            ->get();

        // 2. Raport SQL Complex 2: Încărcarea Membrilor Echipei (Workload)
        $teamWorkload = DB::table('users as u')
            ->join('roles as r', 'u.role_id', '=', 'r.id')
            ->leftJoin('tasks as t', 'u.id', '=', 't.assignee_id')
            ->leftJoin('statuses as s', 't.status_id', '=', 's.id')
            ->select(
                'u.id as user_id',
                'u.name as user_name',
                'u.title as job_title',
                'r.name as role_name',
                DB::raw('COUNT(t.id) as total_assigned'),
                DB::raw('SUM(CASE WHEN s.is_final = 0 OR s.id IS NULL THEN 1 ELSE 0 END) as active_tasks'),
                DB::raw('SUM(CASE WHEN s.is_final = 1 THEN 1 ELSE 0 END) as completed_tasks'),
                DB::raw('COALESCE(SUM(CASE WHEN s.is_final = 0 THEN t.story_points ELSE 0 END), 0) as active_story_points'),
                DB::raw('COALESCE(SUM(t.logged_hours), 0) as total_logged_hours')
            )
            ->groupBy('u.id', 'u.name', 'u.title', 'r.name')
            ->orderBy('active_story_points', 'desc')
            ->get();

        // 3. Raport SQL Complex 3: Taskuri Restante (Overdue) cu diferenţa de zile
        $overdueTasks = DB::table('tasks as t')
            ->join('projects as p', 't.project_id', '=', 'p.id')
            ->join('statuses as s', 't.status_id', '=', 's.id')
            ->join('priorities as pr', 't.priority_id', '=', 'pr.id')
            ->leftJoin('users as u', 't.assignee_id', '=', 'u.id')
            ->where('t.due_date', '<', DB::raw('CURDATE()'))
            ->where('s.is_final', '=', 0)
            ->select(
                't.id',
                't.task_key',
                't.title as task_title',
                't.type',
                't.due_date',
                'p.name as project_name',
                's.name as status_name',
                's.color_hex as status_color',
                'pr.name as priority_name',
                'pr.color_hex as priority_color',
                'u.name as assignee_name',
                DB::raw('DATEDIFF(CURDATE(), t.due_date) as days_overdue')
            )
            ->orderBy('days_overdue', 'desc')
            ->get();

        // 4. Raport SQL Agregat 4: Distribuţia tipurilor de tichete (Bug vs Feature etc.)
        $tasksByType = DB::table('tasks')
            ->select('type', DB::raw('COUNT(id) as count'), DB::raw('AVG(story_points) as avg_points'), DB::raw('SUM(logged_hours) as total_hours'))
            ->groupBy('type')
            ->get();

        return view('reports.index', compact(
            'projectMetrics',
            'teamWorkload',
            'overdueTasks',
            'tasksByType'
        ));
    }
}
