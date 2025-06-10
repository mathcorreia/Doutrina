<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProjectController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Agrupa todas as rotas de projetos para melhor organização
Route::prefix('projects')->group(function () {
    // Rota para listar todos os projetos abertos
    // GET /api/projects
    Route::get('/', [ProjectController::class, 'index']);

    // Rota para criar um novo projeto
    // POST /api/projects
    Route::post('/', [ProjectController::class, 'store']);

    // Rota para ver os detalhes de um projeto específico
    // GET /api/projects/{id}
    Route::get('/{id}', [ProjectController::class, 'show']);
});