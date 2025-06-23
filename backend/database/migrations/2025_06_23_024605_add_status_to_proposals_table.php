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
    Schema::table('proposals', function (Blueprint $table) {
        $table->string('status')->default('enviada')->after('mensagem_proposta'); // Opções: enviada, aceita, recusada
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('proposals', function (Blueprint $table) {
            //
        });
        
    }
    
};
