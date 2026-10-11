@extends('layouts.app')

@section('title', 'Task Nou')
@section('page_title', 'Creare Task / Issue Nou')

@section('content')
<div class="max-w-2xl mx-auto">
    <div class="bg-darkbg-card border border-darkbg-border rounded-xl p-6">
        <form action="{{ route('tasks.store') }}" method="POST" class="space-y-4">
            @csrf

            <div>
                <label class="block text-xs font-semibold text-slate-300 mb-1">Proiect Părinte*</label>
                <select name="project_id" required class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                    @foreach($projects as $p)
                        <option value="{{ $p->id }}" {{ (old('project_id', $selectedProjectId) == $p->id) ? 'selected' : '' }}>
                            [{{ $p->project_key }}] {{ $p->name }}
                        </option>
                    @endforeach
                </select>
            </div>

            <div>
                <label class="block text-xs font-semibold text-slate-300 mb-1">Titlu Task*</label>
                <input type="text" name="title" value="{{ old('title') }}" placeholder="ex: Implementare constrângeri de integritate referenţială" required
                       class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
            </div>

            <div>
                <label class="block text-xs font-semibold text-slate-300 mb-1">Descriere & Specificaţii</label>
                <textarea name="description" rows="4" placeholder="Descrie detaliile tehnice ale cerinţei..."
                          class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">{{ old('description') }}</textarea>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">Stare Iniţială*</label>
                    <select name="status_id" required class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                        @foreach($statuses as $st)
                            <option value="{{ $st->id }}" {{ old('status_id') == $st->id ? 'selected' : '' }}>{{ $st->name }}</option>
                        @endforeach
                    </select>
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">Prioritate*</label>
                    <select name="priority_id" required class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                        @foreach($priorities as $pr)
                            <option value="{{ $pr->id }}" {{ old('priority_id') == $pr->id || $pr->slug == 'medium' ? 'selected' : '' }}>{{ $pr->name }}</option>
                        @endforeach
                    </select>
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">Tip Tichet*</label>
                    <select name="type" required class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                        <option value="task" selected>Task</option>
                        <option value="feature">Feature</option>
                        <option value="bug">Bug</option>
                        <option value="improvement">Improvement</option>
                    </select>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">Responsabil (Assignee)</label>
                    <select name="assignee_id" class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                        <option value="">Neatribuit</option>
                        @foreach($users as $user)
                            <option value="{{ $user->id }}" {{ old('assignee_id') == $user->id ? 'selected' : '' }}>{{ $user->name }}</option>
                        @endforeach
                    </select>
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">Story Points (1-100)</label>
                    <input type="number" name="story_points" value="{{ old('story_points', 3) }}" min="0" max="100"
                           class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-indigo-500">
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">Termen Limită</label>
                    <input type="date" name="due_date" value="{{ old('due_date') }}"
                           class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                </div>
            </div>

            <div>
                <label class="block text-xs font-semibold text-slate-300 mb-1">Etichete (Tags)</label>
                <div class="flex flex-wrap gap-2 p-3 bg-darkbg-surface border border-darkbg-border rounded-lg">
                    @foreach($tags as $tag)
                    <label class="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                        <input type="checkbox" name="tags[]" value="{{ $tag->id }}" class="rounded bg-darkbg-card border-darkbg-border text-indigo-600 focus:ring-0">
                        <span class="px-1.5 py-0.2 rounded text-[11px]" style="background-color: {{ $tag->color_hex }}20; color: {{ $tag->color_hex }}">{{ $tag->name }}</span>
                    </label>
                    @endforeach
                </div>
            </div>

            <div class="pt-4 border-t border-darkbg-border flex items-center justify-end gap-3">
                <a href="{{ route('tasks.index') }}" class="px-4 py-2 bg-darkbg-surface text-slate-300 hover:text-white rounded-lg text-xs font-medium transition">Anulează</a>
                <button type="submit" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-indigo-600/25 transition">
                    Creează Taskul
                </button>
            </div>
        </form>
    </div>
</div>
@endsection
