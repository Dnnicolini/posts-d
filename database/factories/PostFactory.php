<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class PostFactory extends Factory
{
    protected $model = Post::class;

    public function definition(): array
    {
        $images = [
            '/images/posts/comida.jpeg',
            '/images/posts/flores.jpeg',
            '/images/posts/paisagem.jpeg',
            null 
        ];

        return [
            'uuid' => Str::uuid(),
            'user_id' => User::inRandomOrder()->first()->id ?? User::factory(),
            'post' => $this->faker->sentence(3),
            'image' => $this->faker->randomElement($images),
            'created_at' => now(),
        ];
    }
}

