@extends('layouts.app')

@section('title', 'Proiect Nou')
@section('page_title', 'Creare Proiect Nou')

@section('content')
<div class="max-w-2xl mx-auto">
    <div class="bg-darkbg-card border border-darkbg-border rounded-xl p-6">
        <form action="{{ route('projects.store') }}" method="POST" class="space-y-4">
            @csrf

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">Cheie Proiect (Key)*</label>
                    <input type="text" name="project_key" value="{{ old('project_key') }}" maxlength="10" placeholder="ex: GBD" required
                           class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs font-mono uppercase text-white focus:outline-none focus:border-indigo-500">
                    <span class="text-[10px] text-slate-400">Prefixul taskurilor (ex: GBD-1)</span>
                </div>

                <div class="sm:col-span-2">
                    <label class="block text-xs font-semibold text-slate-300 mb-1">Nume Proiect*</label>
                    <input type="text" name="name" value="{{ old('name') }}" placeholder="ex: Platforma Gestiunea Bazelor de Date" required
                           class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                </div>
            </div>

            <div>
                <label class="block text-xs font-semibold text-slate-300 mb-1">Descriere Obiective</label>
                <textarea name="description" rows="3" placeholder="Descrie scopul şi cerinţele proiectului..."
                          class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">{{ old('description') }}</textarea>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">Responsabil (Owner)*</label>
                    <select name="owner_id" required class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                        @foreach($users as $user)
                            <option value="{{ $user->id }}" {{ old('owner_id') == $user->id ? 'selected' : '' }}>{{ $user->name }}</option>
                        @endforeach
                    </select>
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">Stare Iniţială*</label>
                    <select name="status" required class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                        <option value="active" selected>Activ</option>
                        <option value="planning">Planificare</option>
                        <option value="paused">În pauză</option>
                        <option value="completed">Finalizat</option>
                    </select>
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">Prioritate*</label>
                    <select name="priority" required class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                        <option value="low">Low</option>
                        <option value="medium" selected>Medium</option>
                        <option value="high">High</option>
                        <option value="critical">Critical</option>
                    </select>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">Data Început</label>
                    <input type="date" name="start_date" value="{{ old('start_date', date('Y-m-d')) }}"
                           class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">Termen Limită</label>
                    <input type="date" name="due_date" value="{{ old('due_date') }}"
                           class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500">
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">Buget Alocat (RON)</label>
                    <input type="number" step="0.01" name="budget" value="{{ old('budget', '0.00') }}"
                           class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-indigo-500">
                </div>
            </div>

            <div>
                <label class="block text-xs font-semibold text-slate-300 mb-1">Membri Echipă</label>
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
                <a href="{{ route('projects.index') }}" class="px-4 py-2 bg-darkbg-surface text-slate-300 hover:text-white rounded-lg text-xs font-medium transition">Anulează</a>
                <button type="submit" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-indigo-600/25 transition">
                    Creează Proiectul
                </button>
            </div>
        </form>
    </div>
</div>
@endsection
