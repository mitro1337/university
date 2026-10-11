<?php
/**
 * Preluarea numelui şi a unui text lung prin metoda POST şi calcularea lungimii textului
 */

header('Content-Type: text/html; charset=UTF-8');

echo "<h2>Rezultat preluare POST</h2><hr>";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nume = isset($_POST['nume']) ? htmlspecialchars($_POST['nume']) : '';
    $text_lung = isset($_POST['textfl']) ? $_POST['textfl'] : '';

    $lungime_caractere = mb_strlen($text_lung, 'UTF-8');
    $numar_cuvinte = str_word_count($text_lung);

    echo "<p><b>Nume utilizator:</b> $nume</p>";
    echo "<p><b>Lungimea textului introdus:</b> <span style='color:blue;'>$lungime_caractere caractere</span></p>";
    echo "<p><b>Numar estimat de cuvinte:</b> $numar_cuvinte</p>";
    echo "<p><b>Textul introdus:</b></p>";
    echo "<div style='background:#f9f9f9; border:1px solid #ddd; padding:10px; width:70%;'>" . nl2br(htmlspecialchars($text_lung)) . "</div>";
} else {
    echo "<p style='color:red;'>Aceasta pagina trebuie accesata printr-o cerere de tip POST!</p>";
}

echo "<br><a href='formular.html'>Inapoi la formular</a>";
?>
