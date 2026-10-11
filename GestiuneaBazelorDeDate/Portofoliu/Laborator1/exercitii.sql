-- =====================================================================
-- LABORATOR 1: REZOLVAREA EXERCIŢIILOR PROPUSE
-- =====================================================================

-- ---------------------------------------------------------------------
-- EXERCIŢIUL 1:
-- Implementaţi instrucţiunile SQL de mai jos şi explicaţi care este efectul lor.
-- ---------------------------------------------------------------------

-- a) Creează utilizatorul 'monty' ce se poate conecta exclusiv de pe 'localhost' (maşina locală),
--    cu parola 'some_pass', şi îi acordă TOATE privilegiile pe TOATE bazele de date şi tabelele (*.*),
--    inclusiv permisiunea de a transmite aceste drepturi şi altor utilizatori (WITH GRANT OPTION).
GRANT ALL PRIVILEGES ON *.* TO 'monty'@'localhost'
IDENTIFIED BY 'some_pass' WITH GRANT OPTION;

-- b) Creează utilizatorul 'monty' ce se poate conecta de la ORICE gazdă/IP (wildcard '%'),
--    cu parola 'some_pass', şi îi acordă de asemenea toate privilegiile globale cu drept de delegare.
GRANT ALL PRIVILEGES ON *.* TO 'monty'@'%'
IDENTIFIED BY 'some_pass' WITH GRANT OPTION;

-- c) Acordă utilizatorului 'admin'@'localhost' privilegii la nivel administrativ:
--    - RELOAD: permite executarea comenzilor FLUSH (ex: FLUSH PRIVILEGES, FLUSH TABLES, FLUSH LOGS);
--    - PROCESS: permite vizualizarea listei complete de conexiuni/fire de execuţie (SHOW PROCESSLIST)
--      aparţinând tuturor utilizatorilor serverului.
GRANT RELOAD, PROCESS ON *.* TO 'admin'@'localhost';

-- d) Creează contul 'dummy'@'localhost' fără niciun privilegiu efectiv de manipulare a datelor (USAGE = fãrã drepturi),
--    dar permiţându-i doar autentificarea pe serverul MySQL (sau actualizarea contului existent fără a-i modifica privilegiile).
GRANT USAGE ON *.* TO 'dummy'@'localhost';


-- ---------------------------------------------------------------------
-- EXERCIŢIUL 2:
-- Scrieţi instrucţiunea SQL pentru a acorda utilizatorilor manager_1 şi manager_2
-- privilegiile SELECT, INSERT şi DELETE pentru rândurile din tabelul EMPLOYEES.
-- Dacă vreţi să testaţi instrucţiunea, la început va trebui să creaţi utilizatorii manager_1 şi manager_2.
-- ---------------------------------------------------------------------

-- Pasul 2.1: Crearea utilizatorilor (dacă se foloseşte sintaxa tradiţională sau dacă nu există deja)
-- În MySQL clasic, GRANT creează automat contul dacă este specificat IDENTIFIED BY:
GRANT USAGE ON *.* TO 'manager_1'@'localhost' IDENTIFIED BY 'pass_manager1';
GRANT USAGE ON *.* TO 'manager_2'@'localhost' IDENTIFIED BY 'pass_manager2';

-- Pasul 2.2: Acordarea privilegiilor cerute pe tabelul EMPLOYEES din baza de date companii:
GRANT SELECT, INSERT, DELETE ON companii.EMPLOYEES TO 'manager_1'@'localhost';
GRANT SELECT, INSERT, DELETE ON companii.EMPLOYEES TO 'manager_2'@'localhost';

-- Alternativ, dacă dorim într-o singură instrucţiune:
-- GRANT SELECT, INSERT, DELETE ON companii.EMPLOYEES TO 'manager_1'@'localhost', 'manager_2'@'localhost';

-- Verificare privilegii:
SHOW GRANTS FOR 'manager_1'@'localhost';
SHOW GRANTS FOR 'manager_2'@'localhost';


-- ---------------------------------------------------------------------
-- EXERCIŢIUL 3:
-- Scrieţi instrucţiunea SQL pentru a anula privilegiile SELECT, INSERT şi DELETE
-- ale utilizatorului clerk_127 la tabelul MOVIE. Dacă vreţi să testaţi
-- instrucţiunea, la început va trebui să creaţi utilizatorul clerk_127.
-- ---------------------------------------------------------------------

-- Pasul 3.1: Crearea utilizatorului clerk_127 şi acordarea iniţială a drepturilor (pentru a putea testa revocarea):
GRANT USAGE ON *.* TO 'clerk_127'@'localhost' IDENTIFIED BY 'pass_clerk127';
GRANT SELECT, INSERT, DELETE, UPDATE ON companii.MOVIE TO 'clerk_127'@'localhost';

-- Verificare privilegii înainte de revocare:
SHOW GRANTS FOR 'clerk_127'@'localhost';

-- Pasul 3.2: Instrucţiunea cerută pentru ANULAREA privilegiilor SELECT, INSERT şi DELETE:
REVOKE SELECT, INSERT, DELETE ON companii.MOVIE FROM 'clerk_127'@'localhost';

-- Verificare privilegii după revocare (ar trebui să rămână doar UPDATE, dacă a fost acordat, sau USAGE):
SHOW GRANTS FOR 'clerk_127'@'localhost';

-- Actualizarea tabelelor interne de privilegii:
FLUSH PRIVILEGES;
