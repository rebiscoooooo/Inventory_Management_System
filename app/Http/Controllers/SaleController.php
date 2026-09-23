<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SaleController extends Controller
{
    public function index()
    {
        $sales = Sale::with('items.product')->latest()->paginate(15);
        return Inertia::render('Sales/Index', [
            'sales' => $sales
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
