<?php
/**
 * register_new.php - Procesarea inregistrarii utilizatorului
 */

require_once 'bookmark_fns.php';

session_start();

$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$username = isset($_POST['username']) ? trim($_POST['username']) : '';
$passwd = isset($_POST['passwd']) ? $_POST['passwd'] : '';
$passwd2 = isset($_POST['passwd2']) ? $_POST['passwd2'] : '';

try {
    // 1. Verificare completare campuri
    if (!filled_out($_POST)) {
        throw new Exception('You have not filled the form out correctly - please go back and try again.');
    }

    // 2. Verificare adresa de e-mail
    if (!valid_email($email)) {
        throw new Exception('That is not a valid email address. Please go back and try again.');
    }

    // 3. Verificare concordanta parole
    if ($passwd !== $passwd2) {
        throw new Exception('The passwords you entered do not match - please go back and try again.');
    }

    // 4. Verificare lungime parola
    if ((strlen($passwd) < 6) || (strlen($passwd) > 16)) {
        throw new Exception('Your password must be between 6 and 16 characters. Please go back and try again.');
    }

    // 5. Inregistrare in baza de date
    register($username, $email, $passwd);

    // 6. Inregistrare variabila in sesiune
    $_SESSION['valid_user'] = $username;

    // 7. Afisare mesaj de succes
    do_html_header('Registration successful');
    echo '<p style="color:green; font-weight:bold;">Your registration was successful. Go to the members page to start setting up your bookmarks!</p>';
    do_html_url('member.php', 'Go to members page');
    do_html_footer();

} catch (Exception $e) {
    do_html_header('Problem:');
    echo '<p style="color:red; font-weight:bold;">' . htmlspecialchars($e->getMessage()) . '</p>';
    do_html_url('register_form.php', 'Back to registration');
    do_html_footer();
    exit;
}
?>
