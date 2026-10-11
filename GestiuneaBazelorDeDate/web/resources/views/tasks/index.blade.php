@extends('layouts.app')

@section('title', 'All Issues')
@section('page_title', 'All Issues')

@section('content')
<div class="space-y-6 max-w-7xl mx-auto">

    <!-- FILTERS -->
    <div class="bg-darkbg-card border border-darkbg-border p-4 rounded-xl">
        <form action="{{ route('tasks.index') }}" method="GET" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            <div class="lg:col-span-2 relative">
                <input type="text" name="search" value="{{ request('search') }}" placeholder="Search issue, key, or description..." 
                       class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500">
                <svg class="w-4 h-4 text-slate-400 absolute left-2.5 top-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
            </div>

            <select name="project_id" onchange="this.form.submit()" class="bg-darkbg-surface border border-darkbg-border rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500">
                <option value="">All Projects</option>
                @foreach($projects as $p)
                    <option value="{{ $p->id }}" {{ request('project_id') == $p->id ? 'selected' : '' }}>{{ $p->project_key }} - {{ $p->name }}</option>
                @endforeach
            </select>

            <select name="status_id" onchange="this.form.submit()" class="bg-darkbg-surface border border-darkbg-border rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500">
                <option value="">All Statuses</option>
                @foreach($statuses as $st)
                    <option value="{{ $st->id }}" {{ request('status_id') == $st->id ? 'selected' : '' }}>{{ $st->name }}</option>
                @endforeach
            </select>

            <select name="priority_id" onchange="this.form.submit()" class="bg-darkbg-surface border border-darkbg-border rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500">
                <option value="">All Priorities</option>
                @foreach($priorities as $pr)
                    <option value="{{ $pr->id }}" {{ request('priority_id') == $pr->id ? 'selected' : '' }}>{{ $pr->name }}</option>
                @endforeach
            </select>

            <select name="assignee_id" onchange="this.form.submit()" class="bg-darkbg-surface border border-darkbg-border rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500">
                <option value="">All Assignees</option>
                @foreach($users as $u)
                    <option value="{{ $u->id }}" {{ request('assignee_id') == $u->id ? 'selected' : '' }}>{{ $u->name }}</option>
                @endforeach
            </select>
        </form>
    </div>

    <!-- ISSUES TABLE -->
    <div class="bg-darkbg-card border border-darkbg-border rounded-xl overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
                <thead>
                    <tr class="border-b border-darkbg-border bg-darkbg-surface/50 text-slate-400 font-semibold uppercase tracking-wider">
                        <th class="py-3 px-4">Key</th>
                        <th class="py-3 px-4">Title</th>
                        <th class="py-3 px-4">Project</th>
                        <th class="py-3 px-4">Status</th>
                        <th class="py-3 px-4">Priority</th>
                        <th class="py-3 px-4">Assignee</th>
                        <th class="py-3 px-4 text-center">SP</th>
                        <th class="py-3 px-4">Due Date</th>
                        <th class="py-3 px-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-darkbg-border">
                    @forelse($tasks as $task)
                    <tr class="hover:bg-darkbg-hover/50 transition">
                        <td class="py-3 px-4 font-semibold text-indigo-400">
                            <a href="{{ route('tasks.show', $task) }}" class="hover:underline">{{ $task->task_key }}</a>
                        </td>
                        <td class="py-3 px-4">
                            <a href="{{ route('tasks.show', $task) }}" class="font-medium text-white hover:text-indigo-300 transition">
                                {{ $task->title }}
                            </a>
                        </td>
                        <td class="py-3 px-4 text-slate-400">
                            <a href="{{ route('projects.show', $task->project) }}" class="hover:underline">
                                {{ $task->project->project_key }}
                            </a>
                        </td>
                        <td class="py-3 px-4">
                            <span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                                {{ $task->status->name }}
                            </span>
                        </td>
                        <td class="py-3 px-4">
                            <span class="px-2 py-0.5 rounded text-[10px] font-semibold uppercase"
                                  style="color: {{ $task->priority->color_hex }}; background-color: {{ $task->priority->color_hex }}15;">
                                {{ $task->priority->name }}
                            </span>
                        </td>
                        <td class="py-3 px-4 text-slate-300">
                            {{ $task->assignee->name ?? 'Unassigned' }}
                        </td>
                        <td class="py-3 px-4 text-center text-slate-300 font-medium">
                            {{ $task->story_points ?? '-' }}
                        </td>
                        <td class="py-3 px-4 text-slate-400 text-xs">
                            {{ $task->due_date ? $task->due_date->format('M d, Y') : '-' }}
                        </td>
                        <td class="py-3 px-4 text-right">
                            <a href="{{ route('tasks.show', $task) }}" class="text-indigo-400 hover:text-indigo-300 font-semibold mr-2">View</a>
                            <a href="{{ route('tasks.edit', $task) }}" class="text-slate-400 hover:text-slate-200">Edit</a>
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="9" class="py-8 text-center text-slate-500">
                            No issues found matching your criteria.
                        </td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        @if($tasks->hasPages())
        <div class="p-4 border-t border-darkbg-border">
            {{ $tasks->links() }}
        </div>
        @endif
    </div>

</div>
@endsection
