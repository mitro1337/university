<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class TeamController extends Controller
{
    public function index()
    {
        $users = User::with(['role', 'assignedTasks.status', 'projects'])
            ->withCount(['assignedTasks', 'projects'])
            ->orderBy('name')
            ->get();

        $roles = Role::all();

        // Statistici SQL pe roluri
        $rolesDistribution = DB::table('roles')
            ->leftJoin('users', 'roles.id', '=', 'users.role_id')
            ->select('roles.name', DB::raw('COUNT(users.id) as user_count'))
            ->groupBy('roles.id', 'roles.name')
            ->get();

        return view('teams.index', compact('users', 'roles', 'rolesDistribution'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:150|unique:users,email',
            'role_id' => 'required|exists:roles,id',
            'title' => 'required|string|max:100',
            'password' => 'required|string|min:6',
        ]);

        $validated['password'] = Hash::make($validated['password']);
        $validated['status'] = 'active';

        User::create($validated);

        return redirect()->route('teams.index')->with('success', 'Noul membru al echipei a fost înregistrat!');
    }

    public function updateRole(Request $request, User $user)
    {
        $request->validate([
            'role_id' => 'required|exists:roles,id',
        ]);

        $user->update(['role_id' => $request->role_id]);

        return redirect()->route('teams.index')->with('success', "Rolul utilizatorului {$user->name} a fost actualizat!");
    }
}
