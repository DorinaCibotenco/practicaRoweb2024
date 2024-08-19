<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function list()
    {
        $products = Product::orderBy('id', 'asc')->get();
        return view('products.list', compact('products'));
    }
    public function create()
    {
        return view('products.add-edit', ['product' => new Product()]);
    }
    public function store(ProductRequest $request, Product $product = null)
    {
       
        if (!$product) {
            $product = new Product();
        }

        $imagePath = $product->image;

        
        if ($request->hasFile('image')) {
            if ($imagePath) {
                Storage::delete('public/' . $imagePath);
            }
            $imagePath = $request->file('image')->store('images', 'public');
        }

        
        $product->fill([
            'name' => $request->name,
            'order' => $request->order,
            'image' => $imagePath,
            'price' => $request->price,
        ]);
        
        $product->save();

        $message = $product->wasRecentlyCreated ? 'Product created successfully.' : 'Product updated successfully.';
        return redirect()->route('products.list')->with('success', $message);
    }

    public function edit(Product $product)
    {
        return view('products.add-edit', compact('product'));
    }

    public function delete(Product $product)
    {
       
        if ($product->image) {
            Storage::delete('public/' . $product->image);
        }

        $product->delete();

        return redirect()->route('products.list')->with('success', 'Product deleted successfully.');
    }
}
