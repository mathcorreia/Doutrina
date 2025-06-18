<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Este é o único lugar onde Schema::create('freelancers') deve existir
        Schema::create('freelancers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('cpf')->unique();
            $table->date('data_nascimento')->nullable();
            $table->string('telefone', 20)->nullable();
            $table->text('skills')->nullable();
            // Sua tabela não usa timestamps (created_at/updated_at), então eles não são adicionados.
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('freelancers');
    }
};