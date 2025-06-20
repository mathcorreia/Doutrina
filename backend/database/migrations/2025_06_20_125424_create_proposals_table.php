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
        Schema::create('proposals', function (Blueprint $table) {
            $table->id();

            // Chave estrangeira para a tabela 'projects'
            $table->foreignId('project_id')->constrained()->onDelete('cascade');

            // Chave estrangeira para a tabela 'freelancers'
            $table->foreignId('freelancer_id')->constrained()->onDelete('cascade');

            // Coluna para o valor da proposta
            $table->decimal('valor', 10, 2);

            // Coluna para a mensagem da proposta
            $table->text('mensagem_proposta');

            // Colunas de data e hora padrão do Laravel
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proposals');
    }
};