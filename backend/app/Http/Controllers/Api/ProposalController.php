<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Proposal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProposalController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // --- CORREÇÃO AQUI ---
        // A validação deve corresponder aos campos enviados pelo Angular
        $validatedData = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'valor' => 'required|numeric|min:0',
            'mensagem_proposta' => 'required|string|min:10', // Garante que o campo correto seja validado
            'freelancer_id' => 'required|exists:freelancers,id' // Adiciona a validação para o freelancer
        ]);

        // Associa o ID do usuário autenticado (se necessário) ou usa o freelancer_id validado
        $proposal = Proposal::create($validatedData);

        // Carrega a relação com o usuário para retornar na resposta
        $proposal->load('freelancer.user');

        return response()->json($proposal, 201);
    }
}