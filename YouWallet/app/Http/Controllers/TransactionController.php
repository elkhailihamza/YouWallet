<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Validator;

class TransactionController extends Controller
{
    public function check(Request $request)
    {
        try {
            $request->validate([
                'transaction' => 'required|numeric|gt:0',
                'receiver' => 'required',
            ]);

            $found = User::whereNot('id', $request->user()->id)->where('id', $request->input('receiver'))->first();

            if ($found) {
                $sender = $request->user();
                $receiver = $found;
                $transaction = $request->input('transaction');

                if ($sender->wallet->balance >= $transaction) {
                    $this->send($sender, $receiver, $transaction);

                    return response()->json([
                        'message' => 'Sent Transaction successfully!',
                        'balance' => 'Current balance: ' . $sender->wallet->balance,
                    ]);
                } else {
                    return response()->json([
                        'message' => 'Insufficiant funds!',
                    ]);
                }
            } else {
                return response()->json([
                    'message' => 'Receiver not found!'
                ]);
            }
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->validator->errors()->all()], 422);
        }
    }
    public function send($sender, $receiver, $transaction)
    {
        $sender->wallet->balance -= $transaction;
        $receiver->wallet->balance += $transaction;

        $sender->wallet->save();
        $receiver->wallet->save();
    }
}
