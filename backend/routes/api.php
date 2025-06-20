<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\ProposalController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', fn(Request $request) => $request->user());
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('/projects', ProjectController::class);
    Route::post('/proposals', [ProposalController::class, 'store']);
     Route::get('/my-proposals', [ProposalController::class, 'myProposals'])->middleware('can:isFreelancer');
         Route::get('/my-projects', [ProjectController::class, 'myProjects'])->middleware('can:isCompany');

});