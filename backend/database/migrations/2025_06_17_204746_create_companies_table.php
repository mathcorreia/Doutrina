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
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('company_name'); // Nome Fantasia
            $table->string('razao_social');  // Razão Social
            $table->string('cnpj')->unique();
            $table->date('data_fundacao')->nullable();
            $table->string('telefone', 20)->nullable();
            $table->text('informacoes_empresa')->nullable();
            // A sua tabela não usa timestamps (created_at/updated_at), então eles não são adicionados.
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};