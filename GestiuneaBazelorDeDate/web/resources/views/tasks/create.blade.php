@extends('layouts.app')

@section('title', __('New Issue'))
@section('page_title', __('Create Issue'))

@section('content')
<div class="max-w-2xl mx-auto">
    <div class="bg-darkbg-card border border-darkbg-border rounded-xl p-6">
        <form action="{{ route('tasks.store') }}" method="POST" class="space-y-4">
            @csrf

            <div>
                <label class="block text-xs font-semibold text-slate-300 mb-1">{{ __('Project') }}*</label>
                <select name="project_id" required class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                    @foreach($projects as $p)
                        <option value="{{ $p->id }}" {{ (old('project_id', $selectedProjectId) == $p->id) ? 'selected' : '' }}>
                            [{{ $p->project_key }}] {{ $p->name }}
                        </option>
                    @endforeach
                </select>
            </div>

            <div>
                <label class="block text-xs font-semibold text-slate-300 mb-1">{{ __('Issue Title') }}*</label>
                <input type="text" name="title" value="{{ old('title') }}" placeholder="e.g. Implement schema referential integrity" required
                       class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
            </div>

            <div>
                <label class="block text-xs font-semibold text-slate-300 mb-1">{{ __('Description') }}</label>
                <textarea name="description" rows="4" placeholder="Technical specifications..."
                          class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">{{ old('description') }}</textarea>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">{{ __('Status') }}*</label>
                    <select name="status_id" required class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                        @foreach($statuses as $st)
                            <option value="{{ $st->id }}" {{ old('status_id') == $st->id ? 'selected' : '' }}>{{ __($st->name) }}</option>
                        @endforeach
                    </select>
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">{{ __('Priority') }}*</label>
                    <select name="priority_id" required class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                        @foreach($priorities as $pr)
                            <option value="{{ $pr->id }}" {{ old('priority_id') == $pr->id || $pr->slug == 'medium' ? 'selected' : '' }}>{{ __($pr->name) }}</option>
                        @endforeach
                    </select>
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">{{ __('Distribution by Issue Type') }}*</label>
                    <select name="type" required class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                        <option value="task" selected>{{ __('Task') }}</option>
                        <option value="feature">{{ __('Feature') }}</option>
                        <option value="bug">{{ __('Bug') }}</option>
                        <option value="improvement">{{ __('Improvement') }}</option>
                    </select>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">{{ __('Assignee') }}</label>
                    <select name="assignee_id" class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                        <option value="">{{ __('Unassigned') }}</option>
                        @foreach($users as $user)
                            <option value="{{ $user->id }}" {{ old('assignee_id') == $user->id ? 'selected' : '' }}>{{ $user->name }}</option>
                        @endforeach
                    </select>
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">{{ __('Story Points') }} (1-100)</label>
                    <input type="number" name="story_points" value="{{ old('story_points', 3) }}" min="0" max="100"
                           class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">{{ __('Due Date') }}</label>
                    <input type="date" name="due_date" value="{{ old('due_date') }}"
                           class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                </div>
            </div>

            <div>
                <label class="block text-xs font-semibold text-slate-300 mb-1">{{ __('Tags') }}</label>
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
                <a href="{{ route('tasks.index') }}" class="px-4 py-2 bg-darkbg-surface text-slate-300 hover:text-white rounded-lg text-xs font-medium transition">{{ __('Cancel') }}</a>
                <button type="submit" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-indigo-600/25 transition">
                    {{ __('Create Issue') }}
                </button>
            </div>
        </form>
    </div>
</div>
@endsection
