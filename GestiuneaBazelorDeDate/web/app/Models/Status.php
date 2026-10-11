<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'name',
        'slug',
        'category',
        'color_hex',
        'position',
        'is_final',
    ];

    protected $casts = [
        'is_final' => 'boolean',
        'position' => 'integer',
    ];

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
