<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserPostCommentSeeder extends Seeder
{
    public function run()
    {

        $users = User::all();

        foreach ($users as $user) {


            if (rand(0, 1)) {
                $posts = Post::factory(rand(1, 3))->create([
                    'user_id' => $user->id,
                ]);

                foreach ($posts as $post) {
                    Comment::factory(rand(3, 7))->create([
                        'post_id' => $post->id,
                    ]);
                }
            }
        }
    }
}
