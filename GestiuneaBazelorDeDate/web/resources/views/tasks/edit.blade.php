@extends('layouts.app')

@section('title', 'Editare ' . $task->task_key)
@section('page_title', 'Editare Task: ' . $task->task_key)

@section('content')
<div class="max-w-2xl mx-auto">
    <div class="bg-darkbg-card border border-darkbg-border rounded-xl p-6">
        <div class="flex items-center justify-between pb-4 mb-4 border-b border-darkbg-border">
            <div class="flex items-center gap-2">
                <span class="text-xs  font-bold px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                    {{ $task->task_key }}
                </span>
                <span class="text-xs text-slate-400">în proiectul</span>
                <span class="text-xs font-semibold text-slate-200">{{ $task->project->name }}</span>
            </div>
            <a href="{{ route('tasks.show', $task->id) }}" class="text-xs text-indigo-400 hover:text-indigo-300 font-medium">
                &larr; Înapoi la detalii
            </a>
        </div>

        <form action="{{ route('tasks.update', $task->id) }}" method="POST" class="space-y-4">
            @csrf
            @method('PUT')

            <div>
                <label class="block text-xs font-semibold text-slate-300 mb-1">Titlu Task*</label>
                <input type="text" name="title" value="{{ old('title', $task->title) }}" required
                       class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
            </div>

            <div>
                <label class="block text-xs font-semibold text-slate-300 mb-1">Descriere & Specificaţii</label>
                <textarea name="description" rows="5" placeholder="Descrie detaliile tehnice ale cerinţei..."
                          class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">{{ old('description', $task->description) }}</textarea>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">Stare Curentă*</label>
                    <select name="status_id" required class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                        @foreach($statuses as $st)
                            <option value="{{ $st->id }}" {{ old('status_id', $task->status_id) == $st->id ? 'selected' : '' }}>
                                {{ $st->name }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">Prioritate*</label>
                    <select name="priority_id" required class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                        @foreach($priorities as $pr)
                            <option value="{{ $pr->id }}" {{ old('priority_id', $task->priority_id) == $pr->id ? 'selected' : '' }}>
                                {{ $pr->name }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">Tip Tichet*</label>
                    <select name="type" required class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                        <option value="task" {{ old('type', $task->type) == 'task' ? 'selected' : '' }}>Task</option>
                        <option value="feature" {{ old('type', $task->type) == 'feature' ? 'selected' : '' }}>Feature</option>
                        <option value="bug" {{ old('type', $task->type) == 'bug' ? 'selected' : '' }}>Bug</option>
                        <option value="improvement" {{ old('type', $task->type) == 'improvement' ? 'selected' : '' }}>Improvement</option>
                    </select>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">Responsabil (Assignee)</label>
                    <select name="assignee_id" class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                        <option value="">Neatribuit</option>
                        @foreach($users as $user)
                            <option value="{{ $user->id }}" {{ old('assignee_id', $task->assignee_id) == $user->id ? 'selected' : '' }}>
                                {{ $user->name }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">Story Points</label>
                    <input type="number" name="story_points" value="{{ old('story_points', $task->story_points) }}" min="0" max="100"
                           class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white  focus:outline-none focus:border-indigo-500">
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">Termen Limită</label>
                    <input type="date" name="due_date" value="{{ old('due_date', $task->due_date ? \Carbon\Carbon::parse($task->due_date)->format('Y-m-d') : '') }}"
                           class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">Ore Estimate</label>
                    <input type="number" step="0.5" name="estimated_hours" value="{{ old('estimated_hours', $task->estimated_hours) }}" min="0"
                           class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white  focus:outline-none focus:border-indigo-500">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">Ore Înregistrate (Logged)</label>
                    <input type="number" step="0.5" name="logged_hours" value="{{ old('logged_hours', $task->logged_hours) }}" min="0"
                           class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white  focus:outline-none focus:border-indigo-500">
                </div>
            </div>

            <div>
                <label class="block text-xs font-semibold text-slate-300 mb-1">Etichete (Tags)</label>
                @php
                    $selectedTags = old('tags', $task->tags->pluck('id')->toArray());
                @endphp
                <div class="flex flex-wrap gap-2 p-3 bg-darkbg-surface border border-darkbg-border rounded-lg">
                    @foreach($tags as $tag)
                    <label class="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                        <input type="checkbox" name="tags[]" value="{{ $tag->id }}"
                               {{ in_array($tag->id, $selectedTags) ? 'checked' : '' }}
                               class="rounded bg-darkbg-card border-darkbg-border text-indigo-600 focus:ring-0">
                        <span class="px-1.5 py-0.5 rounded text-[11px]" style="background-color: {{ $tag->color_hex }}20; color: {{ $tag->color_hex }}">{{ $tag->name }}</span>
                    </label>
                    @endforeach
                </div>
            </div>

            <div class="pt-4 border-t border-darkbg-border flex items-center justify-between">
                <form action="{{ route('tasks.destroy', $task->id) }}" method="POST" onsubmit="return confirm('Sigur dorești să ștergi acest task?');">
                    <!-- Note: Delete can be triggered outside or via link/form -->
                </form>
                <div class="flex items-center gap-2">
                    <a href="{{ route('tasks.show', $task->id) }}" class="px-4 py-2 bg-darkbg-surface text-slate-300 hover:text-white rounded-lg text-xs font-medium transition">Anulează</a>
                    <button type="submit" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-indigo-600/25 transition">
                        Salvează Modificările
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>
@endsection
