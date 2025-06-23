<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\ProposalController;
use App\Http\Controllers\Api\ProfileController;

/*
|--------------------------------------------------------------------------
| Rotas da API
|--------------------------------------------------------------------------
|
| Aqui é onde você pode registrar as rotas da API para sua aplicação.
|
*/

// --- Rotas Públicas (não precisam de autenticação) ---
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{project}', [ProjectController::class, 'show']);


// --- Rotas Protegidas (exigem autenticação via Sanctum) ---
Route::middleware('auth:sanctum')->group(function () {
    // Rota para obter dados do usuário logado
    Route::get('/user', function (Request $request) {
        return $request->user()->load(['company', 'freelancer']);
    });

    // Rota para fazer logout
    Route::post('/logout', [AuthController::class, 'logout']);

    // Rota para upload de foto de perfil
    Route::post('/user/profile-photo', [ProfileController::class, 'updatePhoto']);

    // --- Rotas de Projetos (para usuários autenticados) ---
    Route::post('/projects', [ProjectController::class, 'store'])->middleware('can:isCompany');
    Route::put('/projects/{project}', [ProjectController::class, 'update'])->middleware('can:isCompany');
    Route::delete('/projects/{project}', [ProjectController::class, 'destroy'])->middleware('can:isCompany');
    Route::get('/my-projects', [ProjectController::class, 'myProjects'])->middleware('can:isCompany');

    // --- Rotas de Propostas (para usuários autenticados) ---
    Route::post('/proposals', [ProposalController::class, 'store'])->middleware('can:isFreelancer');
    Route::get('/my-proposals', [ProposalController::class, 'myProposals'])->middleware('can:isFreelancer');
    Route::put('/proposals/{proposal}', [ProposalController::class, 'update'])->middleware('can:isFreelancer');
    Route::delete('/proposals/{proposal}', [ProposalController::class, 'destroy'])->middleware('can:isFreelancer');
    Route::get('/proposals/{proposal}', [ProposalController::class, 'show'])->middleware('can:isFreelancer');
});