<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class UserRolesTableSeeder extends Seeder {
    public function run() {
        $users = DB::table('users')->get();
        $admin = $users->where('email', 'admin@admin.com')->first();
        $otherUsers = $users->where('email', '!=', 'admin@admin.com')->all();
        $adminRole = DB::table('roles')->where('name', 'admin')->first();
        $userRole = DB::table('roles')->where('name', 'user')->first();

        foreach ($otherUsers as $user) {
            DB::table('user_roles')->insert([
                'user_id' => $user->id,
                'role_id' => $userRole->id,
                'created_at' => Carbon::now(),
            ]);
        }
        if ($admin && $adminRole) {
            DB::table('user_roles')->insert([
                'user_id' => $admin->id,
                'role_id' => $adminRole->id,
                'created_at' => Carbon::now(),
            ]);
        }
     
    }
}
