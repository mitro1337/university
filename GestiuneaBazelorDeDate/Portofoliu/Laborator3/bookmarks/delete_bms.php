<?php
/**
 * delete_bms.php - Procesare stergere semne de carte selectate
 */

require_once 'bookmark_fns.php';

session_start();

do_html_header('Deleting Bookmarks');
check_valid_user();

if (isset($_POST['del_me']) && is_array($_POST['del_me']) && count($_POST['del_me']) > 0) {
    $del_me = $_POST['del_me'];
    $valid_user = $_SESSION['valid_user'];

    foreach ($del_me as $url) {
        try {
            delete_bm($valid_user, $url);
            echo '<p style="color:green;">Deleted: ' . htmlspecialchars($url) . '</p>';
        } catch (Exception $e) {
            echo '<p style="color:red;">Could not delete ' . htmlspecialchars($url) . ': ' . htmlspecialchars($e->getMessage()) . '</p>';
        }
    }
} else {
    echo '<p style="color:orange;">No bookmarks were selected for deletion.</p>';
}

if ($url_array = get_user_urls($_SESSION['valid_user'])) {
    display_user_urls($url_array);
} else {
    display_user_urls(array());
}

display_user_menu();
do_html_footer();
?>
