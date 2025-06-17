<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('freelancers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Chave estrangeira para users
            $table->string('cpf')->unique();
            $table->date('data_nascimento')->nullable();
            // Adicione outros campos de freelancer aqui se desejar (ex: bio, skills)
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('freelancers');
    }
};