<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    use HasFactory;

    // Timestamps 'created_at' e 'updated_at' já são gerenciados pelo trigger do DB.
    // O Laravel os reconhecerá automaticamente.

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'company_id',
        'title',
        'description',
        'budget',
        'status',
    ];

    /**
     * Obtém a empresa que postou o projeto.
     */
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    /**
     * Obtém todas as propostas para este projeto.
     */
    public function proposals(): HasMany
    {
        return $this->hasMany(Proposal::class);
    }

    /**
     * Obtém todas as avaliações para este projeto.
     */
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }
}