<?php
/**
 * recommend.php - Afisare recomandari inteligente de semne de carte
 */

require_once 'bookmark_fns.php';

session_start();

do_html_header('Recommended URLs');
check_valid_user();

try {
    $urls = recommend_urls($_SESSION['valid_user']);
    display_recommended_urls($urls);
} catch (Exception $e) {
    echo '<p><i>' . htmlspecialchars($e->getMessage()) . '</i></p>';
}

display_user_menu();
do_html_footer();
?>
