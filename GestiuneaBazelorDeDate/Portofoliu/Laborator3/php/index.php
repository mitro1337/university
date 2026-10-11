<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Problema rezolvata 10 - Integrare PHP in HTML</title>
</head>
<body>
    <h2>Problema rezolvata 10: Script PHP care contine si cod HTML</h2>
    <hr>
    
    <!-- Varianta 1: Taguri PHP integrate in text HTML -->
    <p>
        <?php 
            echo "Acesta este un mesaj generat din PHP <b>care contine si etichete HTML</b>.<br>";
        ?>
    </p>

    <!-- Varianta 2: Afisarea datei curente folosind functia date() -->
    <p>
        <?php 
            print 'Azi este data de: <b>' . date('d.m.Y') . '</b>, ora curenta: <b>' . date('H:i:s') . '</b>.';
        ?>
    </p>
</body>
</html>
