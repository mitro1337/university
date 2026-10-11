-- =====================================================================
-- PROBLEMA REZOLVATĂ 16: BAZA DE DATE BOOKMARKS ŞI TABELELE
-- =====================================================================

CREATE DATABASE IF NOT EXISTS bookmarks;
USE bookmarks;

-- 1. Tabela user (utilizatori cu parole SHA1)
CREATE TABLE IF NOT EXISTS user (
    username VARCHAR(16) NOT NULL,
    passwd CHAR(40) NOT NULL,
    email VARCHAR(100) NOT NULL,
    PRIMARY KEY (username)
) ENGINE = InnoDB;

-- 2. Tabela bookmark (URL-urile salvate de fiecare utilizator)
CREATE TABLE IF NOT EXISTS bookmark (
    username VARCHAR(16) NOT NULL,
    bm_url VARCHAR(255) NOT NULL,
    INDEX (username),
    INDEX (bm_url),
    PRIMARY KEY (username, bm_url)
) ENGINE = InnoDB;

-- 3. Utilizatorul dedicat aplicatiei bm_user cu drepturi depline de lucru:
-- Versiune tradiţională MySQL:
-- GRANT SELECT, INSERT, UPDATE, DELETE ON bookmarks.* TO 'bm_user'@'localhost' IDENTIFIED BY 'password';
-- Versiune compatibilă MySQL 8+:
CREATE USER IF NOT EXISTS 'bm_user'@'localhost' IDENTIFIED BY 'password';
GRANT SELECT, INSERT, UPDATE, DELETE ON bookmarks.* TO 'bm_user'@'localhost';
FLUSH PRIVILEGES;

-- 4. Date de test: utilizatorul ancamehedintu cu parola 'parola' (sha1: 67cf4ff97fe94df7bc71b56950ee0efcf1221147)
INSERT INTO user (username, passwd, email) VALUES
('ancamehedintu', SHA1('parola'), 'anca@exemplu.ro'),
('ionpopescu', SHA1('parola123'), 'ion@exemplu.ro')
ON DUPLICATE KEY UPDATE email=VALUES(email);

INSERT INTO bookmark (username, bm_url) VALUES
('ancamehedintu', 'http://www.google.com'),
('ancamehedintu', 'http://www.php.net'),
('ionpopescu', 'http://www.php.net'),
('ionpopescu', 'http://www.mysql.com')
ON DUPLICATE KEY UPDATE bm_url=VALUES(bm_url);
