<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\Sale;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        $totalUsers = User::count();
        $totalProducts = Product::count();
        $totalSales = Sale::count();
        $recentSales = Sale::latest()->take(5)->get();

        return Inertia::render('Dashboard', [
            'stats' => [
                'users' => $totalUsers,
                'products' => $totalProducts,
                'sales' => $totalSales,
            ],
            'recentSales' => $recentSales,
        ]);
    }
}
