-- =====================================================================
-- LABORATOR 2: EXEMPLE PRACTICE GRANT ŞI REVOKE (FRED ŞI PAUL)
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. Configurarea unui administrator: Fred
-- ---------------------------------------------------------------------
-- Acordă toate privilegiile globale cu drept de delegare:
GRANT ALL ON *.* TO fred IDENTIFIED BY 'fred123' WITH GRANT OPTION;

-- Verificăm privilegiile alocate lui Fred:
SHOW GRANTS FOR fred;

-- Retragerea tuturor privilegiilor şi a opţiunii de grant pentru Fred:
REVOKE ALL PRIVILEGES, GRANT OPTION FROM fred;

-- Verificăm din nou:
SHOW GRANTS FOR fred;


-- ---------------------------------------------------------------------
-- 2. Configurarea unui utilizator obişnuit: Paul
-- ---------------------------------------------------------------------
-- Pasul 2.1: Creăm utilizatorul Paul fără privilegii de lucru (doar USAGE pe carti.*)
GRANT USAGE ON carti.* TO paul IDENTIFIED BY 'paul123';

-- Verificare privilegii iniţiale:
SHOW GRANTS FOR paul;

-- Pasul 2.2: Acordare privilegii de manipulare şi administrare pe baza de date carti:
GRANT SELECT, INSERT, UPDATE, DELETE, INDEX, ALTER, CREATE, DROP ON carti.* TO paul;

-- Verificare privilegii după acordare:
SHOW GRANTS FOR paul;

-- Pasul 2.3: Reducerea privilegiilor lui Paul (eliminăm ALTER, CREATE, DROP):
REVOKE ALTER, CREATE, DROP ON carti.* FROM paul;

-- Verificare privilegii modificate (ar trebui să rămână doar SELECT, INSERT, UPDATE, DELETE, INDEX):
SHOW GRANTS FOR paul;

-- Pasul 2.4: Anularea tuturor privilegiilor pe baza de date carti:
REVOKE ALL ON carti.* FROM paul;

-- Verificare finală:
SHOW GRANTS FOR paul;

FLUSH PRIVILEGES;
