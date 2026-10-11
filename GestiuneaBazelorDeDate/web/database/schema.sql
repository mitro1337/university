-- =====================================================================
-- LINEARFLOW GBD: SCHEMA SQL COMPLETĂ ŞI REVIZUITĂ
-- Baza de date pentru sistemul de Project & Workflow Management
-- =====================================================================

CREATE DATABASE IF NOT EXISTS workflow_management CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE workflow_management;

-- Ştergere tabele vechi în ordinea corectă a dependenţelor
DROP TABLE IF EXISTS activity_logs;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS task_tag;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS priorities;
DROP TABLE IF EXISTS statuses;
DROP TABLE IF EXISTS project_members;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS role_permission;
DROP TABLE IF EXISTS permissions;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;

-- ---------------------------------------------------------------------
-- 1. TABELA ROLES (Roluri sistem)
-- ---------------------------------------------------------------------
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    slug VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB;

-- ---------------------------------------------------------------------
-- 2. TABELA PERMISSIONS (Permisiuni granulare)
-- ---------------------------------------------------------------------
CREATE TABLE permissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    module VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB;

-- ---------------------------------------------------------------------
-- 3. TABELA ROLE_PERMISSION (Relaţie Many-to-Many între Roluri şi Permisiuni)
-- ---------------------------------------------------------------------
CREATE TABLE role_permission (
    role_id INT NOT NULL,
    permission_id INT NOT NULL,
    PRIMARY KEY (role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
) ENGINE = InnoDB;

-- ---------------------------------------------------------------------
-- 4. TABELA USERS (Utilizatori ai platformei)
-- ---------------------------------------------------------------------
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255) NULL,
    title VARCHAR(100) DEFAULT 'Software Engineer',
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE RESTRICT
) ENGINE = InnoDB;

-- ---------------------------------------------------------------------
-- 5. TABELA PROJECTS (Proiecte)
-- ---------------------------------------------------------------------
CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_key VARCHAR(10) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    owner_id INT NOT NULL,
    status ENUM('planning', 'active', 'paused', 'completed') DEFAULT 'active',
    priority ENUM('low', 'medium', 'high', 'critical') DEFAULT 'medium',
    start_date DATE NULL,
    due_date DATE NULL,
    budget DECIMAL(12, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE RESTRICT
) ENGINE = InnoDB;

-- ---------------------------------------------------------------------
-- 6. TABELA PROJECT_MEMBERS (Membri asociaţi proiectelor)
-- ---------------------------------------------------------------------
CREATE TABLE project_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    user_id INT NOT NULL,
    project_role ENUM('lead', 'contributor', 'reviewer', 'viewer') DEFAULT 'contributor',
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_project_user (project_id, user_id),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE = InnoDB;

-- ---------------------------------------------------------------------
-- 7. TABELA STATUSES (Stări din fluxul de lucru Kanban)
-- ---------------------------------------------------------------------
CREATE TABLE statuses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    slug VARCHAR(50) NOT NULL UNIQUE,
    category ENUM('backlog', 'todo', 'in_progress', 'review', 'done') NOT NULL,
    color_hex VARCHAR(7) DEFAULT '#94a3b8',
    position INT DEFAULT 0,
    is_final BOOLEAN DEFAULT FALSE
) ENGINE = InnoDB;

-- ---------------------------------------------------------------------
-- 8. TABELA PRIORITIES (Niveluri de prioritate)
-- ---------------------------------------------------------------------
CREATE TABLE priorities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL UNIQUE,
    slug VARCHAR(30) NOT NULL UNIQUE,
    level INT NOT NULL UNIQUE,
    color_hex VARCHAR(7) NOT NULL,
    icon VARCHAR(30) DEFAULT 'flag'
) ENGINE = InnoDB;

-- ---------------------------------------------------------------------
-- 9. TABELA TAGS (Etichete/Labels)
-- ---------------------------------------------------------------------
CREATE TABLE tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    slug VARCHAR(50) NOT NULL UNIQUE,
    color_hex VARCHAR(7) NOT NULL
) ENGINE = InnoDB;

