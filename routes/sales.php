<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SaleController;

Route::middleware(['auth', 'verified', 'role:Admin|Manager'])->group(function () {
    Route::resource('sales', SaleController::class);
});
