<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->float('transaction');
            $table->unsignedBigInteger('sender')->nullable();
            $table->unsignedBigInteger('receiver')->nullable();
            $table->foreign('sender')->references('id')->on('users')->onDelete('SET NULL');
            $table->foreign('receiver')->references('id')->on('users')->onDelete('SET NULL'); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
