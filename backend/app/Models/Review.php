<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Review extends Model
{
    use HasFactory;

    /**
     * As avaliações só são criadas, não atualizadas,
     * então definimos 'updated_at' como nulo.
     */
    const UPDATED_AT = null;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'project_id',
        'freelancer_id',
        'company_id',
        'rating',
        'comment',
    ];

    /**
     * Obtém o projeto que foi avaliado.
     */
    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    /**
     * Obtém o freelancer que foi avaliado.
     */
    public function freelancer(): BelongsTo
    {
        return $this->belongsTo(Freelancer::class);
    }

    /**
     * Obtém a empresa que fez a avaliação.
     */
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }
}