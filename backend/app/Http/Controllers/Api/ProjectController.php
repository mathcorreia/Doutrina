<?php

namespace App\Http\Controllers\Api;

// 1. Importe o Controller base e o Facade Auth
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

use App\Models\Project;
use Illuminate\Http\Request;

// 2. O controller deve estender o 'Controller' base, e não o AuthController
class ProjectController extends Controller
{
    public function index()
    {
        return Project::with('company.user')->latest()->get();
    }

   public function store(Request $request)
{
    $validatedData = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'required|string',
        'budget' => 'required|numeric|min:0',
    ]);

    $user = Auth::user();

    if (!$user || !$user->company) {
        return response()->json(['message' => 'Ação não autorizada ou perfil de empresa não encontrado.'], 403);
    }

    $validatedData['company_id'] = $user->company->id;
    $validatedData['skills'] = ''; // Adiciona uma string vazia para satisfazer o NOT NULL

    $project = Project::create($validatedData);

    return response()->json($project, 201);
}

    public function show(string $id)
    {
        $project = Project::with(['company.user', 'proposals.freelancer.user'])->findOrFail($id);
        return response()->json($project);
    }
    
    public function myProjects(Request $request)
    {
        // Pega o usuário autenticado
        $user = Auth::user();

        // Garante que o usuário tem um perfil de empresa
        if (!$user || !$user->company) {
            return response()->json(['message' => 'Usuário não autenticado ou sem perfil de empresa.'], 403);
        }
        
        // Pega o ID da empresa do usuário
        $companyId = $user->company->id;
        
        // Busca no banco de dados todos os projetos com esse company_id
        $projects = Project::where('company_id', $companyId)
                            ->latest() // Ordena pelos mais recentes
                            ->get();

        return response()->json($projects);
    }
}