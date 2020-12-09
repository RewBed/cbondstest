<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function index()
    {
        //
        return view('spa.index');
    }

    /**
     * Сохранение товара
     * @param Request $request
     * @return array
     */
    public function save(Request $request) {

        $request->validate([
            'id' => 'required|integer',
            'name' => 'required|max:255',
            'price' => 'required|numeric'
        ]);

        if($request->id === 0)
            $product = new Product();
        else
            $product = Product::findOrFail($request->id);

        $product->name = $request->name;
        $product->price = $request->price;
        $product->save();

        return ['id' => $product->id];
    }

    /**
     * Удалить продукт
     *
     * @param $id
     * @return array
     */
    public function remove($id) {
        $product = Product::findOrFail($id);
        $product->delete();
        return ['delete' => true];
    }

    /**
     * Список товаров
     * @param $request
     * @return Product[]|\Illuminate\Database\Eloquent\Collection
     */
    public function list(Request $request) {

        $maxOnPage = 25;

        $request->validate([
            'page' => 'numeric',
            'name' => 'string'
        ]);

        if($request->name)
            return Product::where('name', 'LIKE', '%'.$request->name.'%')->paginate($maxOnPage);
        else
            return Product::paginate($maxOnPage);
    }
}
