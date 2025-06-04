Route::get('/usuarios', [UsuarioController::class, 'index']);
Route::post('/cadastro', [UsuarioController::class, 'store']);
use Illuminate\Support\Facades\Route;

Route::get('/users', function () {
    return response()->json([
        ['name' => 'Alice'],
        ['name' => 'Bob'],
        ['name' => 'Carol']
    ]);
});
