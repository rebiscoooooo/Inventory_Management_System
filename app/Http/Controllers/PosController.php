<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Sale;
use App\Models\SalesItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class PosController extends Controller
{
    public function index()
    {
        $products = Product::where('stock', '>', 0)->orderBy('name', 'asc')->get();
        $categories = Product::select('category')->whereNotNull('category')->distinct()->pluck('category');
        
        return Inertia::render('Pos/Index', [
            'products' => $products,
            'categories' => $categories
        ]);
    }

    public function checkout(Request $request)
    {
        $validated = $request->validate([
            'total_amount' => 'required|numeric|min:0',
            'cash' => 'required|numeric|min:0',
            'change_amount' => 'required|numeric|min:0',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
            'items.*.subtotal' => 'required|numeric|min:0',
        ]);

        DB::transaction(function () use ($validated, $request, &$sale) {
            $sale = Sale::create([
                'total_amount' => $validated['total_amount'],
                'cash' => $validated['cash'],
                'change_amount' => $validated['change_amount'],
                'cashier' => $request->user()->name ?? 'Unknown',
            ]);

            foreach ($validated['items'] as $item) {
                SalesItem::create([
                    'sale_id' => $sale->id,
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                    'subtotal' => $item['subtotal']
                ]);

                Product::where('id', $item['product_id'])->decrement('stock', $item['quantity']);
            }
        });

        $sale->load('items.product');

        return redirect()->route('pos.index')->with('success', 'Transaction completed successfully!')->with('receipt', $sale);
    }
}
