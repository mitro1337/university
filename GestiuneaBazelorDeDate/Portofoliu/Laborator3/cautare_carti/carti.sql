-- =====================================================================
-- PROBLEMA REZOLVATĂ 13: SCHEMA CARTI PENTRU APLICAŢIA DE CĂUTARE
-- =====================================================================

CREATE DATABASE IF NOT EXISTS carti;
USE carti;

CREATE TABLE IF NOT EXISTS carti (
    isbn CHAR(13) NOT NULL PRIMARY KEY,
    autor CHAR(50),
    titlu CHAR(100),
    pret DEC(6, 2)
) ENGINE = InnoDB;

-- Inserare date de test
INSERT INTO carti (isbn, autor, titlu, pret) VALUES
('0-672-31509-2', 'Pruitt, Pruitt', 'Teach Yourself Gimp in 24 Hours', 24.99),
('0-672-31697-8', 'Morgan, Michael', 'Java 2 by Example', 29.99),
('0-672-31745-1', 'Welling, Luke', 'PHP and MySQL Web Development', 49.99),
('0-672-31769-9', 'Kernighan, Brian', 'The Practice of Programming', 39.95)
ON DUPLICATE KEY UPDATE titlu=VALUES(titlu);
