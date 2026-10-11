@extends('layouts.app')

@section('title', 'Proiecte')
@section('page_title', 'Portofoliu Proiecte')

@section('content')
<div class="space-y-6 max-w-7xl mx-auto">

    <!-- BARĂ FILTRE ŞI ACŢIUNI -->
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4 bg-darkbg-card border border-darkbg-border p-4 rounded-xl">
        <form action="{{ route('projects.index') }}" method="GET" class="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <div class="relative w-full sm:w-64">
                <input type="text" name="search" value="{{ request('search') }}" placeholder="Caută proiect sau cheie..." 
                       class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500">
                <svg class="w-4 h-4 text-slate-400 absolute left-2.5 top-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
            </div>

            <select name="status" onchange="this.form.submit()" class="bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500">
                <option value="">Toate Stările</option>
                <option value="active" {{ request('status') == 'active' ? 'selected' : '' }}>Active</option>
                <option value="planning" {{ request('status') == 'planning' ? 'selected' : '' }}>Planificare</option>
                <option value="paused" {{ request('status') == 'paused' ? 'selected' : '' }}>În pauză</option>
                <option value="completed" {{ request('status') == 'completed' ? 'selected' : '' }}>Finalizate</option>
            </select>

            @if(request('search') || request('status'))
                <a href="{{ route('projects.index') }}" class="text-xs text-slate-400 hover:text-rose-400 transition">Resetează</a>
            @endif
        </form>

        <a href="{{ route('projects.create') }}" class="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-indigo-600/20 transition flex items-center justify-center gap-1.5">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            Proiect Nou
        </a>
    </div>

    <!-- GRID PROIECTE -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @forelse($projects as $project)
        <div class="bg-darkbg-card border border-darkbg-border rounded-xl p-5 flex flex-col justify-between hover:border-darkbg-hover hover:shadow-lg hover:shadow-black/40 transition">
            <div>
                <!-- Top Card Header -->
                <div class="flex items-center justify-between mb-3">
                    <span class="px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-md text-xs  font-bold">
                        {{ $project->project_key }}
                    </span>

                    <div class="flex items-center gap-2">
                        @if($project->status === 'active')
                            <span class="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[11px] font-medium">Activ</span>
                        @elseif($project->status === 'planning')
                            <span class="px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded text-[11px] font-medium">Planificare</span>
                        @elseif($project->status === 'paused')
                            <span class="px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded text-[11px] font-medium">În Pauză</span>
                        @else
                            <span class="px-2 py-0.5 bg-slate-500/10 text-slate-400 border border-slate-500/20 rounded text-[11px] font-medium">Finalizat</span>
                        @endif

                        <span class="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[11px] capitalize">
                            {{ $project->priority }}
                        </span>
                    </div>
                </div>

                <!-- Titlu Proiect & Descriere -->
                <h3 class="text-base font-semibold text-white mb-1.5 hover:text-indigo-400 transition">
                    <a href="{{ route('projects.show', $project) }}">{{ $project->name }}</a>
                </h3>
                <p class="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                    {{ $project->description ?? 'Fără descriere disponibilă.' }}
                </p>

                <!-- Progres Bar -->
                <div class="mb-4">
                    <div class="flex items-center justify-between text-xs mb-1.5">
                        <span class="text-slate-400 font-medium">Progres general</span>
                        <span class="text-emerald-400  font-bold">{{ $project->progress_percentage }}%</span>
                    </div>
                    <div class="w-full h-2 bg-darkbg-surface rounded-full overflow-hidden">
                        <div class="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full" style="width: {{ $project->progress_percentage }}%"></div>
                    </div>
                </div>
            </div>

            <!-- Card Subsol: Metrici, Membri şi Link -->
            <div class="pt-4 border-t border-darkbg-border/60 flex items-center justify-between text-xs text-slate-400">
                <div class="flex items-center gap-2">
                    <div class="flex -space-x-1.5 overflow-hidden">
                        @foreach($project->members->take(3) as $m)
                            <div class="w-6 h-6 rounded-full bg-slate-700 border-2 border-darkbg-card flex items-center justify-center text-[10px] text-white font-bold" title="{{ $m->name }}">
                                {{ strtoupper(substr($m->name, 0, 1)) }}
                            </div>
                        @endforeach
                    </div>
                    <span>{{ $project->tasks_count }} taskuri</span>
                </div>

                <div class="flex items-center gap-3">
                    <a href="{{ route('projects.edit', $project) }}" class="text-slate-400 hover:text-slate-200">Edit</a>
                    <a href="{{ route('projects.show', $project) }}" class="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1">
                        Deschide &rarr;
                    </a>
                </div>
            </div>
        </div>
        @empty
        <div class="col-span-full py-12 text-center bg-darkbg-card border border-darkbg-border rounded-xl">
            <svg class="w-12 h-12 text-slate-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
            <p class="text-sm font-medium text-slate-300">Nu a fost găsit niciun proiect.</p>
            <p class="text-xs text-slate-400 mt-1">Creează un nou proiect pentru a începe organizarea taskurilor.</p>
            <a href="{{ route('projects.create') }}" class="inline-flex mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold">
                Creează Proiect
            </a>
        </div>
        @endforelse
    </div>

    <!-- Paginare -->
    <div class="pt-4">
        {{ $projects->links() }}
    </div>

</div>
@endsection
