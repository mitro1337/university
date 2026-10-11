<?php

use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Verificare mod mentenanţă
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Înregistrare autoloader Composer
if (file_exists(__DIR__.'/../vendor/autoload.php')) {
    require __DIR__.'/../vendor/autoload.php';

    /** @var \Illuminate\Foundation\Application $app */
    $app = require_once __DIR__.'/../bootstrap/app.php';
    $app->handleRequest(Request::capture());
} else {
    // Pagină informativă elegantă în cazul în care dependencies nu sunt încă instalate
    http_response_code(200);
    ?>
    <!DOCTYPE html>
    <html lang="ro">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>LinearFlow - Project & Workflow Management (GBD)</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>body { font-family: 'Inter', sans-serif; background-color: #0c0e14; color: #e2e8f0; }</style>
    </head>
    <body class="min-h-screen flex items-center justify-center p-6">
        <div class="max-w-xl w-full bg-[#181b26] border border-[#232738] rounded-2xl p-8 shadow-2xl">
            <div class="flex items-center gap-3 mb-6">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                <div>
                    <h1 class="text-xl font-bold text-white">Linear<span class="text-indigo-400">Flow</span></h1>
                    <p class="text-xs text-slate-400">Platformă Web de Project & Workflow Management (Laravel 11 + MySQL)</p>
                </div>
            </div>

            <div class="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl mb-6 text-xs text-indigo-300">
                <p class="font-semibold mb-1">Gestiunea Bazelor de Date &bull; Proiect Semestrial</p>
                <p class="text-slate-400">Structura de cod Laravel, migrările, seederele, modelele relaționale Eloquent, controller-ele și vederile Blade cu Tailwind CSS sunt complet configurate.</p>
            </div>

            <h2 class="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">Pași rapizi de pornire în mediul local:</h2>
            <div class="bg-[#0c0e14] border border-[#232738] rounded-lg p-4 text-xs text-slate-300 space-y-2">
                <p><span class="text-slate-500"># 1. Install Composer & NPM dependencies</span><br><span class="text-emerald-400">composer install</span> && <span class="text-emerald-400">npm install</span></p>
                <p><span class="text-slate-500"># 2. Configure environment & app key</span><br><span class="text-emerald-400">cp .env.example .env</span> && <span class="text-emerald-400">php artisan key:generate</span></p>
                <p><span class="text-slate-500"># 3. Database migrations & seeds</span><br><span class="text-emerald-400">php artisan migrate --seed</span></p>
                <p><span class="text-slate-500"># 4. Start local development server</span><br><span class="text-emerald-400">php artisan serve</span></p>
            </div>

            <div class="mt-6 pt-5 border-t border-[#232738] flex items-center justify-between text-xs text-slate-400">
                <span>Stack: Laravel &bull; Blade &bull; Tailwind CSS &bull; MySQL</span>
                <span class="text-indigo-400 font-semibold">v1.0.0</span>
            </div>
        </div>
    </body>
    </html>
    <?php
}
