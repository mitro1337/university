@extends('layouts.app')

@section('title', __('Analytics & Reports'))
@section('page_title', __('Analytics & Reports'))

@section('content')
<div class="space-y-8">

    <!-- Information Header -->
    <div class="bg-darkbg-card border border-darkbg-border rounded-xl p-5">
        <h2 class="text-base font-semibold text-white">{{ __('Engineering Analytics & Workflow Velocity') }}</h2>
        <p class="text-xs text-slate-400 mt-1">
            {{ __('Real-time multi-dimensional metrics aggregated across projects, sprint stages, workloads, and issue resolution lifecycles.') }}
        </p>
    </div>

    <!-- REPORT 1: Project Velocity -->
    <div class="bg-darkbg-card border border-darkbg-border rounded-xl overflow-hidden">
        <div class="p-5 border-b border-darkbg-border flex items-center justify-between">
            <div>
                <h3 class="text-sm font-semibold text-white flex items-center gap-2">
                    <svg class="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                    1. {{ __('Project Velocity & Completion Rate') }}
                </h3>
                <p class="text-xs text-slate-400 mt-0.5">{{ __('Calculated by aggregating all active issues per project') }}</p>
            </div>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
                <thead>
                    <tr class="border-b border-darkbg-border bg-darkbg-surface/50 text-slate-400 font-semibold uppercase tracking-wider">
                        <th class="py-3 px-4">{{ __('Project') }}</th>
                        <th class="py-3 px-4">{{ __('Status & Budget') }}</th>
                        <th class="py-3 px-4 text-center">{{ __('Total Issues') }}</th>
                        <th class="py-3 px-4 text-center">{{ __('Completed') }}</th>
                        <th class="py-3 px-4 text-center">{{ __('Active') }}</th>
                        <th class="py-3 px-4 text-center">{{ __('Overdue') }}</th>
                        <th class="py-3 px-4 text-center">{{ __('Story Points') }}</th>
                        <th class="py-3 px-4 w-48">{{ __('Progress Rate') }}</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-darkbg-border">
                    @forelse($projectMetrics as $pm)
                    <tr class="hover:bg-darkbg-hover/50 transition">
                        <td class="py-3.5 px-4">
                            <div class="flex items-center gap-2">
                                <span class="font-semibold text-indigo-400 px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">{{ $pm->project_key }}</span>
                                <a href="{{ route('projects.show', $pm->id) }}" class="font-medium text-white hover:text-indigo-400 transition">{{ $pm->project_name }}</a>
                            </div>
                        </td>
                        <td class="py-3.5 px-4">
                            <div class="text-slate-300 capitalize">{{ __(str_replace('_', ' ', $pm->project_status)) }}</div>
                            <div class="text-[11px] text-slate-500">${{ number_format($pm->budget, 2) }}</div>
                        </td>
                        <td class="py-3.5 px-4 text-center text-white font-semibold">{{ $pm->total_tasks }}</td>
                        <td class="py-3.5 px-4 text-center text-emerald-400 font-medium">{{ $pm->completed_tasks }}</td>
                        <td class="py-3.5 px-4 text-center text-amber-400 font-medium">{{ $pm->open_tasks }}</td>
                        <td class="py-3.5 px-4 text-center {{ $pm->overdue_tasks > 0 ? 'text-rose-400 font-bold' : 'text-slate-500' }}">
                            {{ $pm->overdue_tasks }}
                        </td>
                        <td class="py-3.5 px-4 text-center text-slate-300 font-medium">
                            {{ $pm->completed_story_points }} / {{ $pm->total_story_points }}
                        </td>
                        <td class="py-3.5 px-4">
                            <div class="flex items-center gap-2">
                                <div class="flex-1 bg-darkbg-surface h-2 rounded-full overflow-hidden border border-darkbg-border">
                                    <div class="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full transition-all" style="width: {{ $pm->progress_percentage }}%"></div>
                                </div>
                                <span class="text-[11px] font-semibold text-slate-300 w-10 text-right">{{ $pm->progress_percentage }}%</span>
                            </div>
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="8" class="py-6 text-center text-slate-400">{{ __('No projects found.') }}</td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>

    <!-- REPORT 2: Team Workload -->
    <div class="bg-darkbg-card border border-darkbg-border rounded-xl overflow-hidden">
        <div class="p-5 border-b border-darkbg-border flex items-center justify-between">
            <div>
                <h3 class="text-sm font-semibold text-white flex items-center gap-2">
                    <svg class="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
                    2. {{ __('Team Workload & Capacity') }}
                </h3>
                <p class="text-xs text-slate-400 mt-0.5">{{ __('Member-level allocation: active issues, story points, and logged hours') }}</p>
            </div>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
                <thead>
                    <tr class="border-b border-darkbg-border bg-darkbg-surface/50 text-slate-400 font-semibold uppercase tracking-wider">
                        <th class="py-3 px-4">{{ __('Team Member') }}</th>
                        <th class="py-3 px-4">{{ __('Role & Title') }}</th>
                        <th class="py-3 px-4 text-center">{{ __('Assigned Issues') }}</th>
                        <th class="py-3 px-4 text-center">{{ __('Active') }}</th>
                        <th class="py-3 px-4 text-center">{{ __('Completed') }}</th>
                        <th class="py-3 px-4 text-center">{{ __('Active Points') }}</th>
                        <th class="py-3 px-4 text-center">{{ __('Logged Hours') }}</th>
                        <th class="py-3 px-4 text-center">{{ __('Capacity Status') }}</th>
                    </tr>
                </thead>
                <tbody class="divide-y border-darkbg-border">
                    @forelse($teamWorkload as $tw)
                    <tr class="hover:bg-darkbg-hover/50 transition">
                        <td class="py-3.5 px-4">
                            <div class="flex items-center gap-2.5">
                                <div class="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold">
                                    {{ strtoupper(substr($tw->user_name, 0, 1)) }}
                                </div>
                                <span class="font-medium text-white">{{ $tw->user_name }}</span>
                            </div>
                        </td>
                        <td class="py-3.5 px-4 text-slate-300">
                            <div>{{ $tw->job_title }}</div>
                            <span class="text-[10px] text-indigo-400 font-medium">[{{ $tw->role_name }}]</span>
                        </td>
                        <td class="py-3.5 px-4 text-center text-white font-medium">{{ $tw->total_assigned }}</td>
                        <td class="py-3.5 px-4 text-center text-amber-400 font-semibold">{{ $tw->active_tasks }}</td>
                        <td class="py-3.5 px-4 text-center text-emerald-400 font-medium">{{ $tw->completed_tasks }}</td>
                        <td class="py-3.5 px-4 text-center text-indigo-300 font-semibold">{{ $tw->active_story_points }} SP</td>
                        <td class="py-3.5 px-4 text-center text-slate-300">{{ $tw->total_logged_hours }} h</td>
                        <td class="py-3.5 px-4 text-center">
                            @if($tw->active_story_points > 15)
                                <span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-500/15 text-rose-400 border border-rose-500/30">{{ __('Overloaded') }}</span>
                            @elseif($tw->active_story_points >= 8)
                                <span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">{{ __('Optimal') }}</span>
                            @else
                                <span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">{{ __('Available') }}</span>
                            @endif
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="8" class="py-6 text-center text-slate-400">{{ __('No workload records found.') }}</td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>

    <!-- REPORTS 3 & 4 (2 Column Grid) -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <!-- Report 3: Overdue Issues (2 cols) -->
        <div class="lg:col-span-2 bg-darkbg-card border border-darkbg-border rounded-xl overflow-hidden">
            <div class="p-5 border-b border-darkbg-border flex items-center justify-between">
                <div>
                    <h3 class="text-sm font-semibold text-rose-400 flex items-center gap-2">
                        <svg class="w-4 h-4 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        3. {{ __('Overdue Issues') }}
                    </h3>
                    <p class="text-xs text-slate-400 mt-0.5">{{ __('Issues whose target due date has passed') }}</p>
                </div>
                <span class="text-xs px-2 py-1 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold">
                    {{ $overdueTasks->count() }} {{ __('overdue') }}
                </span>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full text-left text-xs">
                    <thead>
                        <tr class="border-b border-darkbg-border bg-darkbg-surface/50 text-slate-400 font-semibold uppercase tracking-wider">
                            <th class="py-3 px-4">{{ __('Key & Title') }}</th>
                            <th class="py-3 px-4">{{ __('Project') }}</th>
                            <th class="py-3 px-4">{{ __('Assignee') }}</th>
                            <th class="py-3 px-4">{{ __('Target Date') }}</th>
                            <th class="py-3 px-4 text-center">{{ __('Delay') }}</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-darkbg-border">
                        @forelse($overdueTasks as $ot)
                        <tr class="hover:bg-darkbg-hover/50 transition">
                            <td class="py-3.5 px-4">
                                <a href="{{ route('tasks.show', $ot->id) }}" class="text-indigo-400 font-semibold hover:underline mr-1.5">{{ $ot->task_key }}</a>
                                <span class="text-white">{{ $ot->task_title }}</span>
                            </td>
                            <td class="py-3.5 px-4 text-slate-300 font-medium">{{ $ot->project_name }}</td>
                            <td class="py-3.5 px-4 text-slate-400">{{ $ot->assignee_name ?? __('Unassigned') }}</td>
                            <td class="py-3.5 px-4 text-slate-400">{{ \Carbon\Carbon::parse($ot->due_date)->format('M d, Y') }}</td>
                            <td class="py-3.5 px-4 text-center">
                                <span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                                    +{{ $ot->days_overdue }} {{ __('days') }}
                                </span>
                            </td>
                        </tr>
                        @empty
                        <tr>
                            <td colspan="5" class="py-6 text-center text-slate-400">
                                <span class="text-emerald-400 font-medium">{{ __('All clear!') }}</span> {{ __('No issues found matching your criteria.') }}
                            </td>
                        </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Report 4: Issue Types (1 col) -->
        <div class="bg-darkbg-card border border-darkbg-border rounded-xl p-5 self-start">
            <div class="pb-3 mb-4 border-b border-darkbg-border">
                <h3 class="text-sm font-semibold text-white flex items-center gap-2">
                    <svg class="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>
                    4. {{ __('Distribution by Issue Type') }}
                </h3>
                <p class="text-xs text-slate-400 mt-0.5">{{ __('Average story points and total logged hours') }}</p>
            </div>

            <div class="space-y-4">
                @forelse($tasksByType as $typeStat)
                <div class="p-3.5 bg-darkbg-surface border border-darkbg-border rounded-lg">
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-semibold text-white capitalize flex items-center gap-1.5">
                            @if($typeStat->type == 'bug')
                                <span class="w-2 h-2 rounded-full bg-rose-500"></span>
                            @elseif($typeStat->type == 'feature')
                                <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
                            @elseif($typeStat->type == 'improvement')
                                <span class="w-2 h-2 rounded-full bg-amber-500"></span>
                            @else
                                <span class="w-2 h-2 rounded-full bg-blue-500"></span>
                            @endif
                            {{ __($typeStat->type) }}
                        </span>
                        <span class="text-xs font-semibold text-white px-2 py-0.5 rounded bg-darkbg-card border border-darkbg-border">
                            {{ $typeStat->count }} {{ __('issues') }}
                        </span>
                    </div>

                    <div class="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-darkbg-border/60 text-[11px] text-slate-400">
                        <div>Avg SP: <span class="text-slate-200 font-semibold">{{ round($typeStat->avg_points, 1) }}</span></div>
                        <div class="text-right">Logged: <span class="text-slate-200 font-semibold">{{ $typeStat->total_hours ?? 0 }} h</span></div>
                    </div>
                </div>
                @empty
                <div class="text-xs text-slate-400 text-center py-4">{{ __('No issues found matching your criteria.') }}</div>
                @endforelse
            </div>
        </div>

    </div>

</div>
@endsection
