<?php
/**
 * Scriptul de procesare a trimiterii formularului de anunt nou
 */

require_once 'anunturi-acces-date-sesiune.php';

header('Content-Type: text/html; charset=UTF-8');

$mesaj = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nume = isset($_POST['nume']) ? trim($_POST['nume']) : '';
    $telefon = isset($_POST['telefon']) ? trim($_POST['telefon']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $oras = isset($_POST['oras']) ? trim($_POST['oras']) : '';
    $continut = isset($_POST['continut']) ? trim($_POST['continut']) : '';

    if (!empty($nume) && !empty($continut)) {
        if (adaugaAnunt($nume, $telefon, $email, $oras, $continut)) {
            $mesaj = '<span style="color:green; font-weight:bold;">Date salvate cu succes!</span>';
        } else {
            $mesaj = '<span style="color:red; font-weight:bold;">Datele nu au putut fi salvate.</span>';
        }
    } else {
        $mesaj = '<span style="color:red; font-weight:bold;">Campurile obligatorii nu au fost completate!</span>';
    }
} else {
    $mesaj = '<span style="color:orange;">Nimic de afisat aici. (Pagina trebuie accesata prin POST)</span>';
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Adaugare anunt - Confirmare</title>
    <style>
        * { font-family: tahoma, sans-serif; font-size: small; }
    </style>
</head>
<body>
    <h2>Status salvare anunt</h2>
    <hr>
    <p><?php echo $mesaj; ?></p>
    <p><a href="anunturi.php">Mergeti inapoi la pagina principala de anunturi.</a></p>
</body>
</html>
