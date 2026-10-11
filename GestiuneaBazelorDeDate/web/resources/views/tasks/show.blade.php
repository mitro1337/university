@extends('layouts.app')

@section('title', '[' . $task->task_key . '] ' . $task->title)
@section('page_title', $task->task_key . ': ' . Str::limit($task->title, 40))

@section('badge')
    <span class="px-2 py-0.5 rounded text-xs font-medium" 
          style="background-color: {{ $task->status->color_hex }}15; color: {{ $task->status->color_hex }}; border: 1px solid {{ $task->status->color_hex }}30;">
        {{ $task->status->name }}
    </span>
@endsection

@section('content')
<div class="max-w-7xl mx-auto space-y-6">

    <!-- BREADCRUMB ŞI NAVIGARE -->
    <div class="flex items-center justify-between text-xs text-slate-400">
        <div class="flex items-center gap-2">
            <a href="{{ route('projects.show', $task->project) }}" class="hover:text-indigo-400 font-mono font-bold text-slate-300">
                &larr; {{ $task->project->project_key }} ({{ $task->project->name }})
            </a>
            <span>/</span>
            <span class="font-mono text-indigo-400 font-bold">{{ $task->task_key }}</span>
        </div>

        <div class="flex items-center gap-2">
            <a href="{{ route('tasks.edit', $task) }}" class="px-3 py-1.5 bg-darkbg-card hover:bg-darkbg-hover text-slate-200 border border-darkbg-border rounded-lg transition font-medium">
                Editează Task
            </a>
            <form action="{{ route('tasks.destroy', $task) }}" method="POST" onsubmit="return confirm('Sigur doreşti să ştergi acest task?')">
                @csrf
                @method('DELETE')
                <button type="submit" class="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/20 rounded-lg transition font-medium">
                    Şterge
                </button>
            </form>
        </div>
    </div>

    <!-- MAIN TWO-COLUMN SPLIT (STYLE LINEAR/JIRA) -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <!-- COLOANA STÂNGA: DETALII, COMENTARII ŞI AUDIT TRAIL (2 COLOANE) -->
        <div class="lg:col-span-2 space-y-6">
            <!-- Box Principal: Titlu şi Descriere -->
            <div class="bg-darkbg-card border border-darkbg-border rounded-xl p-6">
                <div class="flex items-center gap-2 mb-2">
                    <span class="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-xs uppercase font-mono font-bold tracking-wider">
                        {{ $task->type }}
                    </span>
                    @if($task->isOverdue())
                    <span class="px-2 py-0.5 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded text-xs font-bold">
                        RESTANT (OVERDUE)
                    </span>
                    @endif
                </div>

                <h2 class="text-xl font-bold text-white mb-4 leading-snug">{{ $task->title }}</h2>

                <div class="text-xs text-slate-300 leading-relaxed bg-darkbg-surface border border-darkbg-border/60 p-4 rounded-lg">
                    {!! nl2br(e($task->description ?? 'Nu a fost specificată nicio descriere detaliată.')) !!}
                </div>
            </div>

            <!-- Box Comentarii (Collaborative Discussions) -->
            <div class="bg-darkbg-card border border-darkbg-border rounded-xl p-6 space-y-4">
                <h3 class="text-sm font-semibold text-white flex items-center gap-2">
                    <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                    Comentarii şi Notiţe ({{ $task->comments->count() }})
                </h3>

                <!-- Formular adaugare comentariu nou -->
                <form action="{{ route('comments.store', $task) }}" method="POST" class="space-y-3">
                    @csrf
                    <textarea name="content" rows="3" placeholder="Scrie un comentariu sau o actualizare tehnică..." required
                              class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg p-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"></textarea>
                    <div class="flex justify-end">
                        <button type="submit" class="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition">
                            Trimite Comentariul
                        </button>
                    </div>
                </form>

                <!-- Fir comentarii existente -->
                <div class="space-y-3 pt-2">
                    @forelse($task->comments as $comment)
                    <div class="p-3.5 bg-darkbg-surface border border-darkbg-border rounded-lg text-xs space-y-1.5">
                        <div class="flex items-center justify-between text-slate-400">
                            <div class="flex items-center gap-2">
                                <span class="font-bold text-slate-200">{{ $comment->user->name ?? 'Utilizator' }}</span>
                                <span class="text-[11px] text-slate-400">&bull; {{ $comment->created_at->diffForHumans() }}</span>
                            </div>
                            <form action="{{ route('comments.destroy', $comment) }}" method="POST" onsubmit="return confirm('Sigur doreşti să ştergi acest comentariu?')">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="text-slate-400 hover:text-rose-400" title="Şterge">&times;</button>
                            </form>
                        </div>
                        <p class="text-slate-300 leading-relaxed">{{ $comment->content }}</p>
                    </div>
                    @empty
                    <p class="text-xs text-slate-400 text-center py-4">Nu există comentarii încă. Fii primul care adaugă o notă!</p>
                    @endforelse
                </div>
            </div>

            <!-- Box Istoric de Modificări (Audit Trail) -->
            <div class="bg-darkbg-card border border-darkbg-border rounded-xl p-6">
                <h3 class="text-sm font-semibold text-white flex items-center gap-2 mb-4">
                    <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    Jurnal de Audit & Istoric Modificări
                </h3>

                <div class="space-y-3 text-xs">
                    @forelse($task->activityLogs as $log)
                    <div class="flex items-start gap-3 border-l-2 border-indigo-500/40 pl-3 py-1">
                        <div class="flex-1">
                            <p class="text-slate-200">
                                <b class="text-white">{{ $log->user->name ?? 'Sistem' }}</b>:
                                {{ $log->description ?? $log->action }}
                            </p>
                            @if($log->field_name)
                            <p class="text-[11px] text-slate-400 mt-0.5 font-mono">
                                {{ $log->field_name }}: <span class="text-rose-400 line-through">{{ $log->old_value }}</span> &rarr; <span class="text-emerald-400">{{ $log->new_value }}</span>
                            </p>
                            @endif
                            <span class="text-[10px] text-slate-400">{{ $log->created_at->format('d M Y, H:i') }}</span>
                        </div>
                    </div>
                    @empty
                    <p class="text-xs text-slate-400 text-center py-2">Nicio intrare în jurnal.</p>
                    @endforelse
                </div>
            </div>
        </div>

        <!-- COLOANA DREAPTA: INSPECTOR METADATE (1 COLOANĂ) -->
        <div class="space-y-6">
            <div class="bg-darkbg-card border border-darkbg-border rounded-xl p-5 space-y-4">
                <h3 class="text-xs font-semibold text-white uppercase tracking-wider border-b border-darkbg-border pb-2">
                    Proprietăţi Task
                </h3>

                <!-- Schimbare Rapida Stare -->
                <div>
                    <label class="block text-[11px] font-medium text-slate-400 mb-1">Stare Curentă</label>
                    <form action="{{ route('tasks.updateStatus', $task) }}" method="POST">
                        @csrf
                        @method('PATCH')
                        <select name="status_id" onchange="this.form.submit()" class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500">
                            @foreach($statuses as $st)
                                <option value="{{ $st->id }}" {{ $st->id == $task->status_id ? 'selected' : '' }}>{{ $st->name }}</option>
                            @endforeach
                        </select>
                    </form>
                </div>

                <!-- Prioritate -->
                <div>
                    <label class="block text-[11px] font-medium text-slate-400 mb-1">Nivel Prioritate</label>
                    <div class="flex items-center gap-2 px-3 py-1.5 bg-darkbg-surface border border-darkbg-border rounded-lg text-xs font-medium" style="color: {{ $task->priority->color_hex }}">
                        <span>&bull;</span> {{ $task->priority->name }} (Nivel {{ $task->priority->level }})
                    </div>
                </div>

                <!-- Responsabil (Assignee) -->
                <div>
                    <label class="block text-[11px] font-medium text-slate-400 mb-1">Responsabil (Assignee)</label>
                    <div class="px-3 py-1.5 bg-darkbg-surface border border-darkbg-border rounded-lg text-xs text-slate-200">
                        {{ $task->assignee->name ?? 'Neatribuit' }}
                    </div>
                </div>

                <!-- Creator (Reporter) -->
                <div>
                    <label class="block text-[11px] font-medium text-slate-400 mb-1">Raportor (Creator)</label>
                    <div class="px-3 py-1.5 bg-darkbg-surface border border-darkbg-border rounded-lg text-xs text-slate-200">
                        {{ $task->creator->name ?? 'Sistem' }}
                    </div>
                </div>

                <!-- Story Points -->
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="block text-[11px] font-medium text-slate-400 mb-1">Story Points</label>
                        <div class="px-3 py-1.5 bg-darkbg-surface border border-darkbg-border rounded-lg text-xs font-mono font-bold text-white">
                            {{ $task->story_points ?? '1' }} SP
                        </div>
                    </div>
                    <div>
                        <label class="block text-[11px] font-medium text-slate-400 mb-1">Ore Înregistrate</label>
                        <div class="px-3 py-1.5 bg-darkbg-surface border border-darkbg-border rounded-lg text-xs font-mono text-emerald-400">
                            {{ $task->logged_hours }} / {{ $task->estimated_hours }} h
                        </div>
                    </div>
                </div>

                <!-- Termen Limita -->
                <div>
                    <label class="block text-[11px] font-medium text-slate-400 mb-1">Dată Limită (Deadline)</label>
                    <div class="px-3 py-1.5 bg-darkbg-surface border border-darkbg-border rounded-lg text-xs {{ $task->isOverdue() ? 'text-rose-400 font-bold' : 'text-slate-200' }}">
                        {{ $task->due_date ? $task->due_date->format('d M Y') : 'Nespecificat' }}
                    </div>
                </div>

                <!-- Etichete (Tags) -->
                <div>
                    <label class="block text-[11px] font-medium text-slate-400 mb-1.5">Etichete (Labels)</label>
                    <div class="flex flex-wrap gap-1.5">
                        @forelse($task->tags as $tag)
                        <span class="px-2 py-0.5 rounded text-[11px] font-medium" style="background-color: {{ $tag->color_hex }}20; color: {{ $tag->color_hex }}; border: 1px solid {{ $tag->color_hex }}40;">
                            {{ $tag->name }}
                        </span>
                        @empty
                        <span class="text-slate-400 text-xs italic">Fără etichete asociate.</span>
                        @endforelse
                    </div>
                </div>
            </div>
        </div>

    </div>

</div>
@endsection
