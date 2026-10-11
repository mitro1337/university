<?php
/**
 * forgot_passwd.php - Procesare resetare parola uitata
 */

require_once 'bookmark_fns.php';

do_html_header('Resetting Password');

$username = isset($_POST['username']) ? trim($_POST['username']) : '';

try {
    if (empty($username)) {
        throw new Exception('Please enter your username.');
    }

    $password = reset_password($username);
    notify_password($username, $password);

    echo '<p style="color:green; font-weight:bold;">Your new password has been generated and emailed to you.</p>';
    echo '<p><small>(Pentru testare locala fara server SMTP configurat: Noua parola este <code>' . htmlspecialchars($password) . '</code>)</small></p>';

} catch (Exception $e) {
    echo '<p style="color:red; font-weight:bold;">' . htmlspecialchars($e->getMessage()) . '</p>';
}

do_html_url('login.php', 'Back to Login');
do_html_footer();
?>
