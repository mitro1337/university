<?php
/**
 * login.php - Pagina principala a aplicatiei de gestionare a semnelor de carte
 */

require_once 'bookmark_fns.php';

session_start();

do_html_header('Welcome to PHPbookmark');
display_site_info();
display_login_form();
do_html_footer();
?>
