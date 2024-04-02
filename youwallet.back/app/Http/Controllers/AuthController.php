<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($data)) {
            return response()->json(['message' => 'Wrong Credentials!', 401]);
        }

        $user = User::where('email', $request['email'])->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Successfully logged in!',
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 200);
    }
    public function register(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|min:3|max:255|unique:users,name',
                'email' => 'required|email|max:255|unique:users',
                'password' => 'required|string|min:8',
            ]);

            DB::beginTransaction();
            $user = User::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
                'role_id' => '0',
            ]);

            $wallet = Wallet::create([
                'user_id' => $user->id,
                'wallet_name' => $request->input('name'),
                'balance' => '0',
            ]);
            DB::commit();

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Successfully created account!',
                'access_token' => $token,
                'token_type' => 'Bearer',
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Registration Failed!',
                'errors' => $e->validator->errors()->all(),
            ], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Registration Failed!',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
