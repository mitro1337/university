<?php
/**
 * db_fns.php - Funcţii pentru conexiunea la baza de date MySQL
 */

function db_connect() {
    // Conectare initiala cu utilizatorul specificat in laborator
    @ $result = new mysqli('localhost', 'bm_user', 'password', 'bookmarks');
    
    // Fallback automat pentru testare locala rapida cu root
    if ($result->connect_errno) {
        @ $result = new mysqli('localhost', 'root', '', 'bookmarks');
    }

    if ($result->connect_errno) {
        throw new Exception('Could not connect to database server: ' . $result->connect_error);
    }
    
    $result->set_charset("utf8");
    return $result;
}
?>
