<?php
/**
 * change_passwd.php - Procesare schimbare parola utilizator
 */

require_once 'bookmark_fns.php';

session_start();

do_html_header('Changing Password');
check_valid_user();

$old_passwd = isset($_POST['old_passwd']) ? $_POST['old_passwd'] : '';
$new_passwd = isset($_POST['new_passwd']) ? $_POST['new_passwd'] : '';
$new_passwd2 = isset($_POST['new_passwd2']) ? $_POST['new_passwd2'] : '';

try {
    if (!filled_out($_POST)) {
        throw new Exception('You have not filled out the form completely. Please try again.');
    }

    if ($new_passwd !== $new_passwd2) {
        throw new Exception('Passwords entered were not the same. Not changed.');
    }

    if ((strlen($new_passwd) > 16) || (strlen($new_passwd) < 6)) {
        throw new Exception('New password must be between 6 and 16 characters. Try again.');
    }

    // Incercam actualizarea parolei
    change_password($_SESSION['valid_user'], $old_passwd, $new_passwd);
    echo '<p style="color:green; font-weight:bold;">Password changed successfully.</p>';

} catch (Exception $e) {
    echo '<p style="color:red; font-weight:bold;">' . htmlspecialchars($e->getMessage()) . '</p>';
}

display_user_menu();
do_html_footer();
?>
