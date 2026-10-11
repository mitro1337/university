<?php
/**
 * add_bms.php - Formular si procesare adaugare semn de carte nou
 */

require_once 'bookmark_fns.php';

session_start();

do_html_header('Add Bookmarks');
check_valid_user();

if (isset($_POST['new_url'])) {
    $new_url = $_POST['new_url'];
    try {
        add_bm($new_url);
        echo '<p style="color:green; font-weight:bold;">Bookmark added successfully.</p>';
        if ($url_array = get_user_urls($_SESSION['valid_user'])) {
            display_user_urls($url_array);
        }
    } catch (Exception $e) {
        echo '<p style="color:red; font-weight:bold;">' . htmlspecialchars($e->getMessage()) . '</p>';
        display_add_bm_form();
    }
} else {
    display_add_bm_form();
}

display_user_menu();
do_html_footer();
?>
