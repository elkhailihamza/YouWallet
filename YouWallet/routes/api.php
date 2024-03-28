<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\WalletController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::controller(AuthController::class)->group(function () {
    Route::post('/login', 'login');
    Route::post('/register', 'register');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/wallet', [WalletController::class, 'status']);
    Route::post('/wallet/create', [WalletController::class, 'store']);
    Route::controller(TransactionController::class)->group(function () {
        Route::post('/send', 'check');
        Route::post('/fetch', 'fetch');
        Route::post('/withdraw', 'withdraw');
    });
});
