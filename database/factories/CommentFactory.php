<?php

namespace Database\Factories;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CommentFactory extends Factory
{
    protected $model = Comment::class;

    public function definition(): array
    {
        return [
            'uuid' => Str::uuid(),
            'post_id' => Post::inRandomOrder()->first()->id ?? Post::factory(),
            'user_id' => User::inRandomOrder()->first()->id ?? User::factory(),
            'comment' => $this->faker->paragraph(1),
            'created_at' => now(),
        ];
    }
}

