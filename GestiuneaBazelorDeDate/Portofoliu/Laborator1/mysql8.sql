-- =====================================================================
-- LABORATOR 1: VARIANTA PENTRU MYSQL 8.0+ / MEDII MODERNE
-- =====================================================================
-- Notă importantă:
-- În versiunile mai vechi de MySQL (5.5, 5.6, 5.7), crearea unui utilizator
-- şi alocarea parolei se putea face direct în comanda GRANT folosind "IDENTIFIED BY".
-- Începând cu MySQL 8.0, clauza "IDENTIFIED BY" în comanda GRANT a fost eliminată.
-- Utilizatorii trebuie creaţi mai întâi cu "CREATE USER", iar apoi li se acordă drepturi cu "GRANT".

-- EXERCIŢIUL 1 (versiunea MySQL 8+):
CREATE USER IF NOT EXISTS 'monty'@'localhost' IDENTIFIED BY 'some_pass';
GRANT ALL PRIVILEGES ON *.* TO 'monty'@'localhost' WITH GRANT OPTION;

CREATE USER IF NOT EXISTS 'monty'@'%' IDENTIFIED BY 'some_pass';
GRANT ALL PRIVILEGES ON *.* TO 'monty'@'%' WITH GRANT OPTION;

CREATE USER IF NOT EXISTS 'admin'@'localhost' IDENTIFIED BY 'admin_pass';
GRANT RELOAD, PROCESS ON *.* TO 'admin'@'localhost';

CREATE USER IF NOT EXISTS 'dummy'@'localhost' IDENTIFIED BY 'dummy_pass';
GRANT USAGE ON *.* TO 'dummy'@'localhost';


-- EXERCIŢIUL 2 (versiunea MySQL 8+):
-- 1. Creare utilizatori:
CREATE USER IF NOT EXISTS 'manager_1'@'localhost' IDENTIFIED BY 'pass_manager1';
CREATE USER IF NOT EXISTS 'manager_2'@'localhost' IDENTIFIED BY 'pass_manager2';

-- 2. Acordare privilegii SELECT, INSERT, DELETE pe tabela EMPLOYEES:
GRANT SELECT, INSERT, DELETE ON companii.EMPLOYEES TO 'manager_1'@'localhost';
GRANT SELECT, INSERT, DELETE ON companii.EMPLOYEES TO 'manager_2'@'localhost';

-- Alternativ pe amândoi simultan:
-- GRANT SELECT, INSERT, DELETE ON companii.EMPLOYEES TO 'manager_1'@'localhost', 'manager_2'@'localhost';


-- EXERCIŢIUL 3 (versiunea MySQL 8+):
-- 1. Creare utilizator clerk_127 şi acordare drepturi:
CREATE USER IF NOT EXISTS 'clerk_127'@'localhost' IDENTIFIED BY 'pass_clerk127';
GRANT SELECT, INSERT, DELETE, UPDATE ON companii.MOVIE TO 'clerk_127'@'localhost';

-- 2. Revocare privilegii SELECT, INSERT, DELETE pe tabela MOVIE:
REVOKE SELECT, INSERT, DELETE ON companii.MOVIE FROM 'clerk_127'@'localhost';

-- Verificare:
SHOW GRANTS FOR 'clerk_127'@'localhost';

FLUSH PRIVILEGES;
