<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

Route::middleware(['auth', 'verified', 'role:Admin'])->group(function () {
    Route::resource('products', ProductController::class);
});
