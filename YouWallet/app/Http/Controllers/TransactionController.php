<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\User;
use Dotenv\Repository\RepositoryInterface;
use Illuminate\Database\Eloquent\ModelNotFoundException;
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
                'receiver' => 'required|exists:users,id',
            ]);

            $sender = $request->user();
            $receiver = User::findOrFail($request->input('receiver'));
            $transaction = $request->input('transaction');

            if ($sender->id === $receiver->id) {
                return response()->json([
                    'message' => 'Sender cannot send a transaction to themselves.',
                ], 422);
            }

            if ($sender->wallet->balance < $transaction) {
                return response()->json([
                    'message' => 'Insufficient funds!',
                ], 422);
            }

            DB::beginTransaction();
            $this->send($sender, $receiver, $transaction);
            DB::commit();

            return response()->json([
                'message' => 'Sent Transaction successfully!',
                'balance' => 'Current balance: ' . $sender->wallet->balance,
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'errors' => $e->validator->errors()->all()
            ], 422);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Receiver not found!'
            ], 404);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    public function send($sender, $receiver, $transaction)
    {
        $sender->wallet->balance -= $transaction;
        $receiver->wallet->balance += $transaction;

        $sender->wallet->save();
        $receiver->wallet->save();

        Transaction::create([
            'transaction' => $transaction,
            'sender' => $sender->id,
            'receiver' => $receiver->id,
        ]);
    }

    public function withdraw(Request $request)
    {
        try {
            $user = $request->user();
            $amount = $request->input('amount');
            if ($user->wallet->balance < $amount) {
                return response()->json([
                    'message' => 'Insufficient funds!',
                ], 422);
            }
            DB::beginTransaction();
            $user->wallet->balance -= $amount;
            $user->wallet->save();
            DB::commit();
            return response()->json([
                "message" => "Withdraw successfully!",
                "amount" => "Amount withdrawn: " . $amount,
                "balance" => "Current balance: " . $user->wallet->balance
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => $e->getMessage(),
            ]);
        }
    }

    public function fetch(Request $request)
    {
        $user = $request->user();
        if ($user->role_id == 1) {
            $transactions = Transaction::paginate(10);
            return response()->json([
                'Transactions' => $transactions,
            ], 200);
        }
        return response()->json([
            'message' => 'Unauthorized access!'
        ], 401);
    }
}
