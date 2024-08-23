<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('query');

       
        $products = Product::where('name', 'LIKE', "%{$query}%")->get();

       
        return Inertia::render('Products/List', [
            'products' => $products,
            'query' => $query 
        ]);
    }
    
}