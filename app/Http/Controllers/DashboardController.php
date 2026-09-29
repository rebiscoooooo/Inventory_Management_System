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

        $totalSales = clone $salesQuery;
        $recentSales = (clone $salesQuery)->latest()->take(5)->get();
        $todaySales = (clone $salesQuery)->whereDate('created_at', today())->sum('total_amount');
        $todayTransactions = (clone $salesQuery)->whereDate('created_at', today())->count();

        $adminStats = [];
        $chartData = [];
        
        if ($user->hasRole('Admin')) {
            $adminStats = [
                'total_system_sales' => Sale::sum('total_amount'),
                'total_inventory' => Product::sum('stock'),
                'low_stock_items' => Product::where('stock', '<=', 10)->count(),
                'total_system_users' => User::count(),
                'recent_transactions' => Sale::with('items')->latest()->take(5)->get(),
            ];

            // Last 7 days sales data
            for ($i = 6; $i >= 0; $i--) {
                $date = today()->subDays($i);
                $dailySales = Sale::whereDate('created_at', $date)->sum('total_amount');
                $chartData[] = [
                    'name' => $date->format('M d'),
                    'sales' => (float) $dailySales,
                ];
            }
        }

        return Inertia::render('Dashboard', [
            'stats' => [
                'users' => $totalUsers,
                'products' => $totalProducts,
                'sales' => $totalSales->count(),
                'today_sales' => $todaySales,
                'today_transactions' => $todayTransactions,
            ],
            'adminStats' => $adminStats,
            'chartData' => $chartData,
            'recentSales' => $recentSales,
        ]);
    }
}
