<?php


use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       	// Insert some stuff
        DB::table('clients')->insert(
            array(
                'id'     => 1,
                'name'   => 'customer',
                'code' => 1,
                'email' => 'customer@gmail.com',
                'country' => 'Myanmar',
                'city' => 'Yangon',
                'phone' => '09664173833',
                'adresse' => 'Lanmadaw',
                'tax_number' => NULL,
            )
            
        );
    }
}
