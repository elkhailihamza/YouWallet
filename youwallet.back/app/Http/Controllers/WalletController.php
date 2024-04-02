<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class WalletController extends Controller
{
    public function store(Request $request)
    {
        try {
            $request->validate([
                'wallet_name' => [
                    'required',
                    'string',
                    'min:3',
                    Rule::unique('wallets', 'wallet_name')->where(function ($query) use ($request) {
                        return $query->where('user_id', $request->user()->id);
                    })
                ],
            ]);
            DB::beginTransaction();
            $wallet = Wallet::create([
                'user_id' => $request->user()->id,
                'wallet_name' => $request->input('wallet_name'),
                'balance' => 0,
            ]);
            DB::commit();
            return response()->json([
                'message' => 'Wallet created successfully!',
                'wallet' => $wallet,
            ]);
        } catch (ValidationException $e) {
            DB::rollBack();
            return response()->json([
                'errors' => $e->validator->errors()->all(),
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => $e->getMessage(),
            ]);
        };
    }
    public function status(Request $request)
    {
        $wallet = Wallet::where('user_id', $request->user()->id)->get();
        return response()->json([
            'Wallet' => $wallet,
        ]);
    }
}
