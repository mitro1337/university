<?php
/**
 * Preluarea numelui transmis prin metoda GET şi afişarea lui
 */

header('Content-Type: text/html; charset=UTF-8');

echo "<h2>Rezultat preluare GET</h2><hr>";

if (isset($_GET['nume']) && trim($_GET['nume']) !== '') {
    $nume = htmlspecialchars($_GET['nume']);
    echo "<p>Numele preluat din parametrul URL este: <b>$nume</b></p>";
} else {
    echo "<p style='color:red;'>Niciun nume nu a fost transmis prin GET!</p>";
}

echo "<br><a href='formular.html'>Inapoi la formular</a>";
?>
