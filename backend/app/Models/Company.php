<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Company extends Model
{
    use HasFactory;

    /**
     * Desativa os timestamps padrão (created_at, updated_at) do Eloquent.
     */
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'cnpj',
        'data_fundacao',
        'telefone',
        'informacoes_empresa',
    ];

    /**
     * Obtém o usuário (User) ao qual a empresa pertence.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Obtém os projetos postados pela empresa.
     */
    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }

    /**
     * Obtém as avaliações feitas pela empresa.
     */
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }
}