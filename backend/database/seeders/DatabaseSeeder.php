<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
     
    
    public function run(): void
    {
        // User::factory(10)->create();

       
          User::factory()->create([
             'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
    }
}
