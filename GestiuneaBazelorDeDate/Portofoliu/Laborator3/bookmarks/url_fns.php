<?php
/**
 * url_fns.php - Funcţii de manipulare şi recomandare a semnelor de carte (URL-uri)
 */

require_once 'db_fns.php';

function get_user_urls($username) {
    // Extrage toate semnele de carte ale unui utilizator
    $conn = db_connect();
    $username_esc = $conn->real_escape_string($username);

    $result = $conn->query("SELECT bm_url FROM bookmark WHERE username = '$username_esc'");
    if (!$result) {
        return false;
    }

    $url_array = array();
    for ($count = 1; $row = $result->fetch_row(); ++$count) {
        $url_array[$count] = $row[0];
    }
    return $url_array;
}

function add_bm($new_url) {
    // Adauga un nou bookmark pentru utilizatorul curent
    $valid_user = $_SESSION['valid_user'];
    $conn = db_connect();

    $new_url = trim($new_url);
    if (empty($new_url)) {
        throw new Exception('Bookmark URL cannot be empty.');
    }

    // Prefixare automata cu protocolul http/https daca lipseste
    if (!preg_match('/^https?:\/\//i', $new_url)) {
        $new_url = 'http://' . $new_url;
    }

    $user_esc = $conn->real_escape_string($valid_user);
    $url_esc = $conn->real_escape_string($new_url);

    // Verificam daca bookmark-ul exista deja pentru utilizator
    $result = $conn->query("SELECT * FROM bookmark WHERE username='$user_esc' AND bm_url='$url_esc'");
    if ($result && ($result->num_rows > 0)) {
        throw new Exception('Bookmark already exists.');
    }

    // Inseram noul bookmark
    if (!$conn->query("INSERT INTO bookmark (username, bm_url) VALUES ('$user_esc', '$url_esc')")) {
        throw new Exception('Bookmark could not be inserted.');
    }

    return true;
}

function delete_bm($user, $url) {
    // Sterge un bookmark specific pentru un utilizator
    $conn = db_connect();
    $user_esc = $conn->real_escape_string($user);
    $url_esc = $conn->real_escape_string($url);

    if (!$conn->query("DELETE FROM bookmark WHERE username='$user_esc' AND bm_url='$url_esc'")) {
        throw new Exception('Bookmark could not be deleted.');
    }

    return true;
}

function recommend_urls($valid_user, $popularity = 1) {
    // Recomandari inteligente pe baza preferintelor comune cu alti utilizatori
    $conn = db_connect();
    $user_esc = $conn->real_escape_string($valid_user);

    $query = "SELECT bm_url FROM bookmark 
              WHERE username IN (
                  SELECT DISTINCT(b2.username) 
                  FROM bookmark b1, bookmark b2 
                  WHERE b1.username = '$user_esc' 
                    AND b1.username != b2.username 
                    AND b1.bm_url = b2.bm_url
              ) 
              AND bm_url NOT IN (
                  SELECT bm_url FROM bookmark WHERE username = '$user_esc'
              ) 
              GROUP BY bm_url 
              HAVING count(bm_url) >= $popularity";

    $result = $conn->query($query);
    if (!$result) {
        throw new Exception('Could not execute recommendation query.');
    }

    if ($result->num_rows == 0) {
        throw new Exception('Could not find any bookmarks to recommend.');
    }

    $urls = array();
    for ($count = 0; $row = $result->fetch_object(); $count++) {
        $urls[$count] = $row->bm_url;
    }

    return $urls;
}
?>
