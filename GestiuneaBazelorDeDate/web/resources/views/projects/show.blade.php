@extends('layouts.app')

@section('title', $project->name)
@section('page_title', $project->name)

@section('badge')
    <span class="px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded text-xs font-semibold">
        {{ $project->project_key }}
    </span>
@endsection

@section('content')
<div class="space-y-6 max-w-full">

    <!-- 1. PROJECT HEADER SUMMARY -->
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
                        Priority: {{ $project->priority }}
                    </span>
                </div>
                <p class="text-xs text-slate-400 max-w-3xl leading-relaxed">{{ $project->description }}</p>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center gap-2 shrink-0">
                <a href="{{ route('tasks.create', ['project_id' => $project->id]) }}" class="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow transition flex items-center gap-1.5">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                    New Issue
                </a>
                <a href="{{ route('projects.edit', $project) }}" class="px-3 py-2 bg-darkbg-surface hover:bg-darkbg-hover text-slate-300 border border-darkbg-border rounded-lg text-xs font-medium transition">
                    Project Settings
                </a>
            </div>
        </div>

        <!-- Progress and Metrics -->
        <div class="mt-5 pt-4 border-t border-darkbg-border/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
                <span class="text-slate-400 block mb-0.5">Project Lead</span>
                <span class="font-semibold text-white">{{ $project->owner->name ?? 'Unassigned' }}</span>
            </div>
            <div>
                <span class="text-slate-400 block mb-0.5">Due Date</span>
                <span class="font-semibold text-white">{{ $project->due_date ? $project->due_date->format('M d, Y') : 'Not set' }}</span>
            </div>
            <div>
                <span class="text-slate-400 block mb-0.5">Allocated Budget</span>
                <span class="font-semibold text-white">${{ number_format($project->budget, 2) }}</span>
            </div>
            <div>
                <span class="text-slate-400 block mb-0.5">Completion ({{ $project->progress_percentage }}%)</span>
                <div class="w-full h-2 bg-darkbg-surface rounded-full overflow-hidden mt-1">
                    <div class="h-full bg-emerald-400 rounded-full" style="width: {{ $project->progress_percentage }}%"></div>
                </div>
            </div>
        </div>
    </div>

    <!-- 2. KANBAN BOARD -->
    <div>
        <div class="flex items-center justify-between mb-3 px-1">
            <h3 class="text-sm font-semibold text-white flex items-center gap-2">
                <span>Workflow Board</span>
                <span class="text-xs text-slate-400 font-normal">({{ $project->tasks->count() }} issues)</span>
            </h3>
        </div>

        <!-- Horizontal Columns -->
        <div class="flex gap-4 overflow-x-auto pb-6">
            @foreach($statuses as $status)
            @php
                $columnTasks = $kanbanColumns[$status->id]['tasks'] ?? collect();
            @endphp
            <div class="w-72 shrink-0 flex flex-col bg-darkbg-surface border border-darkbg-border rounded-xl max-h-[75vh]">
                <!-- Column Header -->
                <div class="p-3 border-b border-darkbg-border flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <span class="w-2.5 h-2.5 rounded-full" style="background-color: {{ $status->color_hex }}"></span>
                        <span class="text-xs font-semibold text-white">{{ $status->name }}</span>
                    </div>
                    <span class="px-2 py-0.5 rounded-full bg-darkbg-card text-slate-400 text-[11px] font-medium">
                        {{ $columnTasks->count() }}
                    </span>
                </div>

                <!-- Cards List -->
                <div class="p-2 space-y-2.5 flex-1 overflow-y-auto">
                    @forelse($columnTasks as $task)
                    <div class="bg-darkbg-card border border-darkbg-border hover:border-indigo-500/50 rounded-lg p-3 shadow-sm hover:shadow-md transition group">
                        <!-- Key & Priority -->
                        <div class="flex items-center justify-between mb-1.5 text-xs">
                            <a href="{{ route('tasks.show', $task) }}" class="font-semibold text-indigo-400 hover:underline">
                                {{ $task->task_key }}
                            </a>
                            <span class="px-1.5 py-0.5 rounded text-[10px] uppercase font-semibold" 
                                  style="color: {{ $task->priority->color_hex }}; background-color: {{ $task->priority->color_hex }}15;">
                                {{ $task->priority->name }}
                            </span>
                        </div>

                        <!-- Title -->
                        <h4 class="text-xs font-medium text-white group-hover:text-indigo-300 transition line-clamp-2 mb-2">
                            <a href="{{ route('tasks.show', $task) }}">{{ $task->title }}</a>
                        </h4>

                        <!-- Tags -->
                        @if($task->tags->isNotEmpty())
                        <div class="flex flex-wrap gap-1 mb-2">
                            @foreach($task->tags as $tag)
                            <span class="px-1.5 py-0.2 rounded text-[10px]" style="background-color: {{ $tag->color_hex }}15; color: {{ $tag->color_hex }}">
                                {{ $tag->name }}
                            </span>
                            @endforeach
                        </div>
                        @endif

                        <!-- Footer -->
                        <div class="pt-2 border-t border-darkbg-border/60 flex items-center justify-between text-xs text-slate-400">
                            <div class="flex items-center gap-1.5">
                                <div class="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-300">
                                    {{ strtoupper(substr($task->assignee->name ?? 'U', 0, 1)) }}
                                </div>
                                <span class="text-[11px] truncate max-w-[90px]">{{ $task->assignee->name ?? 'Unassigned' }}</span>
                            </div>

                            <div class="flex items-center gap-1.5">
                                @if($task->story_points)
                                <span class="px-1.5 py-0.5 bg-darkbg-surface rounded text-[10px] text-slate-300 font-semibold" title="Story Points">
                                    {{ $task->story_points }} SP
                                </span>
                                @endif

                                <!-- Quick Status Switch -->
                                <form action="{{ route('tasks.updateStatus', $task) }}" method="POST" class="inline">
                                    @csrf
                                    @method('PATCH')
                                    <select name="status_id" onchange="this.form.submit()" 
                                            class="bg-darkbg-surface border border-darkbg-border rounded text-[11px] text-slate-300 py-0.5 px-1 focus:outline-none focus:border-indigo-500 cursor-pointer">
                                        @foreach($statuses as $st)
                                            <option value="{{ $st->id }}" {{ $st->id === $task->status_id ? 'selected' : '' }}>
                                                {{ $st->name }}
                                            </option>
                                        @endforeach
                                    </select>
                                </form>
                            </div>
                        </div>
                    </div>
                    @empty
                    <div class="text-center py-6 text-xs text-slate-500 border border-dashed border-darkbg-border rounded-lg">
                        No issues in this column
                    </div>
                    @endforelse
                </div>
            </div>
            @endforeach
        </div>
    </div>

</div>
@endsection
