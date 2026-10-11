<?php
/**
 * Problema rezolvată 12: Preluarea datelor din formular şi gestionarea fişierului încărcat
 */

header('Content-Type: text/html; charset=UTF-8');

echo "<h2>Date preluate din formular</h2><hr>";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nume = isset($_POST['nume']) ? htmlspecialchars($_POST['nume']) : '';
    $prenume = isset($_POST['prenume']) ? htmlspecialchars($_POST['prenume']) : '';
    $telefon = isset($_POST['telefon']) ? htmlspecialchars($_POST['telefon']) : '';
    $fax = isset($_POST['fax']) ? htmlspecialchars($_POST['fax']) : '';
    $email = isset($_POST['email']) ? htmlspecialchars($_POST['email']) : '';
    $sex = isset($_POST['sex']) ? htmlspecialchars($_POST['sex']) : '';
    $studii = isset($_POST['studii']) ? htmlspecialchars($_POST['studii']) : '';
    $locatii = isset($_POST['locatie_internet']) ? $_POST['locatie_internet'] : array();
    $observatii = isset($_POST['observatii']) ? nl2br(htmlspecialchars($_POST['observatii'])) : '';

    echo "<b>Nume:</b> $nume <br>";
    echo "<b>Prenume:</b> $prenume <br>";
    echo "<b>Telefon:</b> $telefon <br>";
    echo "<b>Fax:</b> $fax <br>";
    echo "<b>Email:</b> $email <br>";
    echo "<b>Sex:</b> $sex <br>";
    echo "<b>Studii:</b> $studii <br>";
    echo "<b>Acces Internet:</b> " . implode(', ', array_map('htmlspecialchars', $locatii)) . "<br>";
    echo "<b>Observatii:</b><br>$observatii <br><br>";

    // Procesare upload fișier
    if (isset($_FILES['fisier_upload']) && $_FILES['fisier_upload']['error'] === UPLOAD_ERR_OK) {
        $nume_fisier = basename($_FILES['fisier_upload']['name']);
        $tip_fisier = $_FILES['fisier_upload']['type'];
        $marime_fisier = $_FILES['fisier_upload']['size'];
        $tmp_name = $_FILES['fisier_upload']['tmp_name'];

        $destinatie_director = __DIR__ . '/uploads/';
        if (!is_dir($destinatie_director)) {
            mkdir($destinatie_director, 0777, true);
        }

        $cale_finala = $destinatie_director . $nume_fisier;
        if (move_uploaded_file($tmp_name, $cale_finala)) {
            echo "<p style='color:green;'><b>Fisierul a fost incarcat cu succes!</b></p>";
            echo "Nume fisier: $nume_fisier <br>";
            echo "Dimensiune: " . round($marime_fisier / 1024, 2) . " KB <br>";
            echo "Tip MIME: $tip_fisier <br>";
        } else {
            echo "<p style='color:red;'>Eroare la salvarea fisierului pe server.</p>";
        }
    } else {
        echo "<p>Nu a fost selectat niciun fisier pentru incarcare sau a aparut o eroare la upload.</p>";
    }
} else {
    echo "<p>Va rugam sa accesati aceasta pagina prin transmiterea formularului.</p>";
}

echo "<br><a href='formular.html'>Inapoi la formular</a>";
?>
