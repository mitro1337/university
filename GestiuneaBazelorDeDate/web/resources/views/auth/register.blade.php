<!DOCTYPE html>
<html lang="ro" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Înregistrare Cont - LinearFlow</title>
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
            <h1 class="text-2xl font-bold tracking-tight text-white">Linear<span class="text-indigo-400">Flow</span></h1>
            <p class="text-xs text-slate-400 mt-1">Înregistrare Utilizator Nou în Echipă</p>
        </div>

        <!-- Register Card -->
        <div class="bg-darkbg-card border border-darkbg-border rounded-2xl p-7 shadow-2xl shadow-black/50">
            <h2 class="text-base font-semibold text-white mb-1">Creează un cont nou</h2>
            <p class="text-xs text-slate-400 mb-6">Completează datele pentru a începe colaborarea</p>

            @if($errors->any())
                <div class="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-lg text-xs">
                    <ul class="list-disc list-inside space-y-0.5">
                        @foreach($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            <form action="{{ route('register') }}" method="POST" class="space-y-4">
                @csrf

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1.5">Nume Complet*</label>
                    <input type="text" name="name" value="{{ old('name') }}" required autofocus placeholder="ex: Diana Marinescu"
                           class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1.5">Email Corporativ*</label>
                    <input type="email" name="email" value="{{ old('email') }}" required placeholder="ex: diana@linearflow.ro"
                           class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1.5">Titlu / Funcţie Tehnică</label>
                    <input type="text" name="title" value="{{ old('title') }}" placeholder="ex: Frontend Developer / QA Specialist"
                           class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                </div>

                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="block text-xs font-semibold text-slate-300 mb-1.5">Parolă*</label>
                        <input type="password" name="password" required placeholder="Minim 6 caractere"
                               class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-slate-300 mb-1.5">Confirmă Parola*</label>
                        <input type="password" name="password_confirmation" required placeholder="Reintrodu parola"
                               class="w-full bg-darkbg-surface border border-darkbg-border rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                    </div>
                </div>

                <div class="pt-2">
                    <button type="submit" class="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-lg shadow-indigo-600/30 transition">
                        Înregistrează-te
                    </button>
                </div>
            </form>

            <div class="mt-6 pt-5 border-t border-darkbg-border text-center">
                <p class="text-xs text-slate-400">
                    Ai deja un cont activ?
                    <a href="{{ route('login') }}" class="text-indigo-400 hover:text-indigo-300 font-medium">Conectează-te aici</a>
                </p>
            </div>
        </div>

        <div class="text-center mt-6 text-[11px] text-slate-500 ">
            Proiect Gestiunea Bazelor de Date &bull; Laravel &amp; MySQL
        </div>
    </div>

</body>
</html>
