<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StaffController;

Route::middleware(['auth', 'verified', 'role:Admin'])->group(function () {
    Route::resource('staff', StaffController::class);
});