-- ---------------------------------------------------------------------
-- 10. TABELA TASKS (Taskuri / Issue-uri)
-- ---------------------------------------------------------------------
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_key VARCHAR(20) NOT NULL UNIQUE,
    project_id INT NOT NULL,
    status_id INT NOT NULL,
    priority_id INT NOT NULL,
    creator_id INT NOT NULL,
    assignee_id INT NULL,
    title VARCHAR(255) NOT NULL,
    description LONGTEXT,
    type ENUM('task', 'bug', 'feature', 'improvement') DEFAULT 'task',
    story_points INT DEFAULT 1,
    estimated_hours DECIMAL(6, 2) DEFAULT 0.00,
    logged_hours DECIMAL(6, 2) DEFAULT 0.00,
    due_date DATE NULL,
    completed_at TIMESTAMP NULL,
    position INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (status_id) REFERENCES statuses(id) ON DELETE RESTRICT,
    FOREIGN KEY (priority_id) REFERENCES priorities(id) ON DELETE RESTRICT,
    FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE RESTRICT,
    FOREIGN KEY (assignee_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_project_status (project_id, status_id),
    INDEX idx_assignee (assignee_id),
    INDEX idx_due_date (due_date)
) ENGINE = InnoDB;

-- ---------------------------------------------------------------------
-- 11. TABELA TASK_TAG (Relaţie Many-to-Many între Taskuri şi Etichete)
-- ---------------------------------------------------------------------
CREATE TABLE task_tag (
    task_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (task_id, tag_id),
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
) ENGINE = InnoDB;

-- ---------------------------------------------------------------------
-- 12. TABELA COMMENTS (Comentarii pe taskuri)
-- ---------------------------------------------------------------------
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_id INT NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_task_comments (task_id)
) ENGINE = InnoDB;

-- ---------------------------------------------------------------------
-- 13. TABELA ACTIVITY_LOGS (Istoric modificări şi audit trail)
-- ---------------------------------------------------------------------
CREATE TABLE activity_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_id INT NOT NULL,
    user_id INT NOT NULL,
    action VARCHAR(50) NOT NULL,
    field_name VARCHAR(50) NULL,
    old_value VARCHAR(255) NULL,
    new_value VARCHAR(255) NULL,
    description TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_task_audit (task_id)
) ENGINE = InnoDB;

-- ---------------------------------------------------------------------
-- 14. VEDERI (VIEWS) SQL PENTRU RAPORTARE ŞI STATISTICI
-- ---------------------------------------------------------------------

-- Vederea 1: Rezumatul complet al taskurilor cu toate entităţile asociate
CREATE OR REPLACE VIEW view_task_summary AS
SELECT 
    t.id AS task_id,
    t.task_key,
    t.title,
    t.type,
    t.story_points,
    t.due_date,
    p.id AS project_id,
    p.project_key,
    p.name AS project_name,
    s.name AS status_name,
    s.category AS status_category,
    s.color_hex AS status_color,
    pr.name AS priority_name,
    pr.level AS priority_level,
    pr.color_hex AS priority_color,
    u_assignee.id AS assignee_id,
    u_assignee.name AS assignee_name,
    u_creator.name AS creator_name,
    t.created_at,
    CASE 
        WHEN t.due_date IS NOT NULL AND t.due_date < CURDATE() AND s.is_final = FALSE THEN 1 
        ELSE 0 
    END AS is_overdue
FROM tasks t
JOIN projects p ON t.project_id = p.id
JOIN statuses s ON t.status_id = s.id
JOIN priorities pr ON t.priority_id = pr.id
JOIN users u_creator ON t.creator_id = u_creator.id
LEFT JOIN users u_assignee ON t.assignee_id = u_assignee.id;

