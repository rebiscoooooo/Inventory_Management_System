<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SaleController extends Controller
{
    public function index(Request $request)
    {
        $query = Sale::with('items.product');
        
        // If the user has Admin or Manager role, they see all sales.
        // Otherwise, just in case, restrict to their own.
        if (!$request->user()->hasRole(['Admin', 'Manager']) && $request->user()->role !== 'admin') {
            $query->where('cashier', $request->user()->name);
        }

        $sales = $query->latest()->paginate(15);

        // Overall stats
        $totalRevenue = Sale::sum('total_amount');
        $todayRevenue = Sale::whereDate('created_at', today())->sum('total_amount');
        $totalTransactions = Sale::count();

        return Inertia::render('Sales/Index', [
            'sales' => $sales,
            'stats' => [
                'total_revenue' => $totalRevenue,
                'today_revenue' => $todayRevenue,
                'total_transactions' => $totalTransactions
            ]
        ]);
    }

    public function show(Sale $sale)
    {
        $sale->load('items.product');
        return Inertia::render('Sales/Show', [
            'sale' => $sale
        ]);
    }
}
