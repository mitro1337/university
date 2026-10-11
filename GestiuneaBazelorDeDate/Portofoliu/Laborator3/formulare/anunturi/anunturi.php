<?php
/**
 * Pagina de vizualizare şi adăugare de anunţuri
 */

require_once 'anunturi-acces-date-sesiune.php';

header('Content-Type: text/html; charset=UTF-8');

// Preluam anunturile existente
$anunturi = citireDate();
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Administrare anunturi</title>
    <style>
        * { font-family: tahoma, sans-serif; font-size: small; }
        table, td, th { border: 1px solid #999; border-collapse: collapse; }
        td, th { padding: 6px 10px; }
        thead tr { background-color: #eeeeee; font-weight: bold; }
        .form-box { margin-top: 20px; width: 450px; background: #fafafa; padding: 15px; border: 1px solid #ccc; }
    </style>
</head>
<body>
    <h2>Administrare anunturi</h2>
    <hr>
    
    <h3>Anunturi existente</h3>
    <?php
    if (!is_array($anunturi) || count($anunturi) == 0) {
        echo '<p><i>Nu exista anunturi.</i></p>';
    } else {
        echo '<table>';
        echo '<thead><tr><th>Nume</th><th>Telefon</th><th>Email</th><th>Oras</th><th>Anunt</th></tr></thead>';
        echo '<tbody>';
        foreach ($anunturi as $anunt) {
            echo '<tr>';
            echo '<td>' . htmlspecialchars($anunt['nume']) . '</td>';
            echo '<td>' . htmlspecialchars($anunt['telefon']) . '</td>';
            echo '<td>' . htmlspecialchars($anunt['email']) . '</td>';
            echo '<td>' . htmlspecialchars($anunt['oras']) . '</td>';
            echo '<td>' . htmlspecialchars($anunt['continut']) . '</td>';
            echo '</tr>';
        }
        echo '</tbody>';
        echo '</table>';
        echo '<p><b>Anunturi salvate:</b> ' . count($anunturi) . '</p>';
    }
    ?>

    <div class="form-box">
        <h3>Adaugare anunt</h3>
        <form action="anunturi-post.php" method="POST">
            <p>
                <label>Nume contact:</label><br>
                <input type="text" name="nume" size="30" required>
            </p>
            <p>
                <label>Telefon contact:</label><br>
                <input type="text" name="telefon" size="20" required>
            </p>
            <p>
                <label>Email:</label><br>
                <input type="email" name="email" size="30" required>
            </p>
            <p>
                <label>Oras:</label><br>
                <input type="text" name="oras" size="20" required>
            </p>
            <p>
                <label>Continut anunt:</label><br>
                <textarea name="continut" rows="4" cols="45" required></textarea>
            </p>
            <p>
                <input type="submit" value="Salveaza anuntul">
            </p>
        </form>
    </div>
    <br>
    <p><a href="index.php">Inapoi la autentificare</a></p>
</body>
</html>
