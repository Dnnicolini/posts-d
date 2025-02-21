<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request) {

        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed',
            'username' => 'required|string|unique:users',
            'avatar' => 'image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $avatarPath = null;
        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');
            $extension = $file->getClientOriginalExtension();
            $uniqueName = 'avatar_' . Str::uuid() . "." . $extension; 
            $file->storeAs('avatars', $uniqueName, 'public'); 
            $avatarPath = 'storage/avatars/' . $uniqueName; 
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'username' => $request->username,
            'avatar' => $avatarPath,
        ]);

        Auth::login($user);

        return redirect()->route('dashboard');

    }


    public function login(Request $request) {

        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return redirect()->route('home');
        }

        return response()->json(['error' => 'Credenciais inválidas'], 401);

    }

    public function logout(Request $request) {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('home');
    }

    public function userInfo() {
        if(!Auth::check()) {
            return response()->json(['error' => 'Usuário não autenticado'], 401);
        }
        $user = Auth::user();
        return response()->json($user);
    }
}
