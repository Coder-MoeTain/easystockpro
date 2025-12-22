<?php

namespace App\Http\Controllers;

use App\Models\PaymentMethod;
use App\utils\helpers;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PaymentMethodController extends Controller
{

    //------------ GET ALL Payment Methods -----------\\

    public function index(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'view', PaymentMethod::class);
        // How many items do you want to display.
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;
        $order = $request->SortField;
        $dir = $request->SortType;
        $helpers = new helpers();

        $payment_methods = PaymentMethod::where('deleted_at', '=', null)

        // Search With Multiple Param
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where('name', 'LIKE', "%{$request->search}%");
                });
            });
        $totalRows = $payment_methods->count();
        if($perPage == "-1"){
            $perPage = $totalRows;
        }
        $payment_methods = $payment_methods->offset($offSet)
            ->limit($perPage)
            ->orderBy($order, $dir)
            ->get();

        return response()->json([
            'payment_methods' => $payment_methods,
            'totalRows' => $totalRows,
        ]);
    }

    //---------------- STORE NEW Payment Method -------------\\

    public function store(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'create', PaymentMethod::class);

        request()->validate([
            'name' => 'required|unique:payment_methods,name,NULL,id,deleted_at,NULL',
        ]);

        PaymentMethod::create([
            'name' => $request['name'],
            'is_active' => $request['is_active'] ?? 1,
        ]);

        return response()->json(['success' => true]);

    }

    //------------ function show -----------\\

    public function show($id){
        //
        
        }

    //---------------- UPDATE Payment Method -------------\\

    public function update(Request $request, $id)
    {
        $this->authorizeForUser($request->user('api'), 'update', PaymentMethod::class);

        request()->validate([
            'name' => 'required|unique:payment_methods,name,'.$id.',id,deleted_at,NULL',
        ]);

        PaymentMethod::whereId($id)->update([
            'name' => $request['name'],
            'is_active' => $request['is_active'] ?? 1,
        ]);

        return response()->json(['success' => true]);

    }

    //------------ Delete Payment Method -----------\\

    public function destroy(Request $request, $id)
    {
        $this->authorizeForUser($request->user('api'), 'delete', PaymentMethod::class);

        PaymentMethod::whereId($id)->update([
            'deleted_at' => Carbon::now(),
        ]);

        return response()->json(['success' => true]);
    }

    //-------------- Delete by selection  ---------------\\

    public function delete_by_selection(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'delete', PaymentMethod::class);
        $selectedIds = $request->selectedIds;

        foreach ($selectedIds as $payment_method_id) {
            PaymentMethod::whereId($payment_method_id)->update([
                'deleted_at' => Carbon::now(),
            ]);
        }
        return response()->json(['success' => true]);
    }

    //------------ GET ALL Payment Methods WITHOUT PAGINATE -----------\\

    public function Get_Payment_Methods()
    {
        $PaymentMethods = PaymentMethod::where('deleted_at', null)
            ->where('is_active', 1)
            ->orderBy('name', 'asc')
            ->get(['id', 'name']);
        return response()->json($PaymentMethods);
    }

}

