<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

use App\Models\Proposal;
use Illuminate\Http\Request;
use App\Models\Project;
use Illuminate\Support\Facades\Mail;
use App\Mail\ProposalAccepted;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log; 

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
    public function show(Proposal $proposal)
{
    // Garante que o usuário logado é o dono da proposta
    if (Auth::user()->freelancer->id !== $proposal->freelancer_id) {
        return response()->json(['message' => 'Ação não autorizada.'], 403);
    }
    return response()->json($proposal);
}
    public function update(Request $request, Proposal $proposal)
    {
        // Garante que o usuário logado é o dono da proposta
        if (Auth::user()->freelancer->id !== $proposal->freelancer_id) {
            return response()->json(['message' => 'Ação não autorizada.'], 403);
        }

        $validatedData = $request->validate([
            'valor' => 'sometimes|required|numeric|min:0',
            'mensagem_proposta' => 'sometimes|required|string',
        ]);

        $proposal->update($validatedData);

        return response()->json($proposal);
    }

    /**
     * Deleta uma proposta.
     */
    public function destroy(Proposal $proposal)
    {
        // Garante que o usuário logado é o dono da proposta
        if (Auth::user()->freelancer->id !== $proposal->freelancer_id) {
            return response()->json(['message' => 'Ação não autorizada.'], 403);
        }

        $proposal->delete();

        return response()->noContent();
    }
     public function accept(Request $request, Proposal $proposal)
    {
        $user = Auth::user();

        // Verificações de segurança (se o usuário é empresa e dono do projeto)
        if (!$user || !$user->company || $user->company->id !== $proposal->project->company_id) {
            return response()->json(['message' => 'Ação não autorizada.'], 403);
        }

        // Inicia uma transação de banco de dados para garantir que tudo aconteça com sucesso
        DB::transaction(function () use ($proposal) {
            // 1. Atualiza a proposta aceita
            $proposal->status = 'aceita';
            $proposal->save();

            // 2. Atualiza o status do projeto para fechá-lo
            $project = $proposal->project;
            $project->status = 'em_andamento';
            $project->save();

            // 3. Rejeita todas as outras propostas pendentes para este projeto
            Proposal::where('project_id', $project->id)
                      ->where('status', 'enviada')
                      ->update(['status' => 'recusada']);
        });

        // 4. Envia o e-mail de notificação para o freelancer
        try {
            Mail::to($proposal->freelancer->user->email)->send(new ProposalAccepted($proposal));
        } catch (\Exception $e) {
            // Opcional: Loga o erro se o e-mail não puder ser enviado, mas não quebra a requisição
            Log::error("Falha ao enviar e-mail de proposta aceita: " . $e->getMessage());
        }

        return response()->json([
            'message' => 'Proposta aceita com sucesso! O freelancer foi notificado.',
            'proposal' => $proposal->fresh()
        ]);
    }

    public function reject(Request $request, Proposal $proposal)
    {
        $user = Auth::user();

        // Garante que o usuário logado é o dono do projeto da proposta
        if ($user->company->id !== $proposal->project->company_id) {
            return response()->json(['message' => 'Ação não autorizada.'], 403);
        }

        // Atualiza o status da proposta para 'recusada'
        $proposal->status = 'recusada';
        $proposal->save();

        
        return response()->json([
            'message' => 'Proposta recusada com sucesso!',
            'proposal' => $proposal
        ]);
    }
}