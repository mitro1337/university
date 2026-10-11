<?php
/**
 * Pagina de login pentru aplicatia de administrare a anunturilor
 */

session_start();
header('Content-Type: text/html; charset=UTF-8');

$user_corect = 'admin';
$parola_corecta = 'admin123';
$mesaj = '';
$erori = 0;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user = isset($_POST['user']) ? trim($_POST['user']) : '';
    $pass = isset($_POST['pass']) ? trim($_POST['pass']) : '';

    if (empty($user) || empty($pass)) {
        $mesaj = 'Va rugam sa introduceti atat utilizatorul, cat si parola!';
        $erori++;
    }

    if ($erori == 0) {
        if ($user === $user_corect && $pass === $parola_corecta) {
            $_SESSION['admin_auth'] = true;
            echo '<h3>Autentificare reusita!</h3>';
            echo '<p style="color:green;">Ati fost autentificat. Veti fi redirectionat la pagina dvs. imediat.</p>';
            echo '<meta http-equiv="refresh" content="1;url=anunturi.php">';
            echo '<p><a href="anunturi.php">Apasati aici daca nu sunteti redirectionat automat...</a></p>';
            exit;
        } else {
            $mesaj = 'Username-ul sau parola sunt gresite';
            $erori++;
        }
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Aplicatie formular: administrare anunturi - Autentificare</title>
    <style>
        body { font-family: Tahoma, sans-serif; font-size: small; }
        .box { width: 320px; padding: 15px; border: 1px solid #ccc; background: #f9f9f9; }
        .error { color: red; font-weight: bold; margin-bottom: 10px; }
    </style>
</head>
<body>
    <h2>Administrare anunturi - Autentificare</h2>
    <hr>
    
    <div class="box">
        <?php if ($erori > 0 && !empty($mesaj)): ?>
            <div class="error"><?php echo htmlspecialchars($mesaj); ?></div>
        <?php endif; ?>

        <form action="index.php" method="POST">
            <fieldset>
                <legend><b>Date de autentificare</b></legend>
                <p>
                    <label>User:</label><br>
                    <input type="text" name="user" required>
                </p>
                <p>
                    <label>Pass:</label><br>
                    <input type="password" name="pass" required>
                </p>
                <p>
                    <input type="submit" value="Autentificare">
                </p>
            </fieldset>
        </form>
        <p><small>Credenţiale test: User: <b>admin</b> / Parola: <b>admin123</b></small></p>
    </div>
</body>
</html>
