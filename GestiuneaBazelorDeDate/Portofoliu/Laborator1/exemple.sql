-- =====================================================================
-- LABORATOR 1: EXEMPLE DEMONSTRATIVE DIN TEXTUL PLATFORMEI
-- =====================================================================

-- Exemplul 1:
-- Acordarea privilegiului SELECT asupra tabelului MPAA_RATING tuturor utilizatorilor (PUBLIC)
-- Notă: În MySQL standard, PUBLIC este adesea simulat prin crearea unui utilizator anonim ''@'%' 
-- sau a unui rol comun, în timp ce în Oracle/PostgreSQL PUBLIC este un rol predefinit.
-- Sintaxa generică din laborator:
-- GRANT SELECT ON MPAA_RATING TO PUBLIC;

-- Exemplul 2: Crearea unui administrator cu toate drepturile
-- GRANT ALL ON *.* TO admin1 WITH GRANT OPTION;
-- Retragerea tuturor drepturilor administratorului:
-- REVOKE ALL ON *.* FROM admin1;

-- Crearea unui utilizator obişnuit şi acordarea de drepturi pe baza de date 'carti':
-- GRANT SELECT, INSERT, UPDATE, DELETE, INDEX, ALTER, CREATE, DROP ON carti.* TO user1;

-- Alocarea parolei (abc123):
-- SET PASSWORD FOR 'user1'@'%' = PASSWORD('abc123');

-- Alocarea drepturilor de acces pe o singură tabelă (autori din baza de date carti):
-- GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, INDEX ON `carti`.`autori` TO 'user1'@'%';

-- Exerciţiu rezolvat:
-- Verificarea bazelor de date existente:
SHOW DATABASES;

-- Acordarea tuturor drepturilor pe baza de date clienti:
-- GRANT ALL ON clienti.* TO 'your_mysql_name'@'your_client_host';
-- GRANT ALL ON clienti.* TO 'utilizator'@'localhost' IDENTIFIED BY 'parola_u' WITH GRANT OPTION;

-- Selectarea bazei de date:
USE clienti;

-- Reîmprospătarea tabelelor de privilegii:
FLUSH PRIVILEGES;
