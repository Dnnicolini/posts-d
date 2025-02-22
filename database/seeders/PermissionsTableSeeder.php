<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PermissionsTableSeeder extends Seeder {
    public function run() {
        DB::table('permissions')->insert([
            ['name' => 'create-posts', 'description' => 'Create posts', 'created_at' => Carbon::now()],
            ['name' => 'edit-posts', 'description' => 'Edit posts', 'created_at' => Carbon::now()],
            ['name' => 'delete-posts', 'description' => 'Delete posts', 'created_at' => Carbon::now()],
            ['name' => 'create-comments', 'description' => 'Create comments', 'created_at' => Carbon::now()],
            ['name' => 'edit-comments', 'description' => 'Edit comments', 'created_at' => Carbon::now()],
            ['name' => 'delete-comments', 'description' => 'Delete comments', 'created_at' => Carbon::now()],
        ]);
    }
}

