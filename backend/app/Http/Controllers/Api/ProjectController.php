<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
{
    /**
     * Lista todos os projetos com status 'aberto'.
     * Inclui informações do usuário da empresa que postou o projeto.
     * Exemplo de uso: GET /api/projects
     */
    public function index()
    {
        // Usamos 'with' para carregar o relacionamento 'company.user'.
        // Isso é mais eficiente do que fazer uma nova consulta para cada projeto (problema N+1).
        $projects = Project::with('company.user')
                           ->where('status', 'aberto') // Mostra apenas projetos que aceitam propostas
                           ->orderBy('created_at', 'desc') // Mais recentes primeiro
                           ->get();

        // Retorna os projetos como uma resposta JSON
        return response()->json($projects);
    }

    /**
     * Salva um novo projeto no banco de dados.
     * Exemplo de uso: POST /api/projects
     */
    public function store(Request $request)
    {
        // Validação dos dados recebidos do frontend
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'budget' => 'required|numeric|min:0',
            'company_id' => 'required|integer|exists:companies,id' // Garante que a empresa existe
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422); // Retorna erro de validação
        }

        // Cria o projeto usando o relacionamento do Model
        // Este é um exemplo de uso daquele código que você perguntou!
        $project = Project::create([
            'title' => $request->title,
            'description' => $request->description,
            'budget' => $request->budget,
            'company_id' => $request->company_id,
            'status' => 'aberto' // Define o status inicial
        ]);

        // Retorna o projeto recém-criado com um status de sucesso
        return response()->json($project, 201); // 201 = Created
    }

    /**
     * Mostra os detalhes de um único projeto.
     * Inclui a empresa e todas as propostas feitas para ele.
     * Exemplo de uso: GET /api/projects/1
     */
    public function show(string $id)
    {
        // Encontra o projeto pelo ID ou falha (retorna 404 Not Found)
        // Carrega os relacionamentos com a empresa e as propostas (e o usuário de cada um)
        $project = Project::with(['company.user', 'proposals.freelancer.user'])->findOrFail($id);

        // Retorna o projeto detalhado como JSON
        return response()->json($project);
    }
}