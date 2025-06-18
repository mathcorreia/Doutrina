<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_type' => 'required|in:freelancer,company',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'name' => 'required_if:user_type,freelancer|nullable|string|max:255',
            'cpf' => 'required_if:user_type,freelancer|nullable|string|unique:freelancers,cpf',
            'data_nascimento' => 'required_if:user_type,freelancer|nullable|date',
            'companyName' => 'required_if:user_type,company|nullable|string|max:255',
            'razao_social' => 'required_if:user_type,company|nullable|string|max:255',
            'cnpj' => 'required_if:user_type,company|nullable|string|unique:companies,cnpj',
            'data_fundacao' => 'required_if:user_type,company|nullable|date',
            'telefone' => 'nullable|string|max:20',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        try {
            DB::beginTransaction();

            // AQUI ESTÁ A CORREÇÃO PRINCIPAL
            $user = User::create([
                'name' => $request->name ?? $request->companyName,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'user_type' => $request->user_type, // Enviando o tipo de usuário
            ]);

            if ($request->user_type === 'freelancer') {
                $user->freelancer()->create($validator->validated());
            } elseif ($request->user_type === 'company') {
                $user->company()->create([
                    'company_name' => $request->companyName,
                    'razao_social' => $request->razao_social,
                    'cnpj' => $request->cnpj,
                    'data_fundacao' => $request->data_fundacao,
                    'telefone' => $request->telefone,
                ]);
            }
            
            DB::commit();
            $token = $user->createToken('auth_token')->plainTextToken;
            return response()->json(['message' => 'Usuário registrado com sucesso!', 'access_token' => $token], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Erro ao registrar o usuário: ' . $e->getMessage());
            return response()->json(['message' => 'Erro interno ao registrar o usuário.'], 500);
        }
    }

    public function login(Request $request)
    {
        $request->validate(['email' => 'required|email', 'password' => 'required']);
        if (!Auth::attempt($request->only('email', 'password'))) {
            throw ValidationException::withMessages(['email' => ['As credenciais fornecidas estão incorretas.']]);
        }
        $user = User::where('email', $request->email)->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json(['access_token' => $token, 'token_type' => 'Bearer', 'user' => $user]);
    }
    
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logout realizado com sucesso.']);
    }
}