<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\Sale;
use App\Models\User;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $totalUsers = User::count();
        $totalProducts = Product::count();
        
        $salesQuery = Sale::where('cashier', $user->name);

        $totalSales = (clone $salesQuery)->count();
        $recentSales = (clone $salesQuery)->latest()->take(5)->get();
        $todaySales = (clone $salesQuery)->whereDate('created_at', today())->sum('total_amount');
        $todayTransactions = (clone $salesQuery)->whereDate('created_at', today())->count();

        return Inertia::render('Dashboard', [
            'stats' => [
                'users' => $totalUsers,
                'products' => $totalProducts,
                'sales' => $totalSales,
                'today_sales' => $todaySales,
                'today_transactions' => $todayTransactions,
            ],
            'recentSales' => $recentSales,
        ]);
    }
}
