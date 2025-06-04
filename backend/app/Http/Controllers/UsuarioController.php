<?php

namespace App\Http\Controllers;

use App\Models\User; // Importa o Model User
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UsuarioController extends Controller
{
    /**
     * Armazena um novo usuário no banco de dados.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // 1. Validação dos dados recebidos
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email', // Verifica se o email é único na tabela 'users'
            'password' => 'required|string|min:8|confirmed', // 'confirmed' espera um campo 'password_confirmation'
        ]);

        // Se a validação falhar, retorna os erros
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422); // 422 Unprocessable Entity
        }

        // 2. Criação do usuário
        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => $request->password, // O Hash::make é feito automaticamente pelo Model devido ao cast 'hashed'
            ]);

            // 3. Retorna uma resposta de sucesso
            return response()->json([
                'message' => 'Usuário cadastrado com sucesso!',
                'user' => $user // Opcional: retornar os dados do usuário (sem a senha)
            ], 201); // 201 Created

        } catch (\Exception $e) {
            // Log do erro (opcional, mas recomendado para debug)
            // Log::error('Erro ao cadastrar usuário: ' . $e->getMessage());

            return response()->json([
                'message' => 'Erro ao cadastrar usuário. Por favor, tente novamente mais tarde.'
            ], 500); // 500 Internal Server Error
        }
    }
}