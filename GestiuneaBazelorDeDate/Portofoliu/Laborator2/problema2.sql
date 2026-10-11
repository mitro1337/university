-- =====================================================================
-- LABORATOR 2: PROBLEMA REZOLVATĂ 2
-- Scenarii diverse de configurare şi administrare utilizatori
-- =====================================================================

-- 1. Utilizatorul Ion: Drepturi complete pe întreaga bază de date 'carti'
GRANT ALL ON carti.* TO ion@localhost IDENTIFIED BY 'parola1';

-- 2. Utilizatorul Adi: Poate citi, adăuga şi modifica date în tabela 'carti'
GRANT SELECT, UPDATE, INSERT ON carti.carti TO adi@localhost IDENTIFIED BY 'parola2';

-- 3. Utilizatorul Monica: Drept de citire integral şi actualizare restricţionată
-- doar pe coloanele 'autor' şi 'titlu' din tabela 'carti'
GRANT SELECT, UPDATE(autor, titlu) ON carti.carti TO monica@localhost IDENTIFIED BY 'Mel12068';

-- 4. Utilizatorul Maria: Drepturi depline de administrator asupra întregului server MySQL
GRANT ALL ON *.* TO maria@localhost IDENTIFIED BY 'xxx456';

-- 5. Utilizatorul Cosmin: Creare cont şi revocare privilegiu SHUTDOWN
GRANT USAGE, SHUTDOWN ON *.* TO cosmin@localhost IDENTIFIED BY 'cosmin_pass';
-- Revocarea dreptului de oprire a serverului:
REVOKE SHUTDOWN ON *.* FROM cosmin@localhost;

-- 6. Ştergerea unui utilizator:
-- Metoda manuală prezentată în laborator (modificare directă în catalogul intern):
-- DELETE FROM mysql.user WHERE user='cosmin' AND host='localhost';
-- Metoda modernă şi sigură SQL:
-- DROP USER IF EXISTS 'cosmin'@'localhost';

-- 7. Reîncărcarea tabelelor interne de privilegii în memorie:
-- Necesită apelare ori de câte ori se fac modificări directe prin comenzi DML (INSERT/UPDATE/DELETE)
-- asupra tabelelor din baza de date 'mysql':
FLUSH PRIVILEGES;

-- 8. Verificarea drepturilor alocate pentru fiecare utilizator:
SHOW GRANTS FOR ion@localhost;
SHOW GRANTS FOR adi@localhost;
SHOW GRANTS FOR monica@localhost;
SHOW GRANTS FOR maria@localhost;
SHOW GRANTS FOR cosmin@localhost;
