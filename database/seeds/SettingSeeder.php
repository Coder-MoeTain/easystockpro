<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       // Insert some stuff
        DB::table('settings')->insert(
            array(
                'id' => 1,
                'email' => 'admin@gmail.com',
                'currency_id' => 1,
                'client_id' => 1,
                'sms_gateway' => 1,
                'is_invoice_footer' => 0,
                'invoice_footer' => Null,
                'warehouse_id' => Null,
                'CompanyName' => 'Info Tech',
                'CompanyPhone' => '+959664173833',
                'CompanyAdress' => 'M1 10th floor,Mingalar Taung Nyunt, Yangon',
                'footer' => ' Ultimate Inventory With POS',
                'developed_by' => 'Moe Tain',
                'logo' => 'logo-default.png',
            )
            
        );
    }
}
