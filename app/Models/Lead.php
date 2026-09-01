<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;


class Lead extends Authenticatable
{
     use HasApiTokens, HasFactory, Notifiable;
    use HasFactory;
    protected $guarded = [];

}
