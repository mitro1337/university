<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('statuses', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50);
            $table->string('slug', 50)->unique();
            $table->enum('category', ['backlog', 'todo', 'in_progress', 'review', 'done']);
            $table->string('color_hex', 7)->default('#94a3b8');
            $table->integer('position')->default(0);
            $table->boolean('is_final')->default(false);
        });

        Schema::create('priorities', function (Blueprint $table) {
            $table->id();
            $table->string('name', 30)->unique();
            $table->string('slug', 30)->unique();
            $table->integer('level')->unique();
            $table->string('color_hex', 7);
            $table->string('icon', 30)->default('flag');
        });

        Schema::create('tags', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50)->unique();
            $table->string('slug', 50)->unique();
            $table->string('color_hex', 7);
        });

        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('task_key', 20)->unique();
            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->foreignId('status_id')->constrained('statuses')->restrictOnDelete();
            $table->foreignId('priority_id')->constrained('priorities')->restrictOnDelete();
            $table->foreignId('creator_id')->constrained('users')->restrictOnDelete();
            $table->foreignId('assignee_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('title', 255);
            $table->longText('description')->nullable();
            $table->enum('type', ['task', 'bug', 'feature', 'improvement'])->default('task');
            $table->integer('story_points')->default(1);
            $table->decimal('estimated_hours', 6, 2)->default(0.00);
            $table->decimal('logged_hours', 6, 2)->default(0.00);
            $table->date('due_date')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->integer('position')->default(0);
            $table->timestamps();

            $table->index(['project_id', 'status_id']);
            $table->index('assignee_id');
            $table->index('due_date');
        });

        Schema::create('task_tag', function (Blueprint $table) {
            $table->foreignId('task_id')->constrained()->cascadeOnDelete();
            $table->foreignId('tag_id')->constrained()->cascadeOnDelete();
            $table->primary(['task_id', 'tag_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('task_tag');
        Schema::dropIfExists('tasks');
        Schema::dropIfExists('tags');
        Schema::dropIfExists('priorities');
        Schema::dropIfExists('statuses');
    }
};
