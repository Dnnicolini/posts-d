<?php
namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PostController extends Controller
{
    use AuthorizesRequests;
    public function allPosts()
    {

        $posts = PostResource::collection(Post::with('user', 'comments')->orderBy('created_at', 'desc')->get());

        return response()->json($posts, 200);
    }
    public function createPost(Request $request)
    {

        try {
            $this->authorize('create', Post::class);

            if ($request->post == null && ! $request->hasFile('image')) {
                return response()->json(['error' => 'Post vazio'], 400);
            }
            $imagePath = null;
            if ($request->hasFile('image')) {
                $file       = $request->file('image');
                $extension  = $file->getClientOriginalExtension();
                $uniqueName = 'posts_' . Str::uuid() . "." . $extension;
                $file->storeAs('posts', $uniqueName, 'public');
                $imagePath = '/storage/posts/' . $uniqueName;
            }

            $post = Post::create([
                'user_id' => auth()->user()->id,
                'uuid'    => Str::uuid(),
                'post'    => $request->post,
                'image'   => $imagePath,
            ]);

            return response()->json(['message' => 'Post criado com sucesso'], 201);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 400);
        }

    }
    public function getPost($uuid){
        try{
            $post = Post::where('uuid', $uuid)->first();
            return response()->json($post, 200);
        }catch(\Throwable $th){
            return response()->json(['error' => $th->getMessage()], 400);
        }
    }
    public function updatePost(Request $request, $uuid)
    {

        try {


            $post = Post::where('uuid', $uuid)->first();

            $this->authorize('update', $post);


            if ($request->post == null && ! $request->hasFile('image')) {
                return response()->json(['error' => 'Post vazio'], 400);
            }

            if ($request->hasFile('image')) {
                $file       = $request->file('image');
                $extension  = $file->getClientOriginalExtension();
                $uniqueName = 'posts_' . Str::uuid() . "." . $extension;
                $file->storeAs('posts', $uniqueName, 'public');
                $imagePath   = '/storage/posts/' . $uniqueName;
                $post->image = $imagePath;
            }
            $post->post = $request->post;
            $post->save();
            return response()->json(['message' => 'Post atualizado com sucesso'], 200);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 400);
        }
    }

    public function deletePost($uuid)
    {
        try {
            $post = Post::where('uuid', $uuid)->first();
            $this->authorize('delete', $post);
            $post->delete();
            return response()->json(['message' => 'Post deletado com sucesso'], 200);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 400);
        }
    }

    public function individualPost($uuid)
    {
        $post = new PostResource(Post::where('uuid', $uuid)->with('user', 'comments')->first());
        return response()->json($post, 200);
    }

}
