<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class StaffController extends Controller
{
    public function index()
    {
        $staff = User::latest()->paginate(10);
        return Inertia::render('Staff/Index', [
            'staff' => $staff
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|string|in:admin,staff',
            'status' => 'required|string|in:active,inactive',
        ]);

        $validated['password'] = Hash::make($validated['password']);
        User::create($validated);

        return redirect()->back()->with('success', 'Staff member created successfully.');
    }

    public function update(Request $request, User $staff)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,username,'.$staff->id,
            'email' => 'required|string|email|max:255|unique:users,email,'.$staff->id,
            'role' => 'required|string|in:admin,staff',
            'status' => 'required|string|in:active,inactive',
        ]);

        if ($request->filled('password')) {
            $request->validate(['password' => 'string|min:8']);
            $validated['password'] = Hash::make($request->password);
        }

        $staff->update($validated);
        return redirect()->back()->with('success', 'Staff member updated successfully.');
    }

    public function destroy(User $staff)
    {
        if ($staff->id === auth()->id()) {
            return redirect()->back()->with('error', 'You cannot delete yourself.');
        }
        
        $staff->delete();
        return redirect()->back()->with('success', 'Staff member deleted successfully.');
    }
}
