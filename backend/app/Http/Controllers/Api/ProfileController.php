<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    /**
     * Atualiza a foto de perfil do usuário autenticado.
     */
    public function updatePhoto(Request $request)
    {
        // Valida o arquivo enviado para garantir que é uma imagem
        $request->validate([
            'photo' => ['required', 'image', 'max:2048'], // 2MB Max
        ]);

        // Pega o usuário que está fazendo a requisição
        $user = $request->user();

        // Apaga a foto de perfil antiga, se ela existir, para não acumular lixo
        if ($user->profile_photo_path) {
            Storage::disk('public')->delete($user->profile_photo_path);
        }

        // Salva a nova foto na pasta 'storage/app/public/profile-photos'
        // e retorna o caminho para salvar no banco de dados.
        $path = $request->file('photo')->store('profile-photos', 'public');

        // Atualiza a coluna 'profile_photo_path' do usuário com o novo caminho
        $user->forceFill([
            'profile_photo_path' => $path,
        ])->save();

        // Retorna uma resposta de sucesso com o novo caminho da foto
        return response()->json([
            'message' => 'Foto de perfil atualizada com sucesso!',
            'profile_photo_path' => $path,
            'profile_photo_url' => Storage::disk('public')->url($path) // Retorna a URL completa
        ]);
    }
}