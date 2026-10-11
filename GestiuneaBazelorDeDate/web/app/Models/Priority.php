<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Priority extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'name',
        'slug',
        'level',
        'color_hex',
        'icon',
    ];

    protected $casts = [
        'level' => 'integer',
    ];

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
