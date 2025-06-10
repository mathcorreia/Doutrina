<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Freelancer extends Model
{
    use HasFactory;

    /**
     * Desativa os timestamps padrão (created_at, updated_at) do Eloquent,
     * pois sua tabela não os possui.
     */
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'cpf',
        'data_nascimento',
    ];

    /**
     * Obtém o usuário (User) ao qual o freelancer pertence.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Obtém as propostas feitas pelo freelancer.
     */
    public function proposals(): HasMany
    {
        return $this->hasMany(Proposal::class);
    }

    /**
     * Obtém as avaliações recebidas pelo freelancer.
     */
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }
}