-- =====================================================================
-- LABORATOR 2: PROBLEMA REZOLVATĂ 1
-- Acordarea şi revocarea privilegiilor la nivel de bază de date şi de coloană
-- =====================================================================

-- ---------------------------------------------------------------------
-- Partea I: Privilegii la nivel de bază de date (Marius pe testdb)
-- ---------------------------------------------------------------------

-- Acordare drepturi depline pe întreaga bază de date testdb:
GRANT ALL ON testdb.* TO Marius IDENTIFIED BY 'mypassword';

-- Verificare privilegii:
SHOW GRANTS FOR Marius;

-- Revocarea tuturor privilegiilor asupra bazei de date testdb:
REVOKE ALL ON testdb.* FROM Marius;

-- Verificare după revocare:
SHOW GRANTS FOR Marius;


-- ---------------------------------------------------------------------
-- Partea a II-a: Privilegii granulare la nivel de coloană
-- ---------------------------------------------------------------------

-- Acordăm utilizatorului Marius dreptul de SELECT, INSERT şi UPDATE
-- DOAR pe coloanele: isbn, titlu, pret din tabela carti din BD carti:
GRANT
    SELECT(isbn, titlu, pret),
    INSERT(isbn, titlu, pret),
    UPDATE(isbn, titlu, pret)
ON carti.carti TO Marius IDENTIFIED BY 'Marius123';

-- Vizualizarea înregistrărilor create intern în tabela de sistem mysql.columns_priv:
SELECT Host, Db, User, Table_name, Column_name, Column_priv 
FROM mysql.columns_priv 
WHERE User = 'Marius';

-- Revocăm permisiunea de a insera şi de a actualiza valoarea coloanei 'pret':
REVOKE INSERT(pret) ON carti.carti FROM Marius;
REVOKE UPDATE(pret) ON carti.carti FROM Marius;

-- Vizualizarea noilor privilegii ale utilizatorului Marius:
SHOW GRANTS FOR Marius;

-- Verificăm din nou tabela internă mysql.columns_priv:
SELECT Host, Db, User, Table_name, Column_name, Column_priv 
FROM mysql.columns_priv 
WHERE User = 'Marius';

FLUSH PRIVILEGES;
