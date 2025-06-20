<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;
use App\Models\User;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Define a permissão 'isCompany'. Retorna true se o tipo do usuário for 'company'.
        Gate::define('isCompany', function (User $user) {
            return $user->user_type === 'company';
        });

        // Define a permissão 'isFreelancer'
        Gate::define('isFreelancer', function (User $user) {
            return $user->user_type === 'freelancer';
        });
    }

    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }
}