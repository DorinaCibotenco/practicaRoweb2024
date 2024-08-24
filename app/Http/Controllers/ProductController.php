<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Http\Request;


class ProductController extends Controller
{
    public function list(Request $request)
    {
        
        $selectedCategoryId = $request->input('category', null); // Capture the selected category

        $query = Product::query();
    
        if ($selectedCategoryId !== null) {
            $query->where('category_id', $selectedCategoryId);
        }
    
        $products = $query->paginate(5);
        $categories = Category::all();
    
        return inertia('Products/List', [
            'products' => $products,
            'categories' => $categories,
            'selectedCategoryId' => $selectedCategoryId, // Pass the selected category ID
        ]);
    
    }

    public function create()
    {
        return Inertia::render('Products/AddEdit', [
            'categories' => Category::select(['name', 'id'])->get()
        ]);
    }

    public function update(Product $product)
    {
        $product->load('images');

        return Inertia::render('Products/AddEdit', [
            'categories' => Category::select(['name', 'id'])->get(),
            'product' => $product,
        ]);
    }

    public function store(ProductRequest $request, ?Product $product = null)
    {
        $request->updateOrCreate($product);

        return redirect()->route('products.list')->with(['success' => 'Product saved.']);
    }

    public function delete(Product $product)
    {
        $product->images()->each(function ($productImage) {
            Storage::disk('public')->delete($productImage->path);
            $productImage->delete();
        });
        Storage::disk('public')->deleteDirectory('products/'.$product->id);
        $product->delete();

        return redirect()->route('products.list')->with(['success' => 'Product deleted.']);
    }
}