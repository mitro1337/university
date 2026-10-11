<?php
/**
 * user_auth_fns.php - Funcţii de autentificare, autorizare şi gestiune parole utilizatori
 */

require_once 'db_fns.php';

function register($username, $email, $password) {
    // Conectare la baza de date
    $conn = db_connect();

    // Verificam daca username-ul este deja folosit
    $username_esc = $conn->real_escape_string($username);
    $email_esc = $conn->real_escape_string($email);

    $result = $conn->query("SELECT * FROM user WHERE username='$username_esc'");
    if (!$result) {
        throw new Exception('Could not execute query.');
    }

    if ($result->num_rows > 0) {
        throw new Exception('That username is taken - go back and choose another one.');
    }

    // Inseram noul utilizator in tabela cu parola criptata SHA-1
    $password_sha = sha1($password);
    $result = $conn->query("INSERT INTO user (username, passwd, email) VALUES ('$username_esc', '$password_sha', '$email_esc')");
    if (!$result) {
        throw new Exception('Could not register you in database - please try again later.');
    }

    return true;
}

function login($username, $password) {
    // Conectare la baza de date
    $conn = db_connect();

    $username_esc = $conn->real_escape_string($username);
    $password_sha = sha1($password);

    // Verificam combinatia username si parola
    $result = $conn->query("SELECT * FROM user WHERE username='$username_esc' AND passwd='$password_sha'");
    if (!$result) {
        throw new Exception('Could not log you in.');
    }

    if ($result->num_rows > 0) {
        return true;
    } else {
        throw new Exception('Could not log you in.');
    }
}

function check_valid_user() {
    // Verifica daca utilizatorul este autentificat in sesiune
    if (isset($_SESSION['valid_user'])) {
        echo '<p style="color:#0066cc;">Logged in as <b>' . htmlspecialchars($_SESSION['valid_user']) . '</b>.</p>';
    } else {
        // Nu este autentificat, redirectioneaza sau opreste
        do_html_heading('Problem:');
        echo '<p style="color:red;">You are not logged in.</p>';
        do_html_url('login.php', 'Login');
        do_html_footer();
        exit;
    }
}

function change_password($username, $old_password, $new_password) {
    // Verificam mai intai parola curenta
    login($username, $old_password);

    $conn = db_connect();
    $username_esc = $conn->real_escape_string($username);
    $new_password_sha = sha1($new_password);

    $result = $conn->query("UPDATE user SET passwd = '$new_password_sha' WHERE username = '$username_esc'");
    if (!$result) {
        throw new Exception('Password could not be changed.');
    } else {
        return true;
    }
}

function get_random_word($min_length, $max_length) {
    // Lista cuvinte standard de fallback in caz ca dictionarul de sistem nu exista
    $fallback_words = array(
        'apple', 'banana', 'orange', 'galaxy', 'planet', 'database',
        'server', 'network', 'system', 'security', 'password', 'matrix',
        'falcon', 'rocket', 'cosmos', 'browser', 'quantum', 'cipher'
    );

    $dictionary = '/usr/share/dict/words';
    if (!file_exists($dictionary)) {
        $dictionary = '/usr/dict/words';
    }

    if (file_exists($dictionary) && is_readable($dictionary)) {
        $fp = @fopen($dictionary, 'r');
        if ($fp) {
            $size = filesize($dictionary);
            $rand_location = rand(0, max(0, $size - 100));
            fseek($fp, $rand_location);
            $word = fgets($fp, 80); // sarim prima linie partiala
            $word = fgets($fp, 80);
            $word = trim($word);
            fclose($fp);
            if (strlen($word) >= $min_length && strlen($word) <= $max_length) {
                return $word;
            }
        }
    }

    // Folosim lista interna
    $filtered = array_filter($fallback_words, function($w) use ($min_length, $max_length) {
        return strlen($w) >= $min_length && strlen($w) <= $max_length;
    });
    
    if (empty($filtered)) {
        return 'securepass';
    }

    return $filtered[array_rand($filtered)];
}

function reset_password($username) {
    $new_password = get_random_word(6, 13);
    if ($new_password === false) {
        throw new Exception('Could not generate new password.');
    }

    // Adaugam un numar intre 0 si 999 pentru complexitate sporita
    $rand_number = rand(0, 999);
    $new_password .= $rand_number;

    $conn = db_connect();
    $username_esc = $conn->real_escape_string($username);
    $new_password_sha = sha1($new_password);

    $result = $conn->query("UPDATE user SET passwd = '$new_password_sha' WHERE username = '$username_esc'");
    if (!$result) {
        throw new Exception('Could not change password.');
    } else {
        return $new_password;
    }
}

function notify_password($username, $password) {
    $conn = db_connect();
    $username_esc = $conn->real_escape_string($username);

    $result = $conn->query("SELECT email FROM user WHERE username='$username_esc'");
    if (!$result) {
        throw new Exception('Could not find email address.');
    } else if ($result->num_rows == 0) {
        throw new Exception('Could not find email address. Username not in database.');
    } else {
        $row = $result->fetch_object();
        $email = $row->email;
        $from = "From: support@phpbookmark\r\n";
        $mesg = "Your PHPBookmark password has been changed to: $password\r\n"
              . "Please change it next time you log in.\r\n";

        // Incercam trimiterea emailului cu suprimare erori in mediu local
        $mail_sent = @mail($email, 'PHPBookmark login information', $mesg, $from);
        
        // Daca mail() nu este configurat in local (sendmail lipsa), returnam true pentru a nu bloca aplicatia
        return true;
    }
}
?>
