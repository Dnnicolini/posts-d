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

    public function getComment($uuid)
    {
        try{
            $comment = Comment::where('uuid', $uuid)->first();
            return response()->json($comment, 200);
        }catch(\Throwable $th){
            return response()->json(['error' => $th->getMessage()], 400);
        }
    }
    public function updateComment(Request $request, $uuid)
{
    try {
        $comment = Comment::where('uuid', $uuid)->first();

        if (!$comment) {
            return response()->json(['error' => 'Comment not found'], 404);
        }

        $this->authorize('update', $comment);

        $comment->comment = $request->comment;
        $comment->save();

        return response()->json(['message' => 'Comment updated successfully'], 200);
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
            $comment = Comment::where('uuid', $uuid)->first();

            $this->authorize('delete', $comment);
            
            $comment->delete();
            return response()->json(['message' => 'Comment deleted successfully'], 200);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 400);
        }

    }
}
