<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Resources\PostResource;

class PostController extends Controller
{
    public function allPosts() {
        $posts = PostResource::collection(Post::with('user')->orderBy('created_at', 'desc')->get());

        return response()->json($posts, 200);
    }
    public function createPost(Request $request) {

        if($request->post == null && !$request->hasFile('image')) {
            return response()->json(['error' => 'Post vazio'], 400);
        }
        $avatarPath = null;
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $uniqueName = 'posts_' . Str::uuid() . "." . $extension; 
            $file->storeAs('posts', $uniqueName, 'public'); 
            $avatarPath = 'storage/posts/' . $uniqueName; 
        }

        $post = Post::create([
            'user_id' => auth()->user()->id,
            'uuid' => Str::uuid(),
            'post' => $request->post,
            'image' => $avatarPath,
        ]);

        return response()->json(['message' => 'Post criado com sucesso'], 201);
    }

    public function deletePost($uuid) {
        $post = Post::where('uuid', $uuid)->first();
        $post->delete();
        return response()->json(['message' => 'Post deletado com sucesso'], 200);
    }

    public function individualPost($uuid) {
        $post = new PostResource(Post::where('uuid', $uuid)->with('user')->first());
        return response()->json($post, 200);
    }
    
   }
