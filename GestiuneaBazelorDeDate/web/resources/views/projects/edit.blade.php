@extends('layouts.app')

@section('title', __('Edit') . ' ' . $project->name)
@section('page_title', __('Project Settings') . ': ' . $project->project_key)

@section('content')
<div class="max-w-2xl mx-auto space-y-6">
    <div class="bg-darkbg-card border border-darkbg-border rounded-xl p-6">
        <form action="{{ route('projects.update', $project) }}" method="POST" class="space-y-4">
            @csrf
            @method('PUT')

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">{{ __('Project Key') }}</label>
                    <input type="text" value="{{ $project->project_key }}" disabled
                           class="w-full bg-darkbg-surface/50 border border-darkbg-border rounded-lg px-3 py-2 text-xs uppercase text-slate-500 cursor-not-allowed">
                </div>

                <div class="sm:col-span-2">
                    <label class="block text-xs font-semibold text-slate-300 mb-1">{{ __('Project Name') }}*</label>
                    <input type="text" name="name" value="{{ old('name', $project->name) }}" required
                           class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                </div>
            </div>

            <div>
                <label class="block text-xs font-semibold text-slate-300 mb-1">{{ __('Description') }}</label>
                <textarea name="description" rows="3"
                          class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">{{ old('description', $project->description) }}</textarea>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">{{ __('Owner:') }}*</label>
                    <select name="owner_id" required class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                        @foreach($users as $user)
                            <option value="{{ $user->id }}" {{ old('owner_id', $project->owner_id) == $user->id ? 'selected' : '' }}>{{ $user->name }}</option>
                        @endforeach
                    </select>
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">{{ __('Status') }}*</label>
                    <select name="status" required class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                        <option value="active" {{ $project->status === 'active' ? 'selected' : '' }}>{{ __('Active') }}</option>
                        <option value="planning" {{ $project->status === 'planning' ? 'selected' : '' }}>{{ __('Planning') }}</option>
                        <option value="paused" {{ $project->status === 'paused' ? 'selected' : '' }}>{{ __('Paused') }}</option>
                        <option value="completed" {{ $project->status === 'completed' ? 'selected' : '' }}>{{ __('Completed') }}</option>
                    </select>
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">{{ __('Priority') }}*</label>
                    <select name="priority" required class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                        <option value="low" {{ $project->priority === 'low' ? 'selected' : '' }}>{{ __('Low') }}</option>
                        <option value="medium" {{ $project->priority === 'medium' ? 'selected' : '' }}>{{ __('Medium') }}</option>
                        <option value="high" {{ $project->priority === 'high' ? 'selected' : '' }}>{{ __('High') }}</option>
                        <option value="urgent" {{ $project->priority === 'urgent' ? 'selected' : '' }}>{{ __('Urgent') }}</option>
                    </select>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">Start Date</label>
                    <input type="date" name="start_date" value="{{ old('start_date', $project->start_date ? $project->start_date->format('Y-m-d') : '') }}"
                           class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">{{ __('Due Date') }}</label>
                    <input type="date" name="due_date" value="{{ old('due_date', $project->due_date ? $project->due_date->format('Y-m-d') : '') }}"
                           class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">{{ __('Allocated Budget') }} ($)</label>
                    <input type="number" step="0.01" name="budget" value="{{ old('budget', $project->budget) }}"
                           class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                </div>
            </div>

            <div>
                <label class="block text-xs font-semibold text-slate-300 mb-1">{{ __('Team & Roles') }}</label>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 bg-darkbg-surface border border-darkbg-border rounded-lg max-h-36 overflow-y-auto">
                    @php $memberIds = $project->members->pluck('id')->toArray(); @endphp
                    @foreach($users as $user)
                    <label class="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                        <input type="checkbox" name="members[]" value="{{ $user->id }}" {{ in_array($user->id, $memberIds) ? 'checked' : '' }}
                               class="rounded bg-darkbg-card border-darkbg-border text-indigo-600 focus:ring-0">
                        <span>{{ $user->name }}</span>
                    </label>
                    @endforeach
                </div>
            </div>

            <div class="pt-4 border-t border-darkbg-border flex items-center justify-between">
                <a href="{{ route('projects.show', $project) }}" class="text-xs text-slate-400 hover:text-white">&larr; {{ __('Cancel') }}</a>
                
                <div class="flex items-center gap-2">
                    <button type="submit" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-indigo-600/25 transition">
                        {{ __('Save Changes') }}
                    </button>
                </div>
            </div>
        </form>
    </div>

    <!-- Danger Zone: Delete Project (Cascade Integrity) -->
    <div class="bg-darkbg-card border border-rose-500/20 rounded-xl p-5 flex items-center justify-between">
        <div>
            <h4 class="text-xs font-semibold text-rose-400">{{ __('Delete') }} {{ __('Project') }}</h4>
            <p class="text-[11px] text-slate-400">Cascade delete enabled (ON DELETE CASCADE).</p>
        </div>
        <form action="{{ route('projects.destroy', $project) }}" method="POST" onsubmit="return confirm('Confirm deletion of this project and all associated tasks?')">
            @csrf
            @method('DELETE')
            <button type="submit" class="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/30 rounded-lg text-xs font-semibold transition">
                {{ __('Delete') }}
            </button>
        </form>
    </div>
</div>
@endsection
