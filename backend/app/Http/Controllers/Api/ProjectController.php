<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

use App\Models\Project;
use Illuminate\Http\Request;

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
    $validatedData['skills'] = ''; 

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
                            ->latest() 
                            ->get();

        return response()->json($projects);
    }
    public function update(Request $request, Project $project)
    {
        // Garante que o usuário logado é o dono do projeto
        if (Auth::user()->company->id !== $project->company_id) {
            return response()->json(['message' => 'Ação não autorizada.'], 403);
        }

        $validatedData = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'budget' => 'sometimes|required|numeric|min:0',
            'status' => 'sometimes|required|in:aberto,em_andamento,concluido,cancelado',
        ]);

        $project->update($validatedData);

        return response()->json($project);
    }

    /**
     * Deleta um projeto do banco de dados.
     */
    public function destroy(Project $project)
    {
        // Garante que o usuário logado é o dono do projeto
        if (Auth::user()->company->id !== $project->company_id) {
            return response()->json(['message' => 'Ação não autorizada.'], 403);
        }

        // Deleta as propostas associadas primeiro para manter a integridade do banco
        $project->proposals()->delete();
        $project->delete();

        // Retorna uma resposta de sucesso sem conteúdo
        return response()->noContent();
    }
}