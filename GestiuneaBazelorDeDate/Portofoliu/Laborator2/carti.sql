-- =====================================================================
-- LABORATOR 2: CREARE BAZA DE DATE ŞI SCHEMA "CARTI"
-- =====================================================================

CREATE DATABASE IF NOT EXISTS carti;
USE carti;

-- Ştergere tabele vechi dacă există (pentru reinstalare curată)
DROP TABLE IF EXISTS detalii_comanda;
DROP TABLE IF EXISTS comenzi;
DROP TABLE IF EXISTS clienti;
DROP TABLE IF EXISTS carti;

-- 1. Tabela clienti
CREATE TABLE clienti (
    idclient INT(3) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nume CHAR(50) NOT NULL,
    oras CHAR(30) NOT NULL
) ENGINE = InnoDB;

-- 2. Tabela comenzi
CREATE TABLE comenzi (
    idcomanda INT(3) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idclient INT(3) UNSIGNED NOT NULL,
    valoare DEC(6, 2) NOT NULL,
    data DATE NOT NULL,
    FOREIGN KEY (idclient) REFERENCES clienti(idclient) ON DELETE CASCADE
) ENGINE = InnoDB;

-- 3. Tabela carti
CREATE TABLE carti (
    isbn CHAR(13) NOT NULL PRIMARY KEY,
    autor CHAR(50),
    titlu CHAR(100),
    pret DEC(6, 2)
) ENGINE = InnoDB;

-- 4. Tabela detalii_comanda
CREATE TABLE detalii_comanda (
    idcomanda INT(3) UNSIGNED NOT NULL,
    isbn CHAR(13) NOT NULL,
    cantitate INT(3) UNSIGNED,
    PRIMARY KEY (idcomanda, isbn),
    FOREIGN KEY (idcomanda) REFERENCES comenzi(idcomanda) ON DELETE CASCADE,
    FOREIGN KEY (isbn) REFERENCES carti(isbn) ON DELETE CASCADE
) ENGINE = InnoDB;

-- Inserare date de probă:
INSERT INTO clienti (nume, oras) VALUES
('Popescu Andrei', 'Bucuresti'),
('Ionescu Elena', 'Cluj-Napoca'),
('Radu Mihai', 'Timisoara');

INSERT INTO carti (isbn, autor, titlu, pret) VALUES
('978-0131103627', 'Brian W. Kernighan', 'The C Programming Language', 85.50),
('978-0596000486', 'Rasmus Lerdorf', 'Programming PHP', 110.00),
('978-0201633610', 'Erich Gamma', 'Design Patterns', 145.20),
('978-0321125217', 'Martin Fowler', 'Patterns of Enterprise Application Architecture', 160.00);

INSERT INTO comenzi (idclient, valoare, data) VALUES
(1, 195.50, '2026-03-10'),
(2, 145.20, '2026-03-11'),
(3, 110.00, '2026-03-12');

INSERT INTO detalii_comanda (idcomanda, isbn, cantitate) VALUES
(1, '978-0131103627', 1),
(1, '978-0596000486', 1),
(2, '978-0201633610', 1),
(3, '978-0596000486', 1);

-- Baza de date testdb necesară pentru demonstraţii ulterioare:
CREATE DATABASE IF NOT EXISTS testdb;
USE testdb;
CREATE TABLE IF NOT EXISTS test_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mesaj VARCHAR(100)
);