-- Vederea 2: Viteza de progres (Velocity) şi statistici per proiect
CREATE OR REPLACE VIEW view_project_metrics AS
SELECT 
    p.id AS project_id,
    p.project_key,
    p.name AS project_name,
    p.status AS project_status,
    p.due_date,
    COUNT(t.id) AS total_tasks,
    SUM(CASE WHEN s.is_final = TRUE THEN 1 ELSE 0 END) AS completed_tasks,
    SUM(CASE WHEN s.is_final = FALSE THEN 1 ELSE 0 END) AS open_tasks,
    SUM(CASE WHEN t.due_date < CURDATE() AND s.is_final = FALSE THEN 1 ELSE 0 END) AS overdue_tasks,
    COALESCE(SUM(t.story_points), 0) AS total_points,
    COALESCE(SUM(CASE WHEN s.is_final = TRUE THEN t.story_points ELSE 0 END), 0) AS completed_points,
    ROUND(
        CASE 
            WHEN COUNT(t.id) = 0 THEN 0 
            ELSE (SUM(CASE WHEN s.is_final = TRUE THEN 1 ELSE 0 END) / COUNT(t.id)) * 100 
        END, 1
    ) AS progress_percentage
FROM projects p
LEFT JOIN tasks t ON p.id = t.project_id
LEFT JOIN statuses s ON t.status_id = s.id
GROUP BY p.id, p.project_key, p.name, p.status, p.due_date;

-- Vederea 3: Încărcarea echipei (Team Workload)
CREATE OR REPLACE VIEW view_team_workload AS
SELECT 
    u.id AS user_id,
    u.name AS user_name,
    u.title AS job_title,
    r.name AS role_name,
    COUNT(t.id) AS assigned_tasks,
    SUM(CASE WHEN s.is_final = FALSE THEN 1 ELSE 0 END) AS active_tasks,
    COALESCE(SUM(CASE WHEN s.is_final = FALSE THEN t.story_points ELSE 0 END), 0) AS active_story_points
FROM users u
JOIN roles r ON u.role_id = r.id
LEFT JOIN tasks t ON u.id = t.assignee_id
LEFT JOIN statuses s ON t.status_id = s.id
GROUP BY u.id, u.name, u.title, r.name;


-- =====================================================================
-- 15. DATE DE TEST ŞI DEMO COMPLETE (SEEDS)
-- =====================================================================

-- Inserare roluri
INSERT INTO roles (id, name, slug, description) VALUES
(1, 'Administrator', 'admin', 'Acces complet la toate modulele, setările şi rapoartele'),
(2, 'Project Manager', 'pm', 'Poate crea şi gestiona proiecte, taskuri şi membri de echipă'),
(3, 'Developer', 'dev', 'Poate prelua, actualiza şi comenta taskuri'),
(4, 'QA Tester', 'qa', 'Testează funcţionalităţile şi raportează bug-uri'),
(5, 'Viewer', 'viewer', 'Acces doar de citire asupra proiectelor şi rapoartelor');

-- Inserare utilizatori (parola este 'password' hashuită cu bcrypt / sha256)
INSERT INTO users (id, role_id, name, email, password, title, status) VALUES
(1, 1, 'Ştefan Administrator', 'admin@linearflow.local', '$2y$12$eA.X/F10G.gUu4FzV9v8g.9jR8R8o3Jp.LwF4.P5f9Uo1a9jC.1Ge', 'Lead Architect & Admin', 'active'),
(2, 2, 'Elena Proiectescu', 'elena@linearflow.local', '$2y$12$eA.X/F10G.gUu4FzV9v8g.9jR8R8o3Jp.LwF4.P5f9Uo1a9jC.1Ge', 'Senior Project Manager', 'active'),
(3, 3, 'Mihai Codreanu', 'mihai@linearflow.local', '$2y$12$eA.X/F10G.gUu4FzV9v8g.9jR8R8o3Jp.LwF4.P5f9Uo1a9jC.1Ge', 'Full Stack Developer', 'active'),
(4, 3, 'Andreea Vasile', 'andreea@linearflow.local', '$2y$12$eA.X/F10G.gUu4FzV9v8g.9jR8R8o3Jp.LwF4.P5f9Uo1a9jC.1Ge', 'Frontend Engineer', 'active'),
(5, 4, 'Radu Testovici', 'radu@linearflow.local', '$2y$12$eA.X/F10G.gUu4FzV9v8g.9jR8R8o3Jp.LwF4.P5f9Uo1a9jC.1Ge', 'QA Automation Engineer', 'active');

