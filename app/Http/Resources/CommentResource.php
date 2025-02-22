<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
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
            'comment' => $this->comment,
            'user' => [
                'name' => $this->user->name,
                'avatar' => $this->user->avatar,
                'username' => $this->user->username
            ],
           
        ];
    }
}
