<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Company;
use App\Models\Freelancer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Registra um novo usuário (freelancer ou empresa).
     */
    public function signup(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'user_type' => 'required|string|in:freelancer,company',
            'cpf' => 'required_if:user_type,freelancer|string|unique:freelancers,cpf',
            'cnpj' => 'required_if:user_type,company|string|unique:companies,cnpj',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Usamos uma transação para garantir que o usuário e o perfil sejam criados juntos
        try {
            DB::beginTransaction();

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'user_type' => $request->user_type,
            ]);

            if ($request->user_type === 'freelancer') {
                $user->freelancer()->create(['cpf' => $request->cpf, 'data_nascimento' => '1990-01-01']); // data_nascimento como exemplo
            } elseif ($request->user_type === 'company') {
                $user->company()->create(['cnpj' => $request->cnpj]);
            }

            DB::commit();

            return response()->json([
                'message' => 'Usuário registrado com sucesso!',
                'user' => $user
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Erro ao registrar usuário', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Autentica um usuário e retorna um token.
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::with(['freelancer', 'company'])->where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['As credenciais fornecidas estão incorretas.'],
            ]);
        }

        // Cria e retorna o token de API
        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }
}