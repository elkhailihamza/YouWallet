<?php

namespace App\Http\Controllers;

use App\Models\Wallet;
use Illuminate\Http\Request;

class WalletController extends Controller
{
    public function status(Request $request) {
        $wallet = Wallet::where('user_id', $request->user()->id)->get();
        return response()->json([
            'Wallet' => $wallet,
        ]);
    }
}
