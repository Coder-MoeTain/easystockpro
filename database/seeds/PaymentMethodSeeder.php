<?php

use Illuminate\Database\Seeder;
use App\Models\PaymentMethod;

class PaymentMethodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $payment_methods = [
            ['name' => 'Cash', 'is_active' => 1],
            ['name' => 'credit card', 'is_active' => 1],
            ['name' => 'TPE', 'is_active' => 1],
            ['name' => 'cheque', 'is_active' => 1],
            ['name' => 'Western Union', 'is_active' => 1],
            ['name' => 'bank transfer', 'is_active' => 1],
            ['name' => 'other', 'is_active' => 1],
            ['name' => 'Wave Pay', 'is_active' => 1],
            ['name' => 'Kpay', 'is_active' => 1],
            ['name' => 'CB Pay', 'is_active' => 1],
            ['name' => 'AYA Pay', 'is_active' => 1],
            ['name' => 'MPU', 'is_active' => 1],
            ['name' => 'VISA', 'is_active' => 1],
            ['name' => 'Bank', 'is_active' => 1],
        ];

        foreach ($payment_methods as $method) {
            // Check if payment method already exists
            $existing = PaymentMethod::where('name', $method['name'])
                ->where('deleted_at', null)
                ->first();
            
            if (!$existing) {
                PaymentMethod::create($method);
            }
        }
    }
}