-- Inserare stări flux Kanban
INSERT INTO statuses (id, name, slug, category, color_hex, position, is_final) VALUES
(1, 'Backlog', 'backlog', 'backlog', '#64748b', 1, FALSE),
(2, 'To Do', 'todo', 'todo', '#3b82f6', 2, FALSE),
(3, 'In Progress', 'in-progress', 'in_progress', '#f59e0b', 3, FALSE),
(4, 'Code Review', 'code-review', 'review', '#8b5cf6', 4, FALSE),
(5, 'Testing / QA', 'qa-testing', 'review', '#ec4899', 5, FALSE),
(6, 'Done', 'done', 'done', '#10b981', 6, TRUE);

-- Inserare priorităţi
INSERT INTO priorities (id, name, slug, level, color_hex, icon) VALUES
(1, 'Low', 'low', 1, '#94a3b8', 'arrow-down'),
(2, 'Medium', 'medium', 2, '#3b82f6', 'minus'),
(3, 'High', 'high', 3, '#f97316', 'arrow-up'),
(4, 'Urgent', 'urgent', 4, '#ef4444', 'alert-circle');

-- Inserare etichete (Tags)
INSERT INTO tags (id, name, slug, color_hex) VALUES
(1, 'Backend', 'backend', '#3b82f6'),
(2, 'Frontend', 'frontend', '#ec4899'),
(3, 'Database', 'database', '#10b981'),
(4, 'Security', 'security', '#ef4444'),
(5, 'Bug', 'bug', '#dc2626'),
(6, 'UI/UX', 'ui-ux', '#8b5cf6'),
(7, 'DevOps', 'devops', '#f59e0b');

-- Inserare proiecte
INSERT INTO projects (id, project_key, name, description, owner_id, status, priority, start_date, due_date, budget) VALUES
(1, 'GBD', 'Platforma Gestionare Baze de Date', 'Proiect semestrial pentru Gestiunea Bazelor de Date: arhitectură relaţională, integritate şi proceduri stocate.', 1, 'active', 'high', '2026-10-01', '2026-11-15', 12500.00),
(2, 'ECOMM', 'Vexera Storefront & API', 'Platformă modernă de comerţ electronic cu inventar în timp real, plăţi securizate şi căutare inteligentă.', 2, 'active', 'critical', '2026-09-15', '2026-12-20', 45000.00),
(3, 'CLOUD', 'Migrare Infrastructură Kubernetes', 'Orchestrarea containerelor şi configurarea canalelor CI/CD automate pentru scalabilitate înaltă.', 1, 'planning', 'medium', '2026-11-01', '2027-02-28', 28000.00);

-- Inserare membri pe proiecte
INSERT INTO project_members (project_id, user_id, project_role) VALUES
(1, 1, 'lead'),
(1, 2, 'contributor'),
(1, 3, 'contributor'),
(1, 4, 'contributor'),
(2, 2, 'lead'),
(2, 3, 'contributor'),
(2, 4, 'contributor'),
(2, 5, 'reviewer'),
(3, 1, 'lead'),
(3, 3, 'contributor');

