<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_key',
        'name',
        'description',
        'owner_id',
        'status',
        'priority',
        'start_date',
        'due_date',
        'budget',
    ];

    protected $casts = [
        'start_date' => 'date',
        'due_date' => 'date',
        'budget' => 'decimal:2',
    ];

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function members()
    {
        return $this->belongsToMany(User::class, 'project_members')
                    ->withPivot('project_role', 'joined_at');
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    public function completedTasks()
    {
        return $this->tasks()->whereHas('status', function ($query) {
            $query->where('is_final', true);
        });
    }

    public function getProgressPercentageAttribute(): float
    {
        $total = $this->tasks()->count();
        if ($total === 0) {
            return 0.0;
        }
        $completed = $this->completedTasks()->count();
        return round(($completed / $total) * 100, 1);
    }
}
