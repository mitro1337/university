<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Task;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function store(Request $request, Task $task)
    {
        $request->validate([
            'content' => 'required|string|max:3000',
        ]);

        $userId = Auth::id() ?? 1;

        $comment = Comment::create([
            'task_id' => $task->id,
            'user_id' => $userId,
            'content' => $request->content,
        ]);

        ActivityLog::create([
            'task_id' => $task->id,
            'user_id' => $userId,
            'action' => 'comment_added',
            'description' => 'A adăugat un nou comentariu',
        ]);

        return redirect()->route('tasks.show', $task)->with('success', 'Comentariul a fost adăugat!');
    }

    public function destroy(Comment $comment)
    {
        $taskId = $comment->task_id;
        $comment->delete();

        return redirect()->route('tasks.show', $taskId)->with('success', 'Comentariul a fost şters.');
    }
}
