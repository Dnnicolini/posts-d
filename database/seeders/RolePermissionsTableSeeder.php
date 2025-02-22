<?php

// database/seeders/RolePermissionsTableSeeder.php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class RolePermissionsTableSeeder extends Seeder {
    public function run() {
        $roles = DB::table('roles')->pluck('id', 'name');
        $permissions = DB::table('permissions')->pluck('id', 'name');

        DB::table('role_permissions')->insert([
            // Admin
            ['role_id' => $roles['admin'], 'permission_id' => $permissions['create-posts'], 'created_at' => Carbon::now()],
            ['role_id' => $roles['admin'], 'permission_id' => $permissions['edit-posts'], 'created_at' => Carbon::now()],
            ['role_id' => $roles['admin'], 'permission_id' => $permissions['delete-posts'], 'created_at' => Carbon::now()],
            ['role_id' => $roles['admin'], 'permission_id' => $permissions['create-comments'], 'created_at' => Carbon::now()],
            ['role_id' => $roles['admin'], 'permission_id' => $permissions['edit-comments'], 'created_at' => Carbon::now()],
            ['role_id' => $roles['admin'], 'permission_id' => $permissions['delete-comments'], 'created_at' => Carbon::now()],
            
            // Regular
            ['role_id' => $roles['user'], 'permission_id' => $permissions['create-posts'], 'created_at' => Carbon::now()],
            ['role_id' => $roles['user'], 'permission_id' => $permissions['create-comments'], 'created_at' => Carbon::now()],
            ['role_id' => $roles['user'], 'permission_id' => $permissions['edit-comments'], 'created_at' => Carbon::now()],
            ['role_id' => $roles['user'], 'permission_id' => $permissions['delete-comments'], 'created_at' => Carbon::now()],
            ['role_id' => $roles['user'], 'permission_id' => $permissions['delete-posts'], 'created_at' => Carbon::now()],
            ['role_id' => $roles['user'], 'permission_id' => $permissions['edit-posts'], 'created_at' => Carbon::now()],
        ]);
    }
}
