<?php
/**
 * register.php - Procesarea inregistrarii utilizatorului in baza de date
 */

session_start();
require_once 'dbconnect.php';

header('Content-Type: text/html; charset=UTF-8');

echo "<h2>Rezultat Inregistrare</h2><hr>";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $username = isset($_POST['username']) ? trim($_POST['username']) : '';
    $password = isset($_POST['password']) ? trim($_POST['password']) : '';

    if (empty($name) || empty($username) || empty($password)) {
        echo "<p style='color:red;'>Toate campurile sunt obligatorii! Va rugam sa reveniti si sa completati formularul.</p>";
        echo "<p><a href='index.php'>Inapoi la formular</a></p>";
        exit;
    }

    // Codificarea parolei folosind functia unidirectionala MD5 (lungime 32 caractere hexazecimale)
    $password_md5 = md5($password);

    // Escaparea caracterelor pentru prevenirea SQL Injection
    $name_esc = $db->real_escape_string($name);
    $username_esc = $db->real_escape_string($username);

    // Verificam daca username-ul exista deja
    $check_query = "SELECT id FROM users WHERE username = '$username_esc'";
    $check_res = $db->query($check_query);

    if ($check_res && $check_res->num_rows > 0) {
        echo "<p style='color:red;'>Numele de utilizator '$username' este deja folosit. Alegeti altul!</p>";
        echo "<p><a href='index.php'>Inapoi la formular</a></p>";
        exit;
    }

    // Inseram noul utilizator in tabela users (id-ul este auto-incrementat)
    $insert_query = "INSERT INTO users (name, username, password) VALUES ('$name_esc', '$username_esc', '$password_md5')";
    $result = $db->query($insert_query);

    if ($result) {
        echo "<p style='color:green; font-weight:bold;'>Utilizatorul $username a fost inregistrat cu succes in baza de date!</p>";
        echo "<p>Parola a fost stocata criptat folosind MD5 Hash: <code>$password_md5</code></p>";
    } else {
        echo "<p style='color:red;'>Eroare la inregistrare: " . $db->error . "</p>";
    }
} else {
    echo "<p>Acces nepermis. Trimiteti formularul din <a href='index.php'>pagina principala</a>.</p>";
}

echo "<br><p><a href='index.php'>Inregistreaza un alt utilizator</a></p>";
$db->close();
?>
