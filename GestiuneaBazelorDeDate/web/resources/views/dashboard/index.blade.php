@extends('layouts.app')

@section('title', __('Dashboard'))
@section('page_title', __('Dashboard'))

@section('content')
<div class="space-y-6 max-w-7xl mx-auto">

    <!-- 1. KPI TOP METRICS -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Projects Card -->
        <div class="bg-darkbg-card border border-darkbg-border rounded-xl p-5 hover:border-darkbg-hover transition">
            <div class="flex items-center justify-between text-slate-400 text-xs font-medium">
                <span>{{ __('Total Projects') }}</span>
                <span class="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>
                </span>
            </div>
            <div class="mt-3 flex items-baseline gap-2">
                <span class="text-2xl font-bold text-white tracking-tight">{{ $totalProjects }}</span>
                <span class="text-xs text-emerald-400 font-medium">{{ $activeProjects }} {{ __('active') }}</span>
            </div>
            <p class="mt-1 text-[11px] text-slate-400">{{ __('Portfolio & project management') }}</p>
        </div>

        <!-- Open Tasks Card -->
        <div class="bg-darkbg-card border border-darkbg-border rounded-xl p-5 hover:border-darkbg-hover transition">
            <div class="flex items-center justify-between text-slate-400 text-xs font-medium">
                <span>{{ __('Active Issues') }}</span>
                <span class="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </span>
            </div>
            <div class="mt-3 flex items-baseline gap-2">
                <span class="text-2xl font-bold text-white tracking-tight">{{ $openTasksCount }}</span>
                <span class="text-xs text-slate-400">{{ __('of') }} {{ $totalTasks }} {{ __('total') }}</span>
            </div>
            <p class="mt-1 text-[11px] text-slate-400">{{ __('Current active sprints') }}</p>
        </div>

        <!-- Completed Tasks Card -->
        <div class="bg-darkbg-card border border-darkbg-border rounded-xl p-5 hover:border-darkbg-hover transition">
            <div class="flex items-center justify-between text-slate-400 text-xs font-medium">
                <span>{{ __('Resolved Issues') }}</span>
                <span class="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </span>
            </div>
            <div class="mt-3 flex items-baseline gap-2">
                <span class="text-2xl font-bold text-emerald-400 tracking-tight">{{ $completedTasksCount }}</span>
                <span class="text-xs text-slate-400">
                    {{ $totalTasks > 0 ? round(($completedTasksCount / $totalTasks) * 100, 1) : 0 }}% {{ __('Completion Rate') }}
                </span>
            </div>
            <p class="mt-1 text-[11px] text-slate-400">{{ __('Validated deliverables') }}</p>
        </div>

        <!-- Overdue Tasks Card -->
        <div class="bg-darkbg-card border border-darkbg-border rounded-xl p-5 hover:border-darkbg-hover transition">
            <div class="flex items-center justify-between text-slate-400 text-xs font-medium">
                <span>{{ __('Overdue Issues') }}</span>
                <span class="p-1.5 rounded-lg bg-rose-500/10 text-rose-400">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                </span>
            </div>
            <div class="mt-3 flex items-baseline gap-2">
                <span class="text-2xl font-bold text-rose-400 tracking-tight">{{ $overdueTasksCount }}</span>
                <span class="text-xs text-slate-400">{{ __('needs attention') }}</span>
            </div>
            <p class="mt-1 text-[11px] text-slate-400">{{ __('Past target due date') }}</p>
        </div>
    </div>

    <!-- 2. STATUS & PRIORITY DISTRIBUTION -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Status Breakdown -->
        <div class="bg-darkbg-card border border-darkbg-border rounded-xl p-5">
            <div class="flex items-center justify-between pb-3 border-b border-darkbg-border">
                <div>
                    <h3 class="text-sm font-semibold text-white">{{ __('Workflow Status Breakdown') }}</h3>
                    <p class="text-xs text-slate-400">{{ __('Distribution across active workflow stages') }}</p>
                </div>
                <a href="{{ route('tasks.index') }}" class="text-xs text-indigo-400 hover:text-indigo-300 font-medium">{{ __('View all') }} &rarr;</a>
            </div>

            <div class="mt-4 space-y-3">
                @foreach($tasksByStatus as $st)
                <div>
                    <div class="flex items-center justify-between text-xs mb-1">
                        <span class="flex items-center gap-2 font-medium text-slate-300">
                            <span class="w-2.5 h-2.5 rounded-full" style="background-color: {{ $st->color_hex }}"></span>
                            {{ __($st->name) }}
                        </span>
                        <span class="text-slate-400">{{ $st->total }} {{ __('issues') }}</span>
                    </div>
                    <div class="w-full h-2 bg-darkbg-surface rounded-full overflow-hidden">
                        <div class="h-full rounded-full transition-all duration-500" 
                             style="width: {{ $totalTasks > 0 ? ($st->total / $totalTasks) * 100 : 0 }}%; background-color: {{ $st->color_hex }}"></div>
                    </div>
                </div>
                @endforeach
            </div>
        </div>

        <!-- Priority Breakdown -->
        <div class="bg-darkbg-card border border-darkbg-border rounded-xl p-5">
            <div class="flex items-center justify-between pb-3 border-b border-darkbg-border">
                <div>
                    <h3 class="text-sm font-semibold text-white">{{ __('Priority Breakdown') }}</h3>
                    <p class="text-xs text-slate-400">{{ __('Severity breakdown across active issues') }}</p>
                </div>
                <span class="text-xs text-slate-400">{{ $totalTasks }} {{ __('total') }}</span>
            </div>

            <div class="mt-4 space-y-3">
                @foreach($tasksByPriority as $pr)
                <div>
                    <div class="flex items-center justify-between text-xs mb-1">
                        <span class="flex items-center gap-2 font-medium text-slate-300">
                            <span class="w-2.5 h-2.5 rounded-full" style="background-color: {{ $pr->color_hex }}"></span>
                            {{ __($pr->name) }}
                        </span>
                        <span class="text-slate-400">{{ $pr->total }} {{ __('issues') }}</span>
                    </div>
                    <div class="w-full h-2 bg-darkbg-surface rounded-full overflow-hidden">
                        <div class="h-full rounded-full transition-all duration-500" 
                             style="width: {{ $totalTasks > 0 ? ($pr->total / $totalTasks) * 100 : 0 }}%; background-color: {{ $pr->color_hex }}"></div>
                    </div>
                </div>
                @endforeach
            </div>
        </div>
    </div>

    <!-- 3. ACTIVE PROJECTS & RECENT ACTIVITY -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Active Projects List (2 cols) -->
        <div class="lg:col-span-2 bg-darkbg-card border border-darkbg-border rounded-xl p-5">
            <div class="flex items-center justify-between pb-3 border-b border-darkbg-border">
                <div>
                    <h3 class="text-sm font-semibold text-white">{{ __('Active Projects') }}</h3>
                    <p class="text-xs text-slate-400">{{ __('Track milestones and progress') }}</p>
                </div>
                <a href="{{ route('projects.index') }}" class="text-xs text-indigo-400 hover:text-indigo-300 font-medium">{{ __('All projects') }} &rarr;</a>
            </div>

            <div class="mt-4 space-y-3">
                @forelse($recentProjects as $p)
                <div class="p-3 bg-darkbg-surface/50 border border-darkbg-border rounded-lg hover:border-indigo-500/30 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div class="flex items-center gap-3">
                        <div class="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center font-bold text-indigo-400 text-xs">
                            {{ $p->project_key }}
                        </div>
                        <div>
                            <a href="{{ route('projects.show', $p) }}" class="text-xs font-semibold text-white hover:text-indigo-400 transition">
                                {{ $p->name }}
                            </a>
                            <div class="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                                <span>{{ __('Owner:') }} {{ $p->owner->name ?? __('Team') }}</span>
                                <span>&bull;</span>
                                <span>{{ $p->tasks_count }} {{ __('issues') }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="w-full sm:w-48">
                        <div class="flex justify-between text-[11px] mb-1">
                            <span class="text-slate-400">{{ __('Progress') }}</span>
                            <span class="text-xs text-emerald-400 font-medium">{{ $p->progress_percentage }}%</span>
                        </div>
                        <div class="w-full h-1.5 bg-darkbg-card rounded-full overflow-hidden">
                            <div class="h-full bg-emerald-500 rounded-full" style="width: {{ $p->progress_percentage }}%"></div>
                        </div>
                    </div>
                </div>
                @empty
                <div class="text-center py-6 text-xs text-slate-500">{{ __('No active projects yet.') }}</div>
                @endforelse
            </div>
        </div>

        <!-- Recent Activity Feed (1 col) -->
        <div class="bg-darkbg-card border border-darkbg-border rounded-xl p-5">
            <div class="flex items-center justify-between pb-3 border-b border-darkbg-border">
                <div>
                    <h3 class="text-sm font-semibold text-white">{{ __('Activity Log') }}</h3>
                    <p class="text-xs text-slate-400">{{ __('Live team updates') }}</p>
                </div>
            </div>

            <div class="mt-4 space-y-3.5 text-xs">
                @forelse($recentActivities as $act)
                <div class="flex items-start gap-2.5 pb-2.5 border-b border-darkbg-border/60 last:border-0 last:pb-0">
                    <div class="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 shrink-0"></div>
                    <div class="flex-1">
                        <p class="text-slate-300 leading-snug">
                            <span class="font-medium text-white">{{ $act->user->name ?? 'System' }}</span>
                            {{ $act->description }}
                        </p>
                        @if($act->task)
                        <a href="{{ route('tasks.show', $act->task) }}" class="text-[11px] text-indigo-400 hover:underline">
                            {{ $act->task->task_key }}: {{ Str::limit($act->task->title, 25) }}
                        </a>
                        @endif
                        <p class="text-[10px] text-slate-500 mt-0.5">{{ $act->created_at->diffForHumans() }}</p>
                    </div>
                </div>
                @empty
                <div class="text-center py-6 text-xs text-slate-500">{{ __('No recent activity.') }}</div>
                @endforelse
            </div>
        </div>
    </div>

</div>
@endsection
