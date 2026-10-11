<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\Role;
use App\Models\User;
use App\Models\Status;
use App\Models\Priority;
use App\Models\Tag;
use App\Models\Project;
use App\Models\Task;
use App\Models\Comment;
use App\Models\ActivityLog;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Roluri
        $adminRole = Role::create([
            'name' => 'Administrator',
            'slug' => 'admin',
            'description' => 'Acces complet la toate modulele, setările şi rapoartele platformei',
        ]);

        $pmRole = Role::create([
            'name' => 'Project Manager',
            'slug' => 'pm',
            'description' => 'Poate crea şi gestiona proiecte, sprint-uri şi alocări de resurse',
        ]);

        $devRole = Role::create([
            'name' => 'Developer',
            'slug' => 'dev',
            'description' => 'Implementează taskuri, rezolvă bug-uri şi actualizează stadiile de lucru',
        ]);

        $qaRole = Role::create([
            'name' => 'QA Tester',
            'slug' => 'qa',
            'description' => 'Verifică cerinţele de calitate şi raportează defectele identificate',
        ]);

        $viewerRole = Role::create([
            'name' => 'Viewer',
            'slug' => 'viewer',
            'description' => 'Acces doar de vizualizare a rapoartelor şi dashboard-ului',
        ]);

        // 2. Utilizatori
        $admin = User::create([
            'name' => 'Ştefan Administrator',
            'email' => 'admin@workflow.local',
            'password' => Hash::make('password'),
            'role_id' => $adminRole->id,
            'title' => 'Lead Software Architect',
            'status' => 'active',
        ]);

        $pm = User::create([
            'name' => 'Elena Proiectescu',
            'email' => 'elena@workflow.local',
            'password' => Hash::make('password'),
            'role_id' => $pmRole->id,
            'title' => 'Senior Project Manager',
            'status' => 'active',
        ]);

        $dev1 = User::create([
            'name' => 'Mihai Codreanu',
            'email' => 'mihai@workflow.local',
            'password' => Hash::make('password'),
            'role_id' => $devRole->id,
            'title' => 'Full Stack Engineer',
            'status' => 'active',
        ]);

        $dev2 = User::create([
            'name' => 'Andreea Vasile',
            'email' => 'andreea@workflow.local',
            'password' => Hash::make('password'),
            'role_id' => $devRole->id,
            'title' => 'Frontend UI/UX Developer',
            'status' => 'active',
        ]);

        $qa = User::create([
            'name' => 'Radu Testovici',
            'email' => 'radu@workflow.local',
            'password' => Hash::make('password'),
            'role_id' => $qaRole->id,
            'title' => 'QA Automation Specialist',
            'status' => 'active',
        ]);

        // 3. Stări Kanban
        $sBacklog = Status::create(['name' => 'Backlog', 'slug' => 'backlog', 'category' => 'backlog', 'color_hex' => '#64748b', 'position' => 1, 'is_final' => false]);
        $sTodo = Status::create(['name' => 'To Do', 'slug' => 'todo', 'category' => 'todo', 'color_hex' => '#3b82f6', 'position' => 2, 'is_final' => false]);
        $sInProgress = Status::create(['name' => 'In Progress', 'slug' => 'in-progress', 'category' => 'in_progress', 'color_hex' => '#f59e0b', 'position' => 3, 'is_final' => false]);
        $sReview = Status::create(['name' => 'Code Review', 'slug' => 'code-review', 'category' => 'review', 'color_hex' => '#8b5cf6', 'position' => 4, 'is_final' => false]);
        $sQA = Status::create(['name' => 'Testing / QA', 'slug' => 'qa-testing', 'category' => 'review', 'color_hex' => '#ec4899', 'position' => 5, 'is_final' => false]);
        $sDone = Status::create(['name' => 'Done', 'slug' => 'done', 'category' => 'done', 'color_hex' => '#10b981', 'position' => 6, 'is_final' => true]);

        // 4. Priorităţi
        $pLow = Priority::create(['name' => 'Low', 'slug' => 'low', 'level' => 1, 'color_hex' => '#94a3b8', 'icon' => 'arrow-down']);
        $pMed = Priority::create(['name' => 'Medium', 'slug' => 'medium', 'level' => 2, 'color_hex' => '#3b82f6', 'icon' => 'minus']);
        $pHigh = Priority::create(['name' => 'High', 'slug' => 'high', 'level' => 3, 'color_hex' => '#f97316', 'icon' => 'arrow-up']);
        $pUrg = Priority::create(['name' => 'Urgent', 'slug' => 'urgent', 'level' => 4, 'color_hex' => '#ef4444', 'icon' => 'alert-circle']);

        // 5. Etichete
        $tagBack = Tag::create(['name' => 'Backend', 'slug' => 'backend', 'color_hex' => '#3b82f6']);
        $tagFront = Tag::create(['name' => 'Frontend', 'slug' => 'frontend', 'color_hex' => '#ec4899']);
        $tagDB = Tag::create(['name' => 'Database', 'slug' => 'database', 'color_hex' => '#10b981']);
        $tagSec = Tag::create(['name' => 'Security', 'slug' => 'security', 'color_hex' => '#ef4444']);
        $tagBug = Tag::create(['name' => 'Bug', 'slug' => 'bug', 'color_hex' => '#dc2626']);
        $tagUI = Tag::create(['name' => 'UI/UX', 'slug' => 'ui-ux', 'color_hex' => '#8b5cf6']);
        $tagDevOps = Tag::create(['name' => 'DevOps', 'slug' => 'devops', 'color_hex' => '#f59e0b']);

        // 6. Proiecte
        $p1 = Project::create([
            'project_key' => 'GBD',
            'name' => 'Platforma Gestiunea Bazelor de Date',
            'description' => 'Sistem integrat de gestionare a proiectelor cu arhitectură relaţională normalizată, integritate referenţială şi vederi agregate.',
            'owner_id' => $admin->id,
            'status' => 'active',
            'priority' => 'high',
            'start_date' => now()->subDays(10),
            'due_date' => now()->addDays(35),
            'budget' => 12500.00,
        ]);
        $p1->members()->attach([$admin->id => ['project_role' => 'lead'], $dev1->id => ['project_role' => 'contributor'], $dev2->id => ['project_role' => 'contributor']]);

        $p2 = Project::create([
            'project_key' => 'ECOMM',
            'name' => 'Vexera Storefront & API',
            'description' => 'Platformă de comerţ electronic de înaltă performanţă cu microservicii şi checkout în timp real.',
            'owner_id' => $pm->id,
            'status' => 'active',
            'priority' => 'critical',
            'start_date' => now()->subDays(25),
            'due_date' => now()->addDays(60),
            'budget' => 45000.00,
        ]);
        $p2->members()->attach([$pm->id => ['project_role' => 'lead'], $dev1->id => ['project_role' => 'contributor'], $dev2->id => ['project_role' => 'contributor'], $qa->id => ['project_role' => 'reviewer']]);

        // 7. Taskuri demonstrative
        $t1 = Task::create([
            'task_key' => 'GBD-1',
            'project_id' => $p1->id,
            'status_id' => $sDone->id,
            'priority_id' => $pHigh->id,
            'creator_id' => $admin->id,
            'assignee_id' => $dev1->id,
            'title' => 'Design schemă relaţională şi constrângeri FK',
            'description' => 'Definirea tabelelor cu constrângeri cheie primare şi secundare cu integritate referenţială strictă (ON DELETE CASCADE/RESTRICT).',
            'type' => 'feature',
            'story_points' => 5,
            'estimated_hours' => 8.0,
            'logged_hours' => 7.5,
            'due_date' => now()->subDays(5),
            'completed_at' => now()->subDays(5),
            'position' => 1,
        ]);
        $t1->tags()->sync([$tagBack->id, $tagDB->id]);

        $t2 = Task::create([
            'task_key' => 'GBD-2',
            'project_id' => $p1->id,
            'status_id' => $sInProgress->id,
            'priority_id' => $pUrg->id,
            'creator_id' => $admin->id,
            'assignee_id' => $dev1->id,
            'title' => 'Optimizare interogări agregate şi indexare B-Tree',
            'description' => 'Adăugare indecşi compuşi pe coloanele utilizate frecvent în căutări şi clauze JOIN pentru optimizarea timpilor sub 50ms.',
            'type' => 'task',
            'story_points' => 3,
            'estimated_hours' => 6.0,
            'logged_hours' => 4.0,
            'due_date' => now()->addDays(7),
            'position' => 1,
        ]);
        $t2->tags()->sync([$tagBack->id, $tagDB->id]);

        $t3 = Task::create([
            'task_key' => 'GBD-3',
            'project_id' => $p1->id,
            'status_id' => $sTodo->id,
            'priority_id' => $pMed->id,
            'creator_id' => $pm->id,
            'assignee_id' => $dev2->id,
            'title' => 'Integrare panou Kanban şi carduri interactive',
            'description' => 'Construirea interfeţei Blade cu componente reactive şi Tailwind CSS pentru fluxuri de lucru în panoul Kanban.',
            'type' => 'feature',
            'story_points' => 5,
            'estimated_hours' => 12.0,
            'logged_hours' => 0.0,
            'due_date' => now()->addDays(11),
            'position' => 1,
        ]);
        $t3->tags()->sync([$tagFront->id, $tagUI->id]);

        // 8. Comentarii
        Comment::create([
            'task_id' => $t1->id,
            'user_id' => $dev1->id,
            'content' => 'Am testat toate scenariile de constrângere referenţială în MySQL Workbench, funcţionează conform specificaţiilor.',
        ]);

        // 9. Audit Activity Logs
        ActivityLog::create([
            'task_id' => $t1->id,
            'user_id' => $admin->id,
            'action' => 'created',
            'description' => 'Task creat cu cheia GBD-1',
        ]);
        ActivityLog::create([
            'task_id' => $t1->id,
            'user_id' => $dev1->id,
            'action' => 'status_changed',
            'field_name' => 'status_id',
            'old_value' => 'In Progress',
            'new_value' => 'Done',
            'description' => 'Mihai a marcat taskul ca finalizat',
        ]);
    }
}
