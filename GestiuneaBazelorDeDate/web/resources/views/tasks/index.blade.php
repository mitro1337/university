@extends('layouts.app')

@section('title', 'Taskuri')
@section('page_title', 'Toate Taskurile')

@section('content')
<div class="space-y-6 max-w-7xl mx-auto">

    <!-- FILTRE COMPLEXE PENTRU INTEROGARE SQL -->
    <div class="bg-darkbg-card border border-darkbg-border p-4 rounded-xl">
        <form action="{{ route('tasks.index') }}" method="GET" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            <div class="lg:col-span-2 relative">
                <input type="text" name="search" value="{{ request('search') }}" placeholder="Caută task, cheie sau descriere..." 
                       class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500">
                <svg class="w-4 h-4 text-slate-400 absolute left-2.5 top-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
            </div>

            <select name="project_id" onchange="this.form.submit()" class="bg-darkbg-surface border border-darkbg-border rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500">
                <option value="">Toate Proiectele</option>
                @foreach($projects as $p)
                    <option value="{{ $p->id }}" {{ request('project_id') == $p->id ? 'selected' : '' }}>{{ $p->project_key }} - {{ $p->name }}</option>
                @endforeach
            </select>

            <select name="status_id" onchange="this.form.submit()" class="bg-darkbg-surface border border-darkbg-border rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500">
                <option value="">Toate Stările</option>
                @foreach($statuses as $st)
                    <option value="{{ $st->id }}" {{ request('status_id') == $st->id ? 'selected' : '' }}>{{ $st->name }}</option>
                @endforeach
            </select>

            <select name="priority_id" onchange="this.form.submit()" class="bg-darkbg-surface border border-darkbg-border rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500">
                <option value="">Toate Priorităţile</option>
                @foreach($priorities as $pr)
                    <option value="{{ $pr->id }}" {{ request('priority_id') == $pr->id ? 'selected' : '' }}>{{ $pr->name }}</option>
                @endforeach
            </select>

            <select name="assignee_id" onchange="this.form.submit()" class="bg-darkbg-surface border border-darkbg-border rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500">
                <option value="">Toţi Responsabilii</option>
                @foreach($users as $u)
                    <option value="{{ $u->id }}" {{ request('assignee_id') == $u->id ? 'selected' : '' }}>{{ $u->name }}</option>
                @endforeach
            </select>
        </form>
    </div>

    <!-- TABEL TASKURI -->
    <div class="bg-darkbg-card border border-darkbg-border rounded-xl overflow-hidden shadow-sm">
        <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
                <thead class="bg-darkbg-surface text-slate-400 border-b border-darkbg-border font-semibold uppercase tracking-wider">
                    <tr>
                        <th class="py-3 px-4">Cheie</th>
                        <th class="py-3 px-4">Titlu & Etichete</th>
                        <th class="py-3 px-4">Proiect</th>
                        <th class="py-3 px-4">Stare</th>
                        <th class="py-3 px-4">Prioritate</th>
                        <th class="py-3 px-4">Responsabil</th>
                        <th class="py-3 px-4 text-center">Puncte</th>
                        <th class="py-3 px-4">Termen</th>
                        <th class="py-3 px-4 text-right">Acţiuni</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-darkbg-border/60">
                    @forelse($tasks as $task)
                    <tr class="hover:bg-darkbg-surface/50 transition">
                        <td class="py-3 px-4 font-mono font-bold text-indigo-400">
                            <a href="{{ route('tasks.show', $task) }}" class="hover:underline">{{ $task->task_key }}</a>
                        </td>
                        <td class="py-3 px-4">
                            <div class="font-medium text-white hover:text-indigo-400 transition">
                                <a href="{{ route('tasks.show', $task) }}">{{ $task->title }}</a>
                            </div>
                            <div class="flex flex-wrap gap-1 mt-1">
                                <span class="px-1.5 py-0.2 bg-slate-800 text-slate-400 rounded text-[10px] capitalize">{{ $task->type }}</span>
                                @foreach($task->tags as $tag)
                                <span class="px-1.5 py-0.2 rounded text-[10px]" style="background-color: {{ $tag->color_hex }}20; color: {{ $tag->color_hex }}">
                                    {{ $tag->name }}
                                </span>
                                @endforeach
                            </div>
                        </td>
                        <td class="py-3 px-4 text-slate-300">
                            <span class="font-mono text-slate-400">[{{ $task->project->project_key }}]</span> {{ Str::limit($task->project->name, 20) }}
                        </td>
                        <td class="py-3 px-4">
                            <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium" 
                                  style="background-color: {{ $task->status->color_hex }}15; color: {{ $task->status->color_hex }}; border: 1px solid {{ $task->status->color_hex }}30;">
                                <span class="w-1.5 h-1.5 rounded-full" style="background-color: {{ $task->status->color_hex }}"></span>
                                {{ $task->status->name }}
                            </span>
                        </td>
                        <td class="py-3 px-4 font-medium" style="color: {{ $task->priority->color_hex }}">
                            {{ $task->priority->name }}
                        </td>
                        <td class="py-3 px-4 text-slate-300">
                            @if($task->assignee)
                                <div class="flex items-center gap-2">
                                    <div class="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-[10px] text-white font-bold">
                                        {{ strtoupper(substr($task->assignee->name, 0, 1)) }}
                                    </div>
                                    <span>{{ $task->assignee->name }}</span>
                                </div>
                            @else
                                <span class="text-slate-400 italic">Neatribuit</span>
                            @endif
                        </td>
                        <td class="py-3 px-4 text-center font-mono font-bold text-slate-300">
                            {{ $task->story_points ?? '-' }}
                        </td>
                        <td class="py-3 px-4 whitespace-nowrap">
                            @if($task->due_date)
                                <span class="{{ $task->isOverdue() ? 'text-rose-400 font-bold' : 'text-slate-400' }}">
                                    {{ $task->due_date->format('d M Y') }}
                                </span>
                            @else
                                <span class="text-slate-400">-</span>
                            @endif
                        </td>
                        <td class="py-3 px-4 text-right whitespace-nowrap">
                            <a href="{{ route('tasks.show', $task) }}" class="text-indigo-400 hover:text-indigo-300 mr-2">Detalii</a>
                            <a href="{{ route('tasks.edit', $task) }}" class="text-slate-400 hover:text-white">Edit</a>
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="9" class="py-8 text-center text-slate-400">
                            Niciun task nu corespunde filtrelor selectate.
                        </td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>

    <!-- Paginare -->
    <div class="pt-2">
        {{ $tasks->links() }}
    </div>

</div>
@endsection
