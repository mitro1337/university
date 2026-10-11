@extends('layouts.app')

@section('title', 'Rapoarte & Statistici SQL')
@section('page_title', 'Rapoarte Avansate & Statistici Agregate SQL')

@section('content')
<div class="space-y-8">

    <!-- Information Header -->
    <div class="bg-gradient-to-r from-darkbg-card via-darkbg-surface to-darkbg-card border border-darkbg-border rounded-xl p-5">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <div class="flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">SQL Engine</span>
                    <h2 class="text-base font-semibold text-white">Analiză Agregată & Vederi Relaţionale (MySQL)</h2>
                </div>
                <p class="text-xs text-slate-400 mt-1">
                    Date calculate în timp real prin interogări SQL complexe: <code class="text-indigo-400 bg-slate-900 px-1 py-0.5 rounded">LEFT JOIN</code>, clauze <code class="text-indigo-400 bg-slate-900 px-1 py-0.5 rounded">CASE WHEN</code>, funcţii agregate (<code class="text-indigo-400 bg-slate-900 px-1 py-0.5 rounded">COUNT, SUM, AVG, DATEDIFF, ROUND</code>) şi grupări <code class="text-indigo-400 bg-slate-900 px-1 py-0.5 rounded">GROUP BY</code>.
                </p>
            </div>
            <div class="flex items-center gap-2">
                <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-300">
                    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Live Data
                </span>
            </div>
        </div>
    </div>

    <!-- RAPORT 1: Metrici Proiecte -->
    <div class="bg-darkbg-card border border-darkbg-border rounded-xl overflow-hidden">
        <div class="p-5 border-b border-darkbg-border flex items-center justify-between">
            <div>
                <h3 class="text-sm font-semibold text-white flex items-center gap-2">
                    <svg class="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                    1. Metrici Proiecte & Procentaj de Progres
                </h3>
                <p class="text-xs text-slate-400 mt-0.5">Calculat prin agregare automată a taskurilor asociate fiecărui proiect</p>
            </div>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
                <thead>
                    <tr class="border-b border-darkbg-border bg-darkbg-surface/50 text-slate-400 font-semibold uppercase tracking-wider">
                        <th class="py-3 px-4">Cod & Proiect</th>
                        <th class="py-3 px-4">Stare & Buget</th>
                        <th class="py-3 px-4 text-center">Total Taskuri</th>
                        <th class="py-3 px-4 text-center">Finalizate</th>
                        <th class="py-3 px-4 text-center">Active</th>
                        <th class="py-3 px-4 text-center">Restante</th>
                        <th class="py-3 px-4 text-center">Story Points</th>
                        <th class="py-3 px-4 w-48">Rată Progres</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-darkbg-border">
                    @forelse($projectMetrics as $pm)
                    <tr class="hover:bg-darkbg-hover/50 transition">
                        <td class="py-3.5 px-4">
                            <div class="flex items-center gap-2">
                                <span class="font-mono font-bold text-indigo-400 px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">{{ $pm->project_key }}</span>
                                <a href="{{ route('projects.show', $pm->id) }}" class="font-medium text-white hover:text-indigo-400 transition">{{ $pm->project_name }}</a>
                            </div>
                        </td>
                        <td class="py-3.5 px-4">
                            <div class="text-slate-300 capitalize">{{ str_replace('_', ' ', $pm->project_status) }}</div>
                            <div class="text-[11px] text-slate-500 font-mono">{{ number_format($pm->budget, 2) }} RON</div>
                        </td>
                        <td class="py-3.5 px-4 text-center font-mono text-white font-semibold">{{ $pm->total_tasks }}</td>
                        <td class="py-3.5 px-4 text-center font-mono text-emerald-400">{{ $pm->completed_tasks }}</td>
                        <td class="py-3.5 px-4 text-center font-mono text-amber-400">{{ $pm->open_tasks }}</td>
                        <td class="py-3.5 px-4 text-center font-mono {{ $pm->overdue_tasks > 0 ? 'text-rose-400 font-bold' : 'text-slate-500' }}">
                            {{ $pm->overdue_tasks }}
                        </td>
                        <td class="py-3.5 px-4 text-center font-mono text-slate-300">
                            {{ $pm->completed_story_points }} / {{ $pm->total_story_points }}
                        </td>
                        <td class="py-3.5 px-4">
                            <div class="flex items-center gap-2">
                                <div class="flex-1 bg-darkbg-surface h-2 rounded-full overflow-hidden border border-darkbg-border">
                                    <div class="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full transition-all" style="width: {{ $pm->progress_percentage }}%"></div>
                                </div>
                                <span class="font-mono text-[11px] font-semibold text-slate-300 w-10 text-right">{{ $pm->progress_percentage }}%</span>
                            </div>
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="8" class="py-6 text-center text-slate-400">Nu există proiecte înregistrate.</td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>

    <!-- RAPORT 2: Încărcare Echipă (Workload) -->
    <div class="bg-darkbg-card border border-darkbg-border rounded-xl overflow-hidden">
        <div class="p-5 border-b border-darkbg-border flex items-center justify-between">
            <div>
                <h3 class="text-sm font-semibold text-white flex items-center gap-2">
                    <svg class="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
                    2. Încărcarea Membrilor Echipei (Team Workload & Capacity)
                </h3>
                <p class="text-xs text-slate-400 mt-0.5">Analiză per membru: taskuri în lucru, story points active şi ore logate</p>
            </div>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
                <thead>
                    <tr class="border-b border-darkbg-border bg-darkbg-surface/50 text-slate-400 font-semibold uppercase tracking-wider">
                        <th class="py-3 px-4">Membru Echipă</th>
                        <th class="py-3 px-4">Rol & Poziţie</th>
                        <th class="py-3 px-4 text-center">Taskuri Alocate</th>
                        <th class="py-3 px-4 text-center">În Lucru / Deschise</th>
                        <th class="py-3 px-4 text-center">Finalizate</th>
                        <th class="py-3 px-4 text-center">Story Points Active</th>
                        <th class="py-3 px-4 text-center">Ore Logate</th>
                        <th class="py-3 px-4 text-center">Nivel Încărcare</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-darkbg-border">
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
                        <td class="py-3.5 px-4 text-center font-mono text-white">{{ $tw->total_assigned }}</td>
                        <td class="py-3.5 px-4 text-center font-mono text-amber-400 font-semibold">{{ $tw->active_tasks }}</td>
                        <td class="py-3.5 px-4 text-center font-mono text-emerald-400">{{ $tw->completed_tasks }}</td>
                        <td class="py-3.5 px-4 text-center font-mono text-indigo-300 font-semibold">{{ $tw->active_story_points }} SP</td>
                        <td class="py-3.5 px-4 text-center font-mono text-slate-300">{{ $tw->total_logged_hours }} h</td>
                        <td class="py-3.5 px-4 text-center">
                            @if($tw->active_story_points > 15)
                                <span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-500/15 text-rose-400 border border-rose-500/30">Supraîncărcat</span>
                            @elseif($tw->active_story_points >= 8)
                                <span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">Optim</span>
                            @else
                                <span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Capacitate Disponibilă</span>
                            @endif
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="8" class="py-6 text-center text-slate-400">Nu există date despre echipă.</td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>

    <!-- RAPOARTE 3 & 4 (Grid 2 coloane) -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <!-- Raport 3: Taskuri Restante (2 cols) -->
        <div class="lg:col-span-2 bg-darkbg-card border border-darkbg-border rounded-xl overflow-hidden">
            <div class="p-5 border-b border-darkbg-border flex items-center justify-between">
                <div>
                    <h3 class="text-sm font-semibold text-rose-400 flex items-center gap-2">
                        <svg class="w-4 h-4 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        3. Alertă: Taskuri Restante (Overdue Tasks)
                    </h3>
                    <p class="text-xs text-slate-400 mt-0.5">Taskuri a căror dată depășește data curentă (DATEDIFF &gt; 0)</p>
                </div>
                <span class="text-xs font-mono px-2 py-1 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold">
                    {{ $overdueTasks->count() }} restante
                </span>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full text-left text-xs">
                    <thead>
                        <tr class="border-b border-darkbg-border bg-darkbg-surface/50 text-slate-400 font-semibold uppercase tracking-wider">
                            <th class="py-3 px-4">Cheie & Titlu</th>
                            <th class="py-3 px-4">Proiect</th>
                            <th class="py-3 px-4">Responsabil</th>
                            <th class="py-3 px-4">Termen Limită</th>
                            <th class="py-3 px-4 text-center">Întârziere</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-darkbg-border">
                        @forelse($overdueTasks as $ot)
                        <tr class="hover:bg-darkbg-hover/50 transition">
                            <td class="py-3.5 px-4">
                                <a href="{{ route('tasks.show', $ot->id) }}" class="font-mono text-indigo-400 font-bold hover:underline mr-1.5">{{ $ot->task_key }}</a>
                                <span class="text-white">{{ $ot->task_title }}</span>
                            </td>
                            <td class="py-3.5 px-4 text-slate-300 font-medium">{{ $ot->project_name }}</td>
                            <td class="py-3.5 px-4 text-slate-400">{{ $ot->assignee_name ?? 'Neatribuit' }}</td>
                            <td class="py-3.5 px-4 font-mono text-slate-400">{{ \Carbon\Carbon::parse($ot->due_date)->format('d.m.Y') }}</td>
                            <td class="py-3.5 px-4 text-center">
                                <span class="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                                    +{{ $ot->days_overdue }} zile
                                </span>
                            </td>
                        </tr>
                        @empty
                        <tr>
                            <td colspan="5" class="py-6 text-center text-slate-400">
                                <span class="text-emerald-400 font-medium">Felicitări!</span> Nu există taskuri restante în prezent.
                            </td>
                        </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Raport 4: Distribuție pe Tipuri de Tichet (1 col) -->
        <div class="bg-darkbg-card border border-darkbg-border rounded-xl p-5 self-start">
            <div class="pb-3 mb-4 border-b border-darkbg-border">
                <h3 class="text-sm font-semibold text-white flex items-center gap-2">
                    <svg class="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>
                    4. Distribuţie după Tip Tichet
                </h3>
                <p class="text-xs text-slate-400 mt-0.5">Agregare: număr, medie story points & total ore</p>
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
                            {{ $typeStat->type }}
                        </span>
                        <span class="text-xs font-mono font-bold text-white px-2 py-0.5 rounded bg-darkbg-card border border-darkbg-border">
                            {{ $typeStat->count }} tichete
                        </span>
                    </div>

                    <div class="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-darkbg-border/60 text-[11px] font-mono text-slate-400">
                        <div>Medie SP: <span class="text-slate-200 font-semibold">{{ round($typeStat->avg_points, 1) }}</span></div>
                        <div class="text-right">Total ore: <span class="text-slate-200 font-semibold">{{ $typeStat->total_hours ?? 0 }} h</span></div>
                    </div>
                </div>
                @empty
                <div class="text-xs text-slate-400 text-center py-4">Nu există date disponibile.</div>
                @endforelse
            </div>
        </div>

    </div>

</div>
@endsection
