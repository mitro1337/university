<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'LinearFlow') - Project & Workflow Management</title>
    
    <!-- Google Fonts: Inter -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        darkbg: {
                            base: '#0c0e14',
                            surface: '#12151e',
                            card: '#181b26',
                            border: '#232738',
                            hover: '#202433',
                            accent: '#5e6ad2'
                        }
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    
    <style>
        body {
            background-color: #0c0e14;
            color: #e2e8f0;
            font-family: 'Inter', sans-serif;
        }
        /* Custom scrollbars */
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        ::-webkit-scrollbar-track {
            background: #12151e;
        }
        ::-webkit-scrollbar-thumb {
            background: #2a2e42;
            border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #3c425e;
        }
    </style>
</head>
<body class="min-h-screen flex flex-col md:flex-row antialiased">

    <!-- SIDEBAR -->
    <aside class="w-full md:w-64 bg-darkbg-surface border-r border-darkbg-border flex flex-col shrink-0">
        <!-- Logo Brand -->
        <div class="h-16 flex items-center px-6 border-b border-darkbg-border gap-3">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            </div>
            <div>
                <span class="font-bold tracking-tight text-white text-base">Linear<span class="text-indigo-400">Flow</span></span>
                <span class="text-[11px] block text-slate-400 tracking-wide">{{ __('Workspace') }}</span>
            </div>
        </div>

        <!-- Navigation Links -->
        <nav class="p-4 space-y-1.5 flex-1">
            <div class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">{{ __('Platform') }}</div>
            
            <a href="{{ route('dashboard') }}" class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition {{ request()->routeIs('dashboard') ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30 font-semibold' : 'text-slate-400 hover:text-slate-200 hover:bg-darkbg-hover' }}">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                {{ __('Dashboard') }}
            </a>

            <a href="{{ route('projects.index') }}" class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition {{ request()->routeIs('projects.*') ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30 font-semibold' : 'text-slate-400 hover:text-slate-200 hover:bg-darkbg-hover' }}">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                {{ __('Projects & Board') }}
            </a>

            <a href="{{ route('tasks.index') }}" class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition {{ request()->routeIs('tasks.*') ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30 font-semibold' : 'text-slate-400 hover:text-slate-200 hover:bg-darkbg-hover' }}">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
                {{ __('All Issues') }}
            </a>

            <div class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 pt-4 mb-2">{{ __('Management') }}</div>

            <a href="{{ route('teams.index') }}" class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition {{ request()->routeIs('teams.*') ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30 font-semibold' : 'text-slate-400 hover:text-slate-200 hover:bg-darkbg-hover' }}">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
                {{ __('Team & Roles') }}
            </a>

            <a href="{{ route('reports.index') }}" class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition {{ request()->routeIs('reports.*') ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30 font-semibold' : 'text-slate-400 hover:text-slate-200 hover:bg-darkbg-hover' }}">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                {{ __('Analytics & Reports') }}
            </a>
        </nav>

        <!-- Action shortcut: Create Issue -->
        <div class="p-4 border-t border-darkbg-border">
            <a href="{{ route('tasks.create') }}" class="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-indigo-600/25 transition">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                {{ __('New Issue') }}
            </a>
        </div>

        <!-- User Profile Card -->
        <div class="p-4 border-t border-darkbg-border flex items-center justify-between">
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center text-xs font-bold">
                    {{ strtoupper(substr(auth()->user()->name ?? 'AM', 0, 2)) }}
                </div>
                <div class="text-xs">
                    <p class="font-medium text-slate-200 leading-tight">{{ auth()->user()->name ?? 'Alex Mercer' }}</p>
                    <p class="text-[11px] text-slate-400 leading-tight">{{ auth()->user()->title ?? 'Lead Architect' }}</p>
                </div>
            </div>
            @if(auth()->check())
            <form action="{{ route('logout') }}" method="POST">
                @csrf
                <button type="submit" class="text-slate-400 hover:text-rose-400 transition" title="{{ __('Log out') }}">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                </button>
            </form>
            @endif
        </div>
    </aside>

    <!-- MAIN WRAPPER -->
    <div class="flex-1 flex flex-col min-w-0">
        <!-- TOP HEADER BAR -->
        <header class="h-16 bg-darkbg-surface/80 backdrop-blur border-b border-darkbg-border px-6 flex items-center justify-between shrink-0">
            <div class="flex items-center gap-3">
                <h1 class="text-base font-semibold text-white tracking-tight">@yield('page_title', __('Dashboard'))</h1>
            </div>

            <div class="flex items-center gap-3">
                <!-- Language Switcher Pill -->
                <div class="flex items-center bg-darkbg-card border border-darkbg-border rounded-lg p-0.5 text-xs">
                    <a href="{{ route('locale.switch', 'en') }}" class="px-2.5 py-1 rounded-md font-semibold transition {{ app()->getLocale() === 'en' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white' }}">EN</a>
                    <a href="{{ route('locale.switch', 'ro') }}" class="px-2.5 py-1 rounded-md font-semibold transition {{ app()->getLocale() === 'ro' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white' }}">RO</a>
                </div>

                <a href="{{ route('tasks.create') }}" class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow transition flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                    {{ __('New Issue') }}
                </a>

                <a href="{{ route('projects.create') }}" class="px-3 py-1.5 bg-darkbg-card hover:bg-darkbg-hover text-slate-200 border border-darkbg-border rounded-lg text-xs font-medium transition flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                    {{ __('New Project') }}
                </a>
            </div>
        </header>

        <!-- FLASH NOTIFICATIONS -->
        @if(session('success'))
            <div class="mx-6 mt-4 p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded-lg text-xs flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    <span>{{ session('success') }}</span>
                </div>
                <button onclick="this.parentElement.remove()" class="text-emerald-400 hover:text-emerald-200">&times;</button>
            </div>
        @endif

        @if($errors->any())
            <div class="mx-6 mt-4 p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-lg text-xs">
                <div class="font-semibold mb-1">{{ __('An error occurred:') }}</div>
                <ul class="list-disc list-inside space-y-0.5">
                    @foreach($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <!-- MAIN BODY CONTENT -->
        <main class="flex-1 p-6 overflow-y-auto">
            @yield('content')
        </main>
    </div>

</body>
</html>
