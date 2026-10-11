<?php
/**
 * dbconnect.php - Script de conectare la baza de date MySQL (books)
 */

$host = 'localhost';
$db_user = 'root';
$db_pass = '';
$db_name = 'books';

$db = new mysqli($host, $db_user, $db_pass, $db_name);

if ($db->connect_errno) {
    die("Eroare la conectarea cu serverul MySQL: " . $db->connect_error);
}

// Setare set de caractere utf8
$db->set_charset("utf8");
?>
