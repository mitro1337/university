<!DOCTYPE html>
<html lang="ro" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Autentificare - Project & Workflow Management</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
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
    </style>
</head>
<body class="min-h-screen flex items-center justify-center p-4">

    <div class="w-full max-w-md">
        <!-- Logo & Brand Header -->
        <div class="text-center mb-8">
            <div class="inline-flex w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 items-center justify-center shadow-lg shadow-indigo-500/20 mb-3">
                <svg class="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            </div>
            <h1 class="text-2xl font-bold tracking-tight text-white">Project &amp; Workflow Management</h1>
            <p class="text-xs text-slate-400 mt-1">Platformă Avansată de Project & Workflow Management</p>
        </div>

        <!-- Login Card -->
        <div class="bg-darkbg-card border border-darkbg-border rounded-2xl p-7 shadow-2xl shadow-black/50">
            <h2 class="text-base font-semibold text-white mb-1">Conectare în cont</h2>
            <p class="text-xs text-slate-400 mb-6">Introdu credențialele pentru a accesa workspace-ul</p>

            @if(session('success'))
                <div class="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded-lg text-xs">
                    {{ session('success') }}
                </div>
            @endif

            @if($errors->any())
                <div class="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-lg text-xs">
                    {{ $errors->first() }}
                </div>
            @endif

            <form action="{{ route('login') }}" method="POST" class="space-y-4">
                @csrf

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1.5">Email</label>
                    <input type="email" name="email" value="{{ old('email', 'admin@workflow.local') }}" required autofocus
                           class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                </div>

                <div>
                    <div class="flex items-center justify-between mb-1.5">
                        <label class="text-xs font-semibold text-slate-300">Parolă</label>
                        <span class="text-[11px] text-slate-500">Implicit: password</span>
                    </div>
                    <input type="password" name="password" value="password" required
                           class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                </div>

                <div class="flex items-center justify-between pt-1">
                    <label class="flex items-center gap-2 cursor-pointer text-xs text-slate-400">
                        <input type="checkbox" name="remember" class="rounded bg-darkbg-surface border-darkbg-border text-indigo-600 focus:ring-0">
                        Ține-mă minte
                    </label>
                </div>

                <div class="pt-2">
                    <button type="submit" class="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-lg shadow-indigo-600/30 transition">
                        Autentificare
                    </button>
                </div>
            </form>

            <div class="mt-6 pt-5 border-t border-darkbg-border text-center">
                <p class="text-xs text-slate-400">
                    Nu ai cont?
                    <a href="{{ route('register') }}" class="text-indigo-400 hover:text-indigo-300 font-medium">Înregistrează-te</a>
                </p>
                <div class="mt-4 p-3 bg-darkbg-surface/60 border border-darkbg-border rounded-lg text-[11px] text-left text-slate-400">
                    <div class="font-semibold text-slate-300 mb-1">Conturi demo preconfigurate:</div>
                    <div class=" text-[10px] space-y-0.5">
                        <div>Admin: <span class="text-indigo-300">admin@workflow.local</span> / <span class="text-slate-300">password</span></div>
                        <div>PM: <span class="text-indigo-300">alex@workflow.local</span> / <span class="text-slate-300">password</span></div>
                        <div>Dev: <span class="text-indigo-300">maria@workflow.local</span> / <span class="text-slate-300">password</span></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="text-center mt-6 text-[11px] text-slate-500 ">
            Proiect Gestiunea Bazelor de Date &bull; Laravel &amp; MySQL
        </div>
    </div>

</body>
</html>
