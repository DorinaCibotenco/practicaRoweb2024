<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('query');
        $category = $request->input('category');

        $productsQuery = Product::query();

        if ($query) {
            $productsQuery->where('name', 'LIKE', "%{$query}%");
        }

        if ($category) {
            $productsQuery->whereHas('category', function ($query) use ($category) {
                $query->where('name', $category);
            });
        }

        $products = $productsQuery->paginate(10);

        return Inertia::render('Welcome', [
            'products' => $products,
            'query' => $query,
            'category' => $category,
            'categories' => Category::all()
        ]);
    }
}
