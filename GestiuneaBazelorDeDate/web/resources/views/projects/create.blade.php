@extends('layouts.app')

@section('title', __('New Project'))
@section('page_title', __('Create Project'))

@section('content')
<div class="max-w-2xl mx-auto">
    <div class="bg-darkbg-card border border-darkbg-border rounded-xl p-6">
        <form action="{{ route('projects.store') }}" method="POST" class="space-y-4">
            @csrf

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">{{ __('Project Key') }}*</label>
                    <input type="text" name="project_key" value="{{ old('project_key') }}" maxlength="10" placeholder="ex: GBD" required
                           class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs uppercase text-white focus:outline-none focus:border-indigo-500">
                    <span class="text-[10px] text-slate-400">Prefix (ex: GBD-1)</span>
                </div>

                <div class="sm:col-span-2">
                    <label class="block text-xs font-semibold text-slate-300 mb-1">{{ __('Project Name') }}*</label>
                    <input type="text" name="name" value="{{ old('name') }}" placeholder="ex: Core Platform" required
                           class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                </div>
            </div>

            <div>
                <label class="block text-xs font-semibold text-slate-300 mb-1">{{ __('Description') }}</label>
                <textarea name="description" rows="3" placeholder="Technical specifications..."
                          class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">{{ old('description') }}</textarea>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">{{ __('Owner:') }}*</label>
                    <select name="owner_id" required class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                        @foreach($users as $user)
                            <option value="{{ $user->id }}" {{ old('owner_id') == $user->id ? 'selected' : '' }}>{{ $user->name }}</option>
                        @endforeach
                    </select>
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">{{ __('Status') }}*</label>
                    <select name="status" required class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                        <option value="active" selected>{{ __('Active') }}</option>
                        <option value="planning">{{ __('Planning') }}</option>
                        <option value="paused">{{ __('Paused') }}</option>
                        <option value="completed">{{ __('Completed') }}</option>
                    </select>
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">{{ __('Priority') }}*</label>
                    <select name="priority" required class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                        <option value="low">{{ __('Low') }}</option>
                        <option value="medium" selected>{{ __('Medium') }}</option>
                        <option value="high">{{ __('High') }}</option>
                        <option value="urgent">{{ __('Urgent') }}</option>
                    </select>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">Start Date</label>
                    <input type="date" name="start_date" value="{{ old('start_date', date('Y-m-d')) }}"
                           class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">{{ __('Due Date') }}</label>
                    <input type="date" name="due_date" value="{{ old('due_date') }}"
                           class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">{{ __('Allocated Budget') }} ($)</label>
                    <input type="number" step="0.01" name="budget" value="{{ old('budget', '0.00') }}"
                           class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                </div>
            </div>

            <div>
                <label class="block text-xs font-semibold text-slate-300 mb-1">{{ __('Team & Roles') }}</label>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 bg-darkbg-surface border border-darkbg-border rounded-lg max-h-36 overflow-y-auto">
                    @foreach($users as $user)
                    <label class="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                        <input type="checkbox" name="members[]" value="{{ $user->id }}" class="rounded bg-darkbg-card border-darkbg-border text-indigo-600 focus:ring-0">
                        <span>{{ $user->name }}</span>
                    </label>
                    @endforeach
                </div>
            </div>

            <div class="pt-4 border-t border-darkbg-border flex items-center justify-end gap-3">
                <a href="{{ route('projects.index') }}" class="px-4 py-2 bg-darkbg-surface text-slate-300 hover:text-white rounded-lg text-xs font-medium transition">{{ __('Cancel') }}</a>
                <button type="submit" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-indigo-600/25 transition">
                    {{ __('Create Project') }}
                </button>
            </div>
        </form>
    </div>
</div>
@endsection
