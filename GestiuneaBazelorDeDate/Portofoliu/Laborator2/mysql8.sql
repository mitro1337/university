-- =====================================================================
-- LABORATOR 2: VARIANTA PENTRU MYSQL 8.0+ / MEDII MODERNE
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. Fred & Paul (MySQL 8+)
-- ---------------------------------------------------------------------
CREATE USER IF NOT EXISTS 'fred'@'%' IDENTIFIED BY 'fred123';
GRANT ALL ON *.* TO 'fred'@'%' WITH GRANT OPTION;
REVOKE ALL PRIVILEGES, GRANT OPTION FROM 'fred'@'%';

CREATE USER IF NOT EXISTS 'paul'@'%' IDENTIFIED BY 'paul123';
GRANT SELECT, INSERT, UPDATE, DELETE, INDEX, ALTER, CREATE, DROP ON carti.* TO 'paul'@'%';
REVOKE ALTER, CREATE, DROP ON carti.* FROM 'paul'@'%';
REVOKE ALL ON carti.* FROM 'paul'@'%';


-- ---------------------------------------------------------------------
-- 2. Marius (MySQL 8+)
-- ---------------------------------------------------------------------
CREATE USER IF NOT EXISTS 'Marius'@'%' IDENTIFIED BY 'Marius123';

-- Privilegii la nivel de coloană
GRANT SELECT(isbn, titlu, pret),
      INSERT(isbn, titlu, pret),
      UPDATE(isbn, titlu, pret)
ON carti.carti TO 'Marius'@'%';

REVOKE INSERT(pret) ON carti.carti FROM 'Marius'@'%';
REVOKE UPDATE(pret) ON carti.carti FROM 'Marius'@'%';

SHOW GRANTS FOR 'Marius'@'%';


-- ---------------------------------------------------------------------
-- 3. Ion, Adi, Monica, Maria, Cosmin (MySQL 8+)
-- ---------------------------------------------------------------------
CREATE USER IF NOT EXISTS 'ion'@'localhost' IDENTIFIED BY 'parola1';
GRANT ALL ON carti.* TO 'ion'@'localhost';

CREATE USER IF NOT EXISTS 'adi'@'localhost' IDENTIFIED BY 'parola2';
GRANT SELECT, UPDATE, INSERT ON carti.carti TO 'adi'@'localhost';

CREATE USER IF NOT EXISTS 'monica'@'localhost' IDENTIFIED BY 'Mel12068';
GRANT SELECT, UPDATE(autor, titlu) ON carti.carti TO 'monica'@'localhost';

CREATE USER IF NOT EXISTS 'maria'@'localhost' IDENTIFIED BY 'xxx456';
GRANT ALL ON *.* TO 'maria'@'localhost';

CREATE USER IF NOT EXISTS 'cosmin'@'localhost' IDENTIFIED BY 'cosmin_pass';
GRANT SHUTDOWN ON *.* TO 'cosmin'@'localhost';
REVOKE SHUTDOWN ON *.* FROM 'cosmin'@'localhost';

-- Ştergerea utilizatorilor în mod recomandat (DROP USER):
DROP USER IF EXISTS 'cosmin'@'localhost';

FLUSH PRIVILEGES;
