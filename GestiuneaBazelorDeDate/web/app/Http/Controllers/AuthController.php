<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function showLogin()
    {
        return view('auth.login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials, $request->filled('remember'))) {
            $request->session()->regenerate();
            return redirect()->intended(route('dashboard'))->with('success', 'Bine ai venit în platforma LinearFlow!');
        }

        return back()->withErrors([
            'email' => 'Datele de autentificare nu corespund.',
        ])->onlyInput('email');
    }

    public function showRegister()
    {
        return view('auth.register');
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:150|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
            'title' => 'nullable|string|max:100',
        ]);

        // Rolul implicit este Developer (ID: 3)
        $defaultRole = Role::where('slug', 'dev')->first() ?? Role::first();

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role_id' => $defaultRole->id ?? 3,
            'title' => $validated['title'] ?? 'Software Developer',
            'status' => 'active',
        ]);

        Auth::login($user);

        return redirect()->route('dashboard')->with('success', 'Contul tău a fost creat cu succes!');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login')->with('success', 'Te-ai deconectat cu succes.');
    }
}
