@extends('layouts.app')

@section('title', $project->name)
@section('page_title', $project->name)

@section('badge')
    <span class="px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded text-xs font-mono font-bold">
        {{ $project->project_key }}
    </span>
@endsection

@section('content')
<div class="space-y-6 max-w-full">

    <!-- 1. HEADER SUMAR PROIECT -->
    <div class="bg-darkbg-card border border-darkbg-border rounded-xl p-5">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div class="space-y-1">
                <div class="flex items-center gap-3">
                    <h2 class="text-xl font-bold text-white tracking-tight">{{ $project->name }}</h2>
                    <span class="px-2 py-0.5 rounded text-xs font-medium capitalize 
                        {{ $project->status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-300' }}">
                        {{ $project->status }}
                    </span>
                    <span class="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-xs capitalize">
                        Prioritate: {{ $project->priority }}
                    </span>
                </div>
                <p class="text-xs text-slate-400 max-w-3xl leading-relaxed">{{ $project->description }}</p>
            </div>

            <!-- Butoane Acţiuni -->
            <div class="flex items-center gap-2 shrink-0">
                <a href="{{ route('tasks.create', ['project_id' => $project->id]) }}" class="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-indigo-600/20 transition flex items-center gap-1.5">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                    Adaugă Task
                </a>
                <a href="{{ route('projects.edit', $project) }}" class="px-3 py-2 bg-darkbg-surface hover:bg-darkbg-hover text-slate-300 border border-darkbg-border rounded-lg text-xs font-medium transition">
                    Setări Proiect
                </a>
            </div>
        </div>

        <!-- Metrici Bară Progres Proiect -->
        <div class="mt-5 pt-4 border-t border-darkbg-border/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
                <span class="text-slate-400 block mb-0.5">Responsabil (Lead)</span>
                <span class="font-semibold text-white">{{ $project->owner->name ?? 'N/A' }}</span>
            </div>
            <div>
                <span class="text-slate-400 block mb-0.5">Termen Limită</span>
                <span class="font-semibold text-white">{{ $project->due_date ? $project->due_date->format('d M Y') : 'Nespecificat' }}</span>
            </div>
            <div>
                <span class="text-slate-400 block mb-0.5">Buget Alocat</span>
                <span class="font-semibold text-white font-mono">{{ number_format($project->budget, 2) }} RON</span>
            </div>
            <div>
                <span class="text-slate-400 block mb-0.5">Progres Taskuri ({{ $project->progress_percentage }}%)</span>
                <div class="w-full h-2 bg-darkbg-surface rounded-full overflow-hidden mt-1">
                    <div class="h-full bg-emerald-400 rounded-full" style="width: {{ $project->progress_percentage }}%"></div>
                </div>
            </div>
        </div>
    </div>

    <!-- 2. PANOU KANBAN (LINEAR / JIRA STYLE) -->
    <div>
        <div class="flex items-center justify-between mb-3 px-1">
            <h3 class="text-sm font-semibold text-white flex items-center gap-2">
                <span>Panou Flux de Lucru (Kanban)</span>
                <span class="text-xs text-slate-400 font-normal">({{ $project->tasks->count() }} taskuri în proiect)</span>
            </h3>
        </div>

        <!-- Coloane Kanban orizontale scrollabile -->
        <div class="flex gap-4 overflow-x-auto pb-6">
            @foreach($statuses as $status)
            @php
                $columnTasks = $kanbanColumns[$status->id]['tasks'] ?? collect();
            @endphp
            <div class="w-72 shrink-0 flex flex-col bg-darkbg-surface border border-darkbg-border rounded-xl max-h-[75vh]">
                <!-- Header Coloana -->
                <div class="p-3 border-b border-darkbg-border flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <span class="w-2.5 h-2.5 rounded-full" style="background-color: {{ $status->color_hex }}"></span>
                        <span class="text-xs font-semibold text-white">{{ $status->name }}</span>
                    </div>
                    <span class="px-2 py-0.5 rounded-full bg-darkbg-card text-slate-400 text-[11px] font-mono font-medium">
                        {{ $columnTasks->count() }}
                    </span>
                </div>

                <!-- Lista Carduri Taskuri -->
                <div class="p-2 space-y-2.5 flex-1 overflow-y-auto">
                    @forelse($columnTasks as $task)
                    <div class="bg-darkbg-card border border-darkbg-border hover:border-indigo-500/50 rounded-lg p-3 shadow-sm hover:shadow-md transition group">
                        <!-- Key & Priority -->
                        <div class="flex items-center justify-between mb-1.5 text-xs">
                            <a href="{{ route('tasks.show', $task) }}" class="font-mono font-bold text-indigo-400 hover:underline">
                                {{ $task->task_key }}
                            </a>
                            <span class="flex items-center gap-1 text-[11px] font-medium" style="color: {{ $task->priority->color_hex }}">
                                <span>&bull;</span> {{ $task->priority->name }}
                            </span>
                        </div>

                        <!-- Titlu -->
                        <a href="{{ route('tasks.show', $task) }}" class="block text-xs font-medium text-slate-200 hover:text-white leading-snug mb-2.5">
                            {{ $task->title }}
                        </a>

                        <!-- Taguri -->
                        @if($task->tags->count() > 0)
                        <div class="flex flex-wrap gap-1 mb-2.5">
                            @foreach($task->tags as $tag)
                            <span class="px-1.5 py-0.2 rounded text-[10px] font-medium" style="background-color: {{ $tag->color_hex }}20; color: {{ $tag->color_hex }}">
                                {{ $tag->name }}
                            </span>
                            @endforeach
                        </div>
                        @endif

                        <!-- Footer Card: Story Points, Assignee, Schimbare Rapida Stare -->
                        <div class="pt-2 border-t border-darkbg-border/60 flex items-center justify-between text-xs">
                            <div class="flex items-center gap-1.5 text-slate-400">
                                @if($task->story_points)
                                <span class="px-1.5 py-0.5 bg-darkbg-surface rounded text-[10px] font-mono text-slate-300 font-bold" title="Story Points">
                                    {{ $task->story_points }} SP
                                </span>
                                @endif

                                @if($task->due_date)
                                <span class="text-[10px] {{ $task->isOverdue() ? 'text-rose-400 font-bold' : 'text-slate-400' }}" title="Termen limita">
                                    {{ $task->due_date->format('d M') }}
                                </span>
                                @endif
                            </div>

                            <!-- Meniu schimbare rapida stare (Mutare coloana) -->
                            <form action="{{ route('tasks.updateStatus', $task) }}" method="POST" class="inline">
                                @csrf
                                @method('PATCH')
                                <select name="status_id" onchange="this.form.submit()" class="bg-darkbg-surface border border-darkbg-border text-[10px] text-slate-300 rounded px-1.5 py-0.5 focus:outline-none focus:border-indigo-500 cursor-pointer">
                                    @foreach($statuses as $stOption)
                                        <option value="{{ $stOption->id }}" {{ $stOption->id === $status->id ? 'selected' : '' }}>
                                            &rarr; {{ $stOption->name }}
                                        </option>
                                    @endforeach
                                </select>
                            </form>
                        </div>
                    </div>
                    @empty
                    <div class="h-24 border border-dashed border-darkbg-border/80 rounded-lg flex items-center justify-center text-xs text-slate-400">
                        Niciun task în această stare
                    </div>
                    @endforelse
                </div>

                <!-- Buton rapid adaugare task in coloana -->
                <div class="p-2 border-t border-darkbg-border/60">
                    <a href="{{ route('tasks.create', ['project_id' => $project->id, 'status_id' => $status->id]) }}" 
                       class="w-full py-1.5 flex items-center justify-center gap-1 text-slate-400 hover:text-slate-200 hover:bg-darkbg-card rounded text-xs transition">
                        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                        Adaugă
                    </a>
                </div>
            </div>
            @endforeach
        </div>
    </div>

</div>
@endsection
