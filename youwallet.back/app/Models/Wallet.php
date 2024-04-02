<?php

namespace App\Models;

use App\Traits\UUID;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wallet extends Model
{
    use UUID, HasFactory;
    protected $primaryKey = 'id';

    protected $casts = [
        'id' => 'string',
        'user_id' => 'string',
    ];

    protected $fillable = [
        'user_id',
        'wallet_name',
        'balance',
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
