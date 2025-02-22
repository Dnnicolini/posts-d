<?php
namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CommentController extends Controller
{
    use AuthorizesRequests;

    public function createComment(Request $request)
    {
        try {
            $this->authorize('create', Comment::class);
            $post = Post::where('uuid', $request->post_uuid)->first();

            $comment = $post->comments()->create([
                'uuid'    => Str::uuid(),
                'comment' => $request->comment,
                'user_id' => auth()->user()->id,
            ]);

            return response()->json([
                'message' => 'Create comment successfully',
            ]);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 400);
        }
    }

    public function commentPosts($uuid)
    {
        $post     = Post::where('uuid', $uuid)->first();
        $comments = $posts->comments()->with('user')->get();
        return response()->json($comments, 200);
    }

    public function deleteComment($uuid)
    {
        try {
            $this->authorize('delete', Comment::class);
            $comment = Comment::where('uuid', $uuid)->first();
            $comment->delete();
            return response()->json(['message' => 'Comment deleted successfully'], 200);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 400);
        }

    }
}
