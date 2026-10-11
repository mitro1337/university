<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\AuthController;

// Ruta radacina
Route::get('/', function () {
    return redirect()->route('dashboard');
});

// Autentificare
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Dashboard Principal
Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

// Gestiune Proiecte
Route::resource('projects', ProjectController::class);

// Gestiune Taskuri
Route::resource('tasks', TaskController::class);
Route::patch('/tasks/{task}/status', [TaskController::class, 'updateStatus'])->name('tasks.updateStatus');

// Comentarii
Route::post('/tasks/{task}/comments', [CommentController::class, 'store'])->name('comments.store');
Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');

// Echipe şi Roluri
Route::get('/teams', [TeamController::class, 'index'])->name('teams.index');
Route::post('/teams', [TeamController::class, 'store'])->name('teams.store');
Route::patch('/teams/{user}/role', [TeamController::class, 'updateRole'])->name('teams.updateRole');

// Rapoarte şi Statistici SQL
Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');
