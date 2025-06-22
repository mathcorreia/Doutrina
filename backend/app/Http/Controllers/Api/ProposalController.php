<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

use App\Models\Proposal;
use Illuminate\Http\Request;

class ProposalController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'valor' => 'required|numeric|min:0',
            'mensagem_proposta' => 'required|string|min:10',
        ]);

        //  Obtenha o usuário da forma correta
        $user = Auth::user();

        //  Verificação de segurança para o freelancer
        if (!$user || !$user->freelancer) {
            return response()->json(['message' => 'Ação não autorizada ou perfil de freelancer não encontrado.'], 403);
        }

        //  Adicione o freelancer_id automaticamente
        $validatedData['freelancer_id'] = $user->freelancer->id;
        
        $proposal = Proposal::create($validatedData);
        $proposal->load('freelancer.user');

        return response()->json($proposal, 201);
    }
    public function myProposals(Request $request)
    {
        $user = Auth::user();

        if (!$user || !$user->freelancer) {
            return response()->json(['message' => 'Usuário não autenticado ou sem perfil de freelancer.'], 403);
        }

        $freelancerId = $user->freelancer->id;

        // Busca as propostas do freelancer e carrega os dados do projeto associado
        $proposals = Proposal::with('project')
                                ->where('freelancer_id', $freelancerId)
                                ->latest()
                                ->get();
        
        return response()->json($proposals);
    }
}