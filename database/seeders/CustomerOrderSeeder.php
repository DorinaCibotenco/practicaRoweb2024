<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Customer;
use App\Models\Order;


class CustomerOrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $customers = Customer::factory(5)->create();
        $customers->each(function ($customer) {
            Order::factory(rand(1, 3))->create([
                'customer_id' => $customer->id,
            ]);
        });
    }
}
