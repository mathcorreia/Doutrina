<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Proposal;
use Illuminate\Support\Facades\Auth;

class ProposalController extends Controller
{
    /**
     * Armazena uma nova proposta no banco de dados.
     * Esta função é chamada quando um freelancer se candidata a um projeto.
     */
    public function store(Request $request)
    {
        // 1. Valida os dados recebidos do formulário do frontend
        $validatedData = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'content' => 'required|string|min:10',
            'amount' => 'required|numeric|min:0',
        ]);

        $user = Auth::user();

        // 2. Verifica se o usuário autenticado é um freelancer
        if (!$user->freelancer) {
            return response()->json(['message' => 'Apenas freelancers podem enviar propostas.'], 403); // 403 Forbidden
        }

        // 3. Verifica se o freelancer já não enviou uma proposta para este projeto
        $existingProposal = Proposal::where('freelancer_id', $user->freelancer->id)
                                    ->where('project_id', $validatedData['project_id'])
                                    ->exists();

        if ($existingProposal) {
            return response()->json(['message' => 'Você já enviou uma proposta para este projeto.'], 409); // 409 Conflict
        }

        // 4. Se tudo estiver correto, cria a nova proposta no banco de dados
        $proposal = new Proposal();
        $proposal->project_id = $validatedData['project_id'];
        $proposal->freelancer_id = $user->freelancer->id; // Associa a proposta ao freelancer logado
        $proposal->content = $validatedData['content'];
        $proposal->amount = $validatedData['amount'];
        $proposal->save();

        // 5. Retorna a proposta criada com um status de sucesso
        return response()->json($proposal, 201); // 201 Created
    }
}