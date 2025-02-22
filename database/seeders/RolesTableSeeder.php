<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class RolesTableSeeder extends Seeder {
    public function run() {
        DB::table('roles')->insert([
            ['name' => 'admin', 'description' => 'System administrator', 'created_at' => Carbon::now()],
            ['name' => 'user', 'description' => 'Standard user', 'created_at' => Carbon::now()],
        ]);
    }
}

