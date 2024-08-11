<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Order;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    protected $model = Order::class;

    public function definition(): array
    {
        return [
            'order_date' => $this->faker->date(),
            'total_amount' => $this->faker->randomFloat(2, 10, 500),
            'customer_id' => null,
        ];
    }
}
