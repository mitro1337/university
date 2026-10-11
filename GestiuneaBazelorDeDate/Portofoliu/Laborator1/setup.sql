-- =====================================================================
-- LABORATOR 1: CONFIGURARE BAZA DE DATE ŞI TABELE SUPORT
-- =====================================================================

-- 1. Baza de date pentru testarea exerciţiilor şi tabelele necesare
CREATE DATABASE IF NOT EXISTS companii;
USE companii;

-- Tabel pentru Exemplul 1 (Clasificare / Coduri de referinţă)
CREATE TABLE IF NOT EXISTS MPAA_RATING (
    rating_id INT AUTO_INCREMENT PRIMARY KEY,
    cod VARCHAR(10) NOT NULL,
    descriere VARCHAR(255) NOT NULL
);

INSERT INTO MPAA_RATING (cod, descriere) VALUES 
('G', 'General Audiences - All ages admitted'),
('PG', 'Parental Guidance Suggested'),
('PG-13', 'Parents Strongly Cautioned'),
('R', 'Restricted'),
('NC-17', 'Clearly adult - No One 17 and Under Admitted');

-- Tabel pentru Exerciţiul propus 2 (Angajaţi)
CREATE TABLE IF NOT EXISTS EMPLOYEES (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    nume VARCHAR(50) NOT NULL,
    prenume VARCHAR(50) NOT NULL,
    functie VARCHAR(50),
    salariu DECIMAL(10, 2)
);

INSERT INTO EMPLOYEES (nume, prenume, functie, salariu) VALUES
('Popescu', 'Ion', 'Manager Vanzari', 6500.00),
('Ionescu', 'Maria', 'Analist Financiar', 5500.00),
('Vasilescu', 'Dan', 'Programator', 7200.00);

-- Tabel pentru Exerciţiul propus 3 (Filme)
CREATE TABLE IF NOT EXISTS MOVIE (
    movie_id INT AUTO_INCREMENT PRIMARY KEY,
    titlu VARCHAR(100) NOT NULL,
    regizor VARCHAR(100),
    an_lansare INT,
    gen VARCHAR(50)
);

INSERT INTO MOVIE (titlu, regizor, an_lansare, gen) VALUES
('Inception', 'Christopher Nolan', 2010, 'Sci-Fi'),
('The Matrix', 'Lana & Lilly Wachowski', 1999, 'Action'),
('Interstellar', 'Christopher Nolan', 2014, 'Sci-Fi');

-- 2. Baza de date carti cu tabela autori (menţionată în exemple)
CREATE DATABASE IF NOT EXISTS carti;
USE carti;

CREATE TABLE IF NOT EXISTS autori (
    idautor INT AUTO_INCREMENT PRIMARY KEY,
    nume VARCHAR(50) NOT NULL,
    prenume VARCHAR(50) NOT NULL,
    tara VARCHAR(50)
);

INSERT INTO autori (nume, prenume, tara) VALUES
('Eminescu', 'Mihai', 'Romania'),
('Creanga', 'Ion', 'Romania'),
('Rebreanu', 'Liviu', 'Romania');

-- 3. Baza de date clienti (menţionată la exerciţiul rezolvat)
CREATE DATABASE IF NOT EXISTS clienti;
USE clienti;

CREATE TABLE IF NOT EXISTS date_clienti (
    idclient INT AUTO_INCREMENT PRIMARY KEY,
    nume VARCHAR(100) NOT NULL,
    oras VARCHAR(50) NOT NULL,
    telefon VARCHAR(20)
);
