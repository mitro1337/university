<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Role;
use App\Models\Project;
use App\Models\Task;
use App\Models\Status;
use App\Models\Priority;
use App\Models\Comment;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class DatabaseIntegrityTest extends TestCase
{
    use DatabaseTransactions;

    public function test_project_cascade_delete_removes_tasks_and_comments(): void
    {
        $role = Role::firstOrCreate(['slug' => 'admin'], ['name' => 'Admin']);
        $user = User::firstOrCreate(['email' => 'integrity-tester@linearflow.local'], [
            'name' => 'Integrity Tester',
            'password' => bcrypt('secret123'),
            'role_id' => $role->id,
            'title' => 'QA Lead'
        ]);

        $project = Project::create([
            'project_key' => 'DEL' . rand(10, 99),
            'name' => 'Cascade Test Project',
            'description' => 'Will be deleted to test foreign key ON DELETE CASCADE',
            'owner_id' => $user->id,
            'status' => 'active',
            'priority' => 'medium',
            'budget' => 5000.00
        ]);

        $status = Status::first() ?? Status::create([
            'name' => 'Backlog',
            'slug' => 'backlog',
            'category' => 'backlog',
            'position' => 1,
            'color_hex' => '#94a3b8'
        ]);
        $priority = Priority::first() ?? Priority::create([
            'name' => 'Medium',
            'slug' => 'medium',
            'level' => 3,
            'color_hex' => '#eab308'
        ]);

        $task = Task::create([
            'project_id' => $project->id,
            'task_key' => $project->project_key . '-1',
            'title' => 'Task that will cascade delete',
            'status_id' => $status->id,
            'priority_id' => $priority->id,
            'type' => 'task',
            'creator_id' => $user->id
        ]);

        $comment = Comment::create([
            'task_id' => $task->id,
            'user_id' => $user->id,
            'content' => 'Test comment that must cascade delete'
        ]);

        $this->assertDatabaseHas('projects', ['id' => $project->id]);
        $this->assertDatabaseHas('tasks', ['id' => $task->id]);
        $this->assertDatabaseHas('comments', ['id' => $comment->id]);

        // Delete project
        $project->delete();

        // Verify ON DELETE CASCADE
        $this->assertDatabaseMissing('projects', ['id' => $project->id]);
        $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
        $this->assertDatabaseMissing('comments', ['id' => $comment->id]);
    }
}
