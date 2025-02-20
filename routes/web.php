<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});


Route::controller(App\Http\Controllers\AuthController::class)->group(function () {
    Route::get('/register', 'registerForm')->name('register');
    Route::post('/register', 'register');

    Route::get('/login', 'loginForm')->name('login');
    Route::post('/login', 'login');

    Route::post('/logout', 'logout')->name('logout')->middleware('auth');
});
