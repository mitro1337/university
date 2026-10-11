<?php
/**
 * index.php - Formular de inregistrare a utilizatorilor
 */

session_start();
require_once 'dbconnect.php';

header('Content-Type: text/html; charset=UTF-8');
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Inregistrare / Login</title>
    <style>
        .form-container {
            width: 350px;
            padding: 20px;
            background: #f7f7f7;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        .form-row {
            margin-bottom: 12px;
        }
        label {
            font-weight: bold;
            display: block;
            margin-bottom: 4px;
        }
        input[type="text"], input[type="password"] {
            width: 100%;
            padding: 6px;
            box-sizing: border-box;
        }
    </style>
</head>
<body>
    <h2>Inregistrare Utilizator Nou</h2>
    <hr>
    
    <div class="form-container">
        <form action="register.php" method="POST">
            <div class="form-row">
                <label for="name">Nume si prenume:</label>
                <input type="text" name="name" id="name" required>
            </div>
            <div class="form-row">
                <label for="username">Username:</label>
                <input type="text" name="username" id="username" required>
            </div>
            <div class="form-row">
                <label for="password">Parola:</label>
                <input type="password" name="password" id="password" required>
            </div>
            <div class="form-row">
                <input type="submit" value="Inregistreaza-te">
            </div>
        </form>
    </div>
</body>
</html>
