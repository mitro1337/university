@extends('layouts.app')

@section('title', 'Dashboard')
@section('page_title', 'Dashboard Central')

@section('content')
<div class="space-y-6 max-w-7xl mx-auto">

    <!-- 1. KPI TOP METRICS -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Card Proiecte -->
        <div class="bg-darkbg-card border border-darkbg-border rounded-xl p-5 hover:border-darkbg-hover transition">
            <div class="flex items-center justify-between text-slate-400 text-xs font-medium">
                <span>Proiecte Totale</span>
                <span class="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>
                </span>
            </div>
            <div class="mt-3 flex items-baseline gap-2">
                <span class="text-2xl font-bold text-white tracking-tight">{{ $totalProjects }}</span>
                <span class="text-xs text-emerald-400 font-medium">{{ $activeProjects }} active</span>
            </div>
            <p class="mt-1 text-[11px] text-slate-400">Gestiune portofoliu şi iniţiative</p>
        </div>

        <!-- Card Taskuri Deschise -->
        <div class="bg-darkbg-card border border-darkbg-border rounded-xl p-5 hover:border-darkbg-hover transition">
            <div class="flex items-center justify-between text-slate-400 text-xs font-medium">
                <span>Taskuri în Lucru</span>
                <span class="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </span>
            </div>
            <div class="mt-3 flex items-baseline gap-2">
                <span class="text-2xl font-bold text-white tracking-tight">{{ $openTasksCount }}</span>
                <span class="text-xs text-slate-400">din {{ $totalTasks }} total</span>
            </div>
            <p class="mt-1 text-[11px] text-slate-400">Sprinturi şi fluxuri curente</p>
        </div>

        <!-- Card Taskuri Finalizate -->
        <div class="bg-darkbg-card border border-darkbg-border rounded-xl p-5 hover:border-darkbg-hover transition">
            <div class="flex items-center justify-between text-slate-400 text-xs font-medium">
                <span>Taskuri Finalizate</span>
                <span class="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </span>
            </div>
            <div class="mt-3 flex items-baseline gap-2">
                <span class="text-2xl font-bold text-emerald-400 tracking-tight">{{ $completedTasksCount }}</span>
                <span class="text-xs text-slate-400">
                    {{ $totalTasks > 0 ? round(($completedTasksCount / $totalTasks) * 100, 1) : 0 }}% rata succes
                </span>
            </div>
            <p class="mt-1 text-[11px] text-slate-400">Livrabile validate de echipă</p>
        </div>

        <!-- Card Sarcini Restante (Overdue) -->
        <div class="bg-darkbg-card border border-darkbg-border rounded-xl p-5 hover:border-darkbg-hover transition">
            <div class="flex items-center justify-between text-slate-400 text-xs font-medium">
                <span>Sarcini Restante (Overdue)</span>
                <span class="p-1.5 rounded-lg bg-rose-500/10 text-rose-400">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                </span>
            </div>
            <div class="mt-3 flex items-baseline gap-2">
                <span class="text-2xl font-bold text-rose-400 tracking-tight">{{ $overdueTasksCount }}</span>
                <span class="text-xs text-slate-400">necesită atenţie</span>
            </div>
            <p class="mt-1 text-[11px] text-slate-400">Depăşire dată limită</p>
        </div>
    </div>

    <!-- 2. GRAFICE ŞI RAPOARTE AGREGATE SQL -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Distributia pe Stari Kanban -->
        <div class="bg-darkbg-card border border-darkbg-border rounded-xl p-5">
            <div class="flex items-center justify-between pb-3 border-b border-darkbg-border">
                <div>
                    <h3 class="text-sm font-semibold text-white">Distribuţia Taskurilor pe Stări</h3>
                    <p class="text-xs text-slate-400">Agregare SQL dinamică (GROUP BY pe stări)</p>
                </div>
                <a href="{{ route('tasks.index') }}" class="text-xs text-indigo-400 hover:text-indigo-300 font-medium">Vezi toate &rarr;</a>
            </div>

            <div class="mt-4 space-y-3">
                @foreach($tasksByStatus as $st)
                <div>
                    <div class="flex items-center justify-between text-xs mb-1">
                        <span class="flex items-center gap-2 font-medium text-slate-300">
                            <span class="w-2.5 h-2.5 rounded-full" style="background-color: {{ $st->color_hex }}"></span>
                            {{ $st->name }}
                        </span>
                        <span class="text-slate-400 font-mono">{{ $st->total }} taskuri</span>
                    </div>
                    <div class="w-full h-2 bg-darkbg-surface rounded-full overflow-hidden">
                        <div class="h-full rounded-full transition-all duration-500" 
                             style="width: {{ $totalTasks > 0 ? ($st->total / $totalTasks) * 100 : 0 }}%; background-color: {{ $st->color_hex }}"></div>
                    </div>
                </div>
                @endforeach
            </div>
        </div>

        <!-- Distributia pe Prioritati -->
        <div class="bg-darkbg-card border border-darkbg-border rounded-xl p-5">
            <div class="flex items-center justify-between pb-3 border-b border-darkbg-border">
                <div>
                    <h3 class="text-sm font-semibold text-white">Distribuţia pe Nivel de Prioritate</h3>
                    <p class="text-xs text-slate-400">Calcul severitate tichete</p>
                </div>
                <span class="text-xs text-slate-400 font-mono">{{ $totalTasks }} tichete</span>
            </div>

            <div class="mt-4 space-y-3">
                @foreach($tasksByPriority as $pr)
                <div>
                    <div class="flex items-center justify-between text-xs mb-1">
                        <span class="flex items-center gap-2 font-medium text-slate-300">
                            <span class="w-2.5 h-2.5 rounded-full" style="background-color: {{ $pr->color_hex }}"></span>
                            {{ $pr->name }} (Nivel {{ $pr->level }})
                        </span>
                        <span class="text-slate-400 font-mono">{{ $pr->total }} taskuri</span>
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

    <!-- 3. PROIECTE RECENTE ŞI AUDIT TRAIL -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Proiecte Recente (2 Coloane) -->
        <div class="lg:col-span-2 bg-darkbg-card border border-darkbg-border rounded-xl p-5">
            <div class="flex items-center justify-between pb-3 border-b border-darkbg-border">
                <div>
                    <h3 class="text-sm font-semibold text-white">Proiecte Active în Desfăşurare</h3>
                    <p class="text-xs text-slate-400">Progres calculat dinamic din raportul de taskuri finalizate</p>
                </div>
                <a href="{{ route('projects.index') }}" class="text-xs text-indigo-400 hover:text-indigo-300 font-medium">Toate proiectele &rarr;</a>
            </div>

            <div class="mt-4 space-y-4">
                @forelse($recentProjects as $p)
                <div class="p-4 bg-darkbg-surface border border-darkbg-border rounded-lg hover:border-darkbg-hover transition">
                    <div class="flex items-center justify-between mb-2">
                        <div class="flex items-center gap-3">
                            <span class="px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded text-xs font-mono font-bold">
                                {{ $p->project_key }}
                            </span>
                            <a href="{{ route('projects.show', $p) }}" class="text-sm font-semibold text-white hover:text-indigo-400 transition">
                                {{ $p->name }}
                            </a>
                        </div>
                        <span class="text-xs font-mono text-emerald-400 font-medium">{{ $p->progress_percentage }}%</span>
                    </div>

                    <p class="text-xs text-slate-400 line-clamp-1 mb-3">{{ $p->description }}</p>

                    <!-- Progress bar -->
                    <div class="w-full h-1.5 bg-darkbg-card rounded-full overflow-hidden mb-3">
                        <div class="h-full bg-indigo-500 rounded-full" style="width: {{ $p->progress_percentage }}%"></div>
                    </div>

                    <div class="flex items-center justify-between text-xs text-slate-400">
                        <div class="flex items-center gap-2">
                            <span>Lead: <b class="text-slate-300">{{ $p->owner->name ?? 'N/A' }}</b></span>
                            <span>&bull;</span>
                            <span>{{ $p->tasks_count }} taskuri</span>
                        </div>
                        @if($p->due_date)
                        <span>Termen: <b class="text-slate-300">{{ $p->due_date->format('d M Y') }}</b></span>
                        @endif
                    </div>
                </div>
                @empty
                <p class="text-xs text-slate-400 text-center py-4">Nu există proiecte înregistrate.</p>
                @endforelse
            </div>
        </div>

        <!-- Audit Trail / Activităţi Recente (1 Coloana) -->
        <div class="bg-darkbg-card border border-darkbg-border rounded-xl p-5 flex flex-col">
            <div class="flex items-center justify-between pb-3 border-b border-darkbg-border">
                <div>
                    <h3 class="text-sm font-semibold text-white">Istoric Modificări (Audit)</h3>
                    <p class="text-xs text-slate-400">Jurnal activităţi în timp real</p>
                </div>
            </div>

            <div class="mt-4 space-y-3.5 flex-1 overflow-y-auto max-h-[420px] pr-1">
                @forelse($recentActivities as $act)
                <div class="flex gap-3 text-xs border-b border-darkbg-border/50 pb-3 last:border-0 last:pb-0">
                    <div class="w-6 h-6 rounded-full bg-slate-700 shrink-0 flex items-center justify-center font-bold text-[10px] text-slate-300">
                        {{ strtoupper(substr($act->user->name ?? 'U', 0, 1)) }}
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-slate-200">
                            <span class="font-medium text-white">{{ $act->user->name ?? 'Sistem' }}</span>
                            <span class="text-slate-400">{{ $act->description ?? $act->action }}</span>
                        </p>
                        @if($act->task)
                        <a href="{{ route('tasks.show', $act->task) }}" class="text-[11px] text-indigo-400 hover:underline font-mono">
                            [{{ $act->task->task_key }}] {{ Str::limit($act->task->title, 25) }}
                        </a>
                        @endif
                        <span class="block text-[10px] text-slate-400 mt-0.5">{{ $act->created_at->diffForHumans() }}</span>
                    </div>
                </div>
                @empty
                <p class="text-xs text-slate-400 text-center py-8">Nicio activitate înregistrată recent.</p>
                @endforelse
            </div>
        </div>
    </div>

</div>
@endsection
