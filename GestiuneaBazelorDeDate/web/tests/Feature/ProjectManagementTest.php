<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Role;
use App\Models\Project;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ProjectManagementTest extends TestCase
{
    use DatabaseTransactions;

    protected $user;

    protected function setUp(): void
    {
        parent::setUp();

        $role = Role::firstOrCreate(
            ['slug' => 'admin'],
            ['name' => 'Administrator', 'description' => 'Superuser']
        );

        $this->user = User::firstOrCreate(
            ['email' => 'ci-tester@workflow.local'],
            [
                'name' => 'CI Test Admin',
                'password' => bcrypt('password123'),
                'role_id' => $role->id,
                'title' => 'CI Automation Engineer',
                'status' => 'active',
            ]
        );
    }

    public function test_login_page_loads_successfully(): void
    {
        $response = $this->get('/login');
        $response->assertStatus(200);
    }

    public function test_dashboard_page_loads_successfully(): void
    {
        $response = $this->actingAs($this->user)->get('/dashboard');
        $response->assertStatus(200);
    }

    public function test_projects_page_loads_successfully(): void
    {
        $response = $this->actingAs($this->user)->get('/projects');
        $response->assertStatus(200);
    }

    public function test_tasks_page_loads_successfully(): void
    {
        $response = $this->actingAs($this->user)->get('/tasks');
        $response->assertStatus(200);
    }

    public function test_teams_page_loads_successfully(): void
    {
        $response = $this->actingAs($this->user)->get('/teams');
        $response->assertStatus(200);
    }

    public function test_reports_page_loads_successfully(): void
    {
        $response = $this->actingAs($this->user)->get('/reports');
        $response->assertStatus(200);
    }

    public function test_locale_switcher(): void
    {
        $responseRo = $this->from('/dashboard')->get('/locale/ro');
        $responseRo->assertRedirect('/dashboard');
        $responseRo->assertSessionHas('locale', 'ro');

        $responseEn = $this->from('/dashboard')->get('/locale/en');
        $responseEn->assertRedirect('/dashboard');
        $responseEn->assertSessionHas('locale', 'en');
    }

    public function test_can_create_project_and_store_in_mysql(): void
    {
        $payload = [
            'project_key' => 'CI' . rand(10, 99),
            'name' => 'Automated CI Test Project',
            'description' => 'Project created during automated MySQL CI pipeline run.',
            'owner_id' => $this->user->id,
            'status' => 'active',
            'priority' => 'high',
            'start_date' => now()->toDateString(),
            'due_date' => now()->addDays(30)->toDateString(),
            'budget' => 15000.00
        ];

        $response = $this->actingAs($this->user)->post('/projects', $payload);
        $response->assertRedirect('/projects');

        $this->assertDatabaseHas('projects', [
            'project_key' => $payload['project_key'],
            'name' => $payload['name']
        ]);
    }
}
