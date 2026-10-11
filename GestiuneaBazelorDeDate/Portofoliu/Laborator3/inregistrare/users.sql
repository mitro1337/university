-- =====================================================================
-- PROBLEMA REZOLVATĂ 15: TABELA USERS PENTRU ÎNREGISTRARE
-- =====================================================================

CREATE DATABASE IF NOT EXISTS books;
USE books;

CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    username VARCHAR(30) NOT NULL,
    password CHAR(32) NOT NULL
) ENGINE = InnoDB;
