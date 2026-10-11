-- =====================================================================
-- PROBLEMA REZOLVATĂ 14: BAZA DE DATE BOOKS (BOOK-O-RAMA)
-- =====================================================================

CREATE DATABASE IF NOT EXISTS books;
USE books;

-- 1. Tabela books (cărţi din catalogul Book-O-Rama)
CREATE TABLE IF NOT EXISTS books (
    isbn CHAR(13) NOT NULL PRIMARY KEY,
    author VARCHAR(50) NOT NULL,
    title VARCHAR(100) NOT NULL,
    price DECIMAL(6, 2) NOT NULL
) ENGINE = InnoDB;

-- 2. Tabela customers
CREATE TABLE IF NOT EXISTS customers (
    customerid INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    address VARCHAR(100) NOT NULL,
    city VARCHAR(30) NOT NULL
) ENGINE = InnoDB;

-- 3. Tabela orders
CREATE TABLE IF NOT EXISTS orders (
    orderid INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    customerid INT UNSIGNED NOT NULL,
    amount DECIMAL(6, 2) NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY (customerid) REFERENCES customers(customerid)
) ENGINE = InnoDB;

-- 4. Tabela order_items
CREATE TABLE IF NOT EXISTS order_items (
    orderid INT UNSIGNED NOT NULL,
    isbn CHAR(13) NOT NULL,
    quantity TINYINT UNSIGNED,
    PRIMARY KEY (orderid, isbn),
    FOREIGN KEY (orderid) REFERENCES orders(orderid),
    FOREIGN KEY (isbn) REFERENCES books(isbn)
) ENGINE = InnoDB;

-- 5. Crearea utilizatorului bookorama cu toate drepturile pe baza de date books:
-- Versiune tradiţională MySQL 5:
-- GRANT ALL ON books.* TO 'bookorama'@'localhost' IDENTIFIED BY 'bookorama123';
-- Versiune compatibilă modernă (MySQL 8+):
CREATE USER IF NOT EXISTS 'bookorama'@'localhost' IDENTIFIED BY 'bookorama123';
GRANT ALL ON books.* TO 'bookorama'@'localhost';
FLUSH PRIVILEGES;

-- Inserare date demonstrative în books:
INSERT INTO books (isbn, author, title, price) VALUES
('0-672-31697-8', 'Michael Morgan', 'Java 2 for Experienced Programmers', 39.99),
('0-672-31745-1', 'Luke Welling', 'PHP and MySQL Web Development', 49.99),
('0-672-31509-2', 'Pruitt, Pruitt', 'Teach Yourself GIMP in 24 Hours', 24.99),
('0-672-31769-9', 'Brian Kernighan', 'The Practice of Programming', 34.95)
ON DUPLICATE KEY UPDATE title=VALUES(title);
