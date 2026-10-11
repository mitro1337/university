<?php
/**
 * Exemplu de formular şi mecanism de autentificare (login) simplu
 */

header('Content-Type: text/html; charset=UTF-8');

$user_corect = 'student';
$parola_corecta = 'parola123';
$mesaj = '';
$erori = 0;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user = isset($_POST['user']) ? trim($_POST['user']) : '';
    $pass = isset($_POST['pass']) ? trim($_POST['pass']) : '';

    if (empty($user) || empty($pass)) {
        $mesaj = 'Completati ambele campuri!';
        $erori++;
    }

    if ($erori == 0) {
        if ($user === $user_corect && $pass === $parola_corecta) {
            echo "<h3>Autentificare reusita!</h3>";
            echo "<p style='color:green;'>Ati fost autentificat cu succes. Veti fi redirectionat...</p>";
            echo "<p><a href='login.php'>Deconectare / Inapoi la formular</a></p>";
            exit;
        } else {
            $mesaj = 'Username-ul sau parola sunt gresite!';
        }
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Aplicatie formular: pagina de login</title>
    <style>
        .login-box {
            width: 300px;
            padding: 20px;
            border: 1px solid #ccc;
            background: #fafafa;
            border-radius: 6px;
            margin-top: 20px;
        }
        .error {
            color: red;
            font-weight: bold;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <h2>Aplicatie formular: pagina de login</h2>
    <hr>
    
    <div class="login-box">
        <?php if (!empty($mesaj)): ?>
            <div class="error"><?php echo htmlspecialchars($mesaj); ?></div>
        <?php endif; ?>
        
        <form action="login.php" method="POST">
            <fieldset>
                <legend><b>Date de autentificare</b></legend>
                <p>
                    <label for="user">User:</label><br>
                    <input type="text" name="user" id="user" required>
                </p>
                <p>
                    <label for="pass">Pass:</label><br>
                    <input type="password" name="pass" id="pass" required>
                </p>
                <p>
                    <input type="submit" value="Trimite (Login)">
                </p>
            </fieldset>
        </form>
        <p><small>Credenţiale test: User: <b>student</b> / Parola: <b>parola123</b></small></p>
    </div>
</body>
</html>
