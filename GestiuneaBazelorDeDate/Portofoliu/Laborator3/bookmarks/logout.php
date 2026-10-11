<?php
/**
 * logout.php - Inchiderea sesiunii de lucru si deconectarea utilizatorului
 */

require_once 'bookmark_fns.php';

session_start();

$old_user = isset($_SESSION['valid_user']) ? $_SESSION['valid_user'] : null;

// Distrugem sesiunea de lucru
unset($_SESSION['valid_user']);
$result_dest = session_destroy();

do_html_header('Logging Out');

if (!empty($old_user)) {
    if ($result_dest) {
        echo '<p style="color:green; font-weight:bold;">Logged out successfully.</p>';
        do_html_url('login.php', 'Back to Login Page');
    } else {
        echo '<p style="color:red;">Could not log you out.</p>';
    }
} else {
    echo '<p>You were not logged in, and so have not been logged out.</p>';
    do_html_url('login.php', 'Back to Login Page');
}

do_html_footer();
?>
