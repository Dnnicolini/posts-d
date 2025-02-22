<?php

use Illuminate\Support\Facades\Route;

Route::redirect('/', '/posts/all-posts');

Route::get('/posts/{any}', function () {
    return view('app');
})->where('any', '.*');

Route::controller(App\Http\Controllers\AuthController::class)->group(function () {
    Route::post('/register', 'register')->name('register');
    Route::post('/login', 'login')->name('login');
    Route::post('/logout', 'logout')->middleware('auth')->name('logout');
    Route::get('/user', 'userInfo')->name('user-info');
});

Route::middleware(['auth'])->group(function () {

    Route::controller(App\Http\Controllers\PostController::class)->group(function () {
        Route::post('/create-post', 'createPost')->name('create-post');
        Route::delete('/delete-post/{id}', 'deletePost')->name('delete-post');
    });

    Route::controller(App\Http\Controllers\CommentController::class)->group(function () {
        Route::post('/create-comment', 'createComment')->name('create-comment');
        Route::get('/comment-posts/{uuid}', 'commentPosts')->name('comment-posts');
        Route::delete('/delete-comment/{uuid}', 'deleteComment')->name('delete-comment');
    });

});
Route::get('/all-posts', [App\Http\Controllers\PostController::class, 'allPosts'])->name('all-posts');

Route::get('/individual-post/{uuid}', [App\Http\Controllers\PostController::class, 'individualPost'])->name('individual-post');
