<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'task_key',
        'project_id',
        'status_id',
        'priority_id',
        'creator_id',
        'assignee_id',
        'title',
        'description',
        'type',
        'story_points',
        'estimated_hours',
        'logged_hours',
        'due_date',
        'completed_at',
        'position',
    ];

    protected $casts = [
        'due_date' => 'date',
        'completed_at' => 'datetime',
        'story_points' => 'integer',
        'estimated_hours' => 'decimal:2',
        'logged_hours' => 'decimal:2',
        'position' => 'integer',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }

    public function priority()
    {
        return $this->belongsTo(Priority::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id');
    }

    public function assignee()
    {
        return $this->belongsTo(User::class, 'assignee_id');
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'task_tag');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class)->orderBy('created_at', 'desc');
    }

    public function activityLogs()
    {
        return $this->hasMany(ActivityLog::class)->orderBy('created_at', 'desc');
    }

    public function isOverdue(): bool
    {
        return $this->due_date 
            && $this->due_date->isPast() 
            && (!$this->status || !$this->status->is_final);
    }
}
