<?php
/**
 * member.php - Pagina de pornire a membrilor autentificati
 */

require_once 'bookmark_fns.php';

session_start();

// Daca a fost trimis formularul de login din login.php
if (isset($_POST['username']) && isset($_POST['passwd'])) {
    $username = trim($_POST['username']);
    $passwd = $_POST['passwd'];

    try {
        login($username, $passwd);
        $_SESSION['valid_user'] = $username;
    } catch (Exception $e) {
        do_html_header('Problem:');
        echo '<p style="color:red; font-weight:bold;">You could not be logged in. You must be logged in to view this page.</p>';
        do_html_url('login.php', 'Back to Login');
        do_html_footer();
        exit;
    }
}

do_html_header('Home');
check_valid_user();

// Regasire semne de carte ale utilizatorului
if ($url_array = get_user_urls($_SESSION['valid_user'])) {
    display_user_urls($url_array);
} else {
    display_user_urls(array());
}

display_user_menu();
do_html_footer();
?>
