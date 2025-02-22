<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;

class UsersTableSeeder extends Seeder {
    public function run() {
        DB::table('users')->insert([
            [
                'uuid' => Str::uuid(),
                'name' => 'Administrator',
                'username' => 'admin',
                'email' => 'admin@admin.com',
                'password' => Hash::make('password'),
                'avatar' => asset('images/avatar.png'),
                'created_at' => Carbon::now(),
            ],
            [
                'uuid' => Str::uuid(),
                'name' => 'john Doe',
                'username' => 'Johndoe',
                'email' => 'user@user.com',
                'password' => Hash::make('password'),
                'avatar' => asset('images/avatar.png'),
                'created_at' => Carbon::now(),
            ],
            [
                'uuid' => Str::uuid(),
                'name' => 'Daniele Nicolini',
                'username' => 'Dnnicolini',
                'email' => 'danienicolini@gmail.com',
                'password' => Hash::make('password'),
                'avatar' => asset('images/avatar.png'),
                'created_at' => Carbon::now(),
            ],

        ]);


    }
}