-- Inserare taskuri
INSERT INTO tasks (id, task_key, project_id, status_id, priority_id, creator_id, assignee_id, title, description, type, story_points, estimated_hours, logged_hours, due_date, completed_at, position) VALUES
(1, 'GBD-1', 1, 6, 3, 1, 3, 'Design schemă relaţională şi constrângeri FK', 'Definirea tabelelor, cheilor primare şi secundare cu integritate referenţială strictă (CASCADE / RESTRICT).', 'feature', 5, 8.0, 7.5, '2026-10-05', '2026-10-05 16:30:00', 1),
(2, 'GBD-2', 1, 3, 4, 1, 3, 'Optimizare interogări agregate şi indexare compusă', 'Adăugare indecşi B-Tree pe coloanele utilizate frecvent în filtrare şi clauze JOIN pentru timpi < 50ms.', 'task', 3, 6.0, 4.0, '2026-10-18', NULL, 1),
(3, 'GBD-3', 1, 2, 2, 2, 4, 'Integrare panou Kanban şi carduri interactive', 'Construirea componentelor Blade cu Tailwind CSS pentru vizualizarea stadiilor de lucru în stilul Linear.', 'feature', 5, 12.0, 0.0, '2026-10-22', NULL, 1),
(4, 'GBD-4', 1, 4, 3, 2, 3, 'Audit trail şi trigger pentru istoric modificări', 'Salvare automată în tabela activity_logs la modificarea stării sau a priorităţii fiecărui task.', 'improvement', 2, 4.0, 3.5, '2026-10-14', NULL, 1),
(5, 'GBD-5', 1, 1, 1, 1, NULL, 'Documentaţie tehnică şi export rapoarte SQL', 'Generare raport de performanţă şi descrierea structurii relaţionale a platformei.', 'task', 1, 3.0, 0.0, '2026-11-05', NULL, 1),

(6, 'ECOMM-1', 2, 6, 4, 2, 3, 'Integrare gateway de plăţi Stripe & Webhooks', 'Tranzacţii atomice cu ACID compliance pentru prevenirea dublei încasări şi reconciliere automată.', 'feature', 8, 16.0, 15.0, '2026-10-08', '2026-10-08 18:00:00', 2),
(7, 'ECOMM-2', 2, 5, 4, 2, 5, 'Testare regresie checkout şi flux stocuri concurente', 'Scenarii de simulare a mii de comenzi concurente pe produse cu stoc limitat (Row-level locking).', 'bug', 5, 10.0, 8.0, '2026-10-15', NULL, 1),
(8, 'ECOMM-3', 2, 3, 2, 2, 4, 'Filtrare avansată produse cu preţ şi categorii', 'Interfaţă reactivă cu faţete dinamice şi căutare instantanee.', 'improvement', 3, 6.0, 3.0, '2026-10-25', NULL, 2);

-- Asociere etichete pe taskuri (task_tag)
INSERT INTO task_tag (task_id, tag_id) VALUES
(1, 1), (1, 3),
(2, 1), (2, 3),
(3, 2), (3, 6),
(4, 1), (4, 4),
(5, 6),
(6, 1), (6, 4),
(7, 5), (7, 4),
(8, 2), (8, 6);

-- Inserare comentarii de probă
INSERT INTO comments (task_id, user_id, content) VALUES
(1, 3, 'Am implementat toate constrângerile de cheie străină. Am testat ştergerea în cascadă pe proiecte şi funcţionează perfect.'),
(1, 1, 'Excelent, asigură-te că adăugăm şi vederi pentru rapoartele agregate din dashboard.'),
(2, 3, 'Am măsurat timpii de răspuns: interogarea pe view_task_summary rulează acum în 12ms cu noii indecşi.'),
(7, 5, 'Am găsit un caz limită când doi utilizatori finalizează comanda în aceeaşi milisecundă. Propunem SELECT ... FOR UPDATE.');

-- Inserare audit trail (activity_logs)
INSERT INTO activity_logs (task_id, user_id, action, field_name, old_value, new_value, description) VALUES
(1, 1, 'created', NULL, NULL, NULL, 'Task creat şi atribuit lui Mihai Codreanu'),
(1, 3, 'status_changed', 'status_id', 'Backlog', 'In Progress', 'Mihai a trecut taskul în lucru'),
(1, 3, 'status_changed', 'status_id', 'In Progress', 'Done', 'Task finalizat cu succes'),
(2, 1, 'priority_updated', 'priority_id', 'High', 'Urgent', 'Prioritatea a fost ridicată la Urgent'),
(2, 3, 'status_changed', 'status_id', 'To Do', 'In Progress', 'Preluat în lucru de dezvoltator');
