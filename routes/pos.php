<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PosController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/pos', [PosController::class, 'index'])->name('pos.index');
    Route::post('/pos/checkout', [PosController::class, 'checkout'])->name('pos.checkout');
});
