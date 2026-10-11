@extends('layouts.app')

@section('title', __('Team & Roles'))
@section('page_title', __('Team Directory & Roles'))

@section('content')
<div class="space-y-6">

    <!-- Header & Statistics Row -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-darkbg-card border border-darkbg-border rounded-xl p-5 flex items-center justify-between">
            <div>
                <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider">{{ __('Total Members') }}</div>
                <div class="text-2xl font-bold text-white mt-1">{{ $users->count() }}</div>
            </div>
            <div class="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
            </div>
        </div>

        @foreach($rolesDistribution->take(3) as $dist)
        <div class="bg-darkbg-card border border-darkbg-border rounded-xl p-5 flex items-center justify-between">
            <div>
                <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider truncate max-w-[150px]">{{ $dist->name }}</div>
                <div class="text-2xl font-bold text-white mt-1">{{ $dist->user_count }} <span class="text-xs font-normal text-slate-400">{{ __('members') }}</span></div>
            </div>
            <div class="w-10 h-10 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-300">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
            </div>
        </div>
        @endforeach
    </div>

    <!-- Main Content Grid: Team List + Add Member Form -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <!-- Team Members Directory Table (2 cols) -->
        <div class="lg:col-span-2 bg-darkbg-card border border-darkbg-border rounded-xl overflow-hidden">
            <div class="p-5 border-b border-darkbg-border flex items-center justify-between">
                <div>
                    <h2 class="text-base font-semibold text-white">{{ __('Team Directory & Permissions') }}</h2>
                    <p class="text-xs text-slate-400 mt-0.5">{{ __('Active users, system roles, and assigned workload') }}</p>
                </div>
                <span class="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {{ $users->count() }} {{ __('members') }}
                </span>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full text-left text-xs">
                    <thead>
                        <tr class="border-b border-darkbg-border bg-darkbg-surface/50 text-slate-400 font-semibold uppercase tracking-wider">
                            <th class="py-3 px-4">{{ __('Full Name') }}</th>
                            <th class="py-3 px-4">{{ __('Job Title') }}</th>
                            <th class="py-3 px-4">{{ __('Role & Access') }}</th>
                            <th class="py-3 px-4 text-center">{{ __('All Issues') }}</th>
                            <th class="py-3 px-4 text-center">{{ __('Projects') }}</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-darkbg-border">
                        @forelse($users as $user)
                        <tr class="hover:bg-darkbg-hover/50 transition">
                            <td class="py-3.5 px-4">
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shadow">
                                        {{ strtoupper(substr($user->name, 0, 1)) }}
                                    </div>
                                    <div>
                                        <div class="font-medium text-white">{{ $user->name }}</div>
                                        <div class="text-[11px] text-slate-400">{{ $user->email }}</div>
                                    </div>
                                </div>
                            </td>

                            <td class="py-3.5 px-4 text-slate-300">
                                {{ $user->title ?? 'Team Member' }}
                            </td>

                            <td class="py-3.5 px-4">
                                <form action="{{ route('teams.updateRole', $user->id) }}" method="POST" class="inline-flex items-center gap-1.5">
                                    @csrf
                                    @method('PATCH')
                                    <select name="role_id" onchange="this.form.submit()"
                                            class="bg-darkbg-surface border border-darkbg-border rounded px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer">
                                        @foreach($roles as $role)
                                            <option value="{{ $role->id }}" {{ $user->role_id == $role->id ? 'selected' : '' }}>
                                                {{ $role->name }}
                                            </option>
                                        @endforeach
                                    </select>
                                </form>
                            </td>

                            <td class="py-3.5 px-4 text-center">
                                <span class="text-xs px-2 py-0.5 rounded bg-slate-800 text-indigo-400 border border-slate-700 font-semibold">
                                    {{ $user->assigned_tasks_count }}
                                </span>
                            </td>

                            <td class="py-3.5 px-4 text-center">
                                <span class="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                                    {{ $user->projects_count }}
                                </span>
                            </td>
                        </tr>
                        @empty
                        <tr>
                            <td colspan="5" class="py-8 text-center text-slate-400">{{ __('No registered users found.') }}</td>
                        </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Add New Team Member Form (1 col) -->
        <div class="bg-darkbg-card border border-darkbg-border rounded-xl p-5 self-start">
            <div class="pb-3 mb-4 border-b border-darkbg-border">
                <h3 class="text-sm font-semibold text-white">{{ __('Add Team Member') }}</h3>
                <p class="text-xs text-slate-400 mt-0.5">{{ __('Invite a new user with system permissions') }}</p>
            </div>

            <form action="{{ route('teams.store') }}" method="POST" class="space-y-4">
                @csrf

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">{{ __('Full Name') }}*</label>
                    <input type="text" name="name" value="{{ old('name') }}" required placeholder="e.g. Diana Miller"
                           class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">{{ __('Email Address') }}*</label>
                    <input type="email" name="email" value="{{ old('email') }}" required placeholder="e.g. diana@example.com"
                           class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">{{ __('Job Title') }}*</label>
                    <input type="text" name="title" value="{{ old('title') }}" required placeholder="e.g. Frontend Engineer"
                           class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">{{ __('System Role') }}*</label>
                    <select name="role_id" required class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                        @foreach($roles as $role)
                            <option value="{{ $role->id }}" {{ $role->slug == 'dev' ? 'selected' : '' }}>
                                {{ $role->name }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">{{ __('Temporary Password') }}*</label>
                    <input type="password" name="password" required placeholder="{{ __('Minimum 6 characters') }}"
                           class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                </div>

                <div class="pt-2">
                    <button type="submit" class="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow transition">
                        + {{ __('Add Team Member') }}
                    </button>
                </div>
            </form>
        </div>

    </div>

</div>
@endsection
