<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'uuid' => $this->uuid,
            'post' => $this->post,
            'image' => $this->image,
            'link' => '/view/post/' .  $this->uuid,
            'user' => [
                'name' => $this->user->name,
                'avatar' => $this->user->avatar,
                'username' => $this->user->username,
            ],
        ];
    }
}
