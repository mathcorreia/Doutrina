<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index()
    {
        // O método index também pode carregar o nome da empresa para a listagem
        return Project::with('company.user')->latest()->get();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'budget' => 'required|numeric',
            'company_id' => 'required|exists:companies,id'
        ]);

        $project = Project::create($validatedData);
        return response()->json($project, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // --- MODIFICAÇÃO PRINCIPAL AQUI ---
        // Carrega o projeto com seus relacionamentos:
        // 1. 'company.user' para pegar os dados da empresa e do usuário dono.
        // 2. 'proposals.freelancer.user' para pegar as propostas, 
        //    o perfil do freelancer e os dados do usuário do freelancer.
        $project = Project::with(['company.user', 'proposals.freelancer.user'])->findOrFail($id);

        return response()->json($project);
    }

    public function update(Request $request, Project $project)
    {
        $validatedData = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'budget' => 'sometimes|required|numeric',
        ]);

        $project->update($validatedData);
        return response()->json($project);
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return response()->json(null, 204);
    }
}