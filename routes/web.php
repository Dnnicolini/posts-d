<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
})->name('home');

Route::get('/view/{any}', function () {
    return view('welcome');  
})->where('any', '.*');

Route::controller(App\Http\Controllers\AuthController::class)->group(function () {
    Route::post('/register', 'register')->name('register');
    Route::post('/login', 'login')->name('login');
    Route::post('/logout', 'logout')->middleware('auth')->name('logout');
    Route::get('/user', 'userInfo')->name('user-info');
});

Route::middleware(['auth'])->controller(App\Http\Controllers\PostController::class)->group(function () {
    
    Route::get('/all-posts', 'allPosts')->name('all-posts');
    Route::post('/create-post', 'createPost')->name('create-post');
    Route::delete('/delete-post/{id}', 'deletePost')->name('delete-post');

});

    Route::get('/individual-post/{uuid}', [App\Http\Controllers\PostController::class, 'individualPost'])->name('individual-post');

