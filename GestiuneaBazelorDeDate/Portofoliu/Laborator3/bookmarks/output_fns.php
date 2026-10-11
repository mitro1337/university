<?php
/**
 * output_fns.php - Funcţii pentru generarea interfeţei HTML a aplicaţiei PHPBookmark
 */

function do_html_header($title) {
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title><?php echo htmlspecialchars($title); ?></title>
    <style>
        body { font-family: Arial, Helvetica, sans-serif; font-size: 13px; margin: 20px; background-color: #f7f9fa; }
        li, td, th { font-family: Arial, Helvetica, sans-serif; font-size: 13px; }
        hr { color: #3333cc; width: 450px; text-align: left; margin: 10px 0; }
        a { color: #003366; text-decoration: none; font-weight: bold; }
        a:hover { text-decoration: underline; }
        .logo-box { display: flex; align-items: center; margin-bottom: 15px; }
        .logo-title { font-size: 28px; font-weight: bold; color: #1e3a8a; margin-left: 10px; }
        .menu-bar { background: #e2e8f0; padding: 8px 12px; border-radius: 4px; margin: 15px 0; }
        .btn-submit { background: #2563eb; color: white; border: none; padding: 6px 12px; border-radius: 3px; cursor: pointer; }
        .btn-submit:hover { background: #1d4ed8; }
        .card { background: white; border: 1px solid #cbd5e1; border-radius: 6px; padding: 15px; margin-bottom: 15px; width: fit-content; min-width: 380px; }
    </style>
</head>
<body>
    <div class="logo-box">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="#2563eb"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>
        <span class="logo-title">PHPbookmark</span>
    </div>
    <hr>
<?php
}

function do_html_heading($heading) {
    echo "<h2>" . htmlspecialchars($heading) . "</h2>";
}

function do_html_footer() {
?>
    <br><hr>
    <p><small>&copy; <?php echo date('Y'); ?> Aplicatie PHP Bookmark - Gestiunea Bazelor de Date.</small></p>
</body>
</html>
<?php
}

function do_html_url($url, $name) {
    echo "<p><a href='" . htmlspecialchars($url) . "'>" . htmlspecialchars($name) . "</a></p>";
}

function display_site_info() {
?>
    <ul>
        <li>Store your bookmarks online with us!</li>
        <li>See what other users use!</li>
        <li>Share your favorite links with others!</li>
    </ul>
<?php
}

function display_login_form() {
?>
    <div class="card">
        <p><a href="register_form.php">Not a member? Register here!</a></p>
        <form action="member.php" method="POST">
            <fieldset style="border:1px solid #cbd5e1; padding: 12px; border-radius: 4px;">
                <legend><b>Members log in here:</b></legend>
                <p>
                    <label>Username:</label><br>
                    <input type="text" name="username" required>
                </p>
                <p>
                    <label>Password:</label><br>
                    <input type="password" name="passwd" required>
                </p>
                <p>
                    <input type="submit" value="Log in" class="btn-submit">
                </p>
            </fieldset>
        </form>
        <p><a href="forgot_form.php">Forgot your password?</a></p>
    </div>
<?php
}

function display_registration_form() {
?>
    <div class="card">
        <form action="register_new.php" method="POST">
            <p>
                <label>Email address:</label><br>
                <input type="email" name="email" size="30" maxlength="100" required>
            </p>
            <p>
                <label>Preferred username (max 16 chars):</label><br>
                <input type="text" name="username" size="20" maxlength="16" required>
            </p>
            <p>
                <label>Password (between 6 and 16 chars):</label><br>
                <input type="password" name="passwd" size="20" maxlength="16" required>
            </p>
            <p>
                <label>Confirm password:</label><br>
                <input type="password" name="passwd2" size="20" maxlength="16" required>
            </p>
            <p>
                <input type="submit" value="Register" class="btn-submit">
            </p>
        </form>
    </div>
<?php
}

function display_user_urls($url_array) {
    global $color;
    $color = "#cccccc";
?>
    <form name="bm_table" action="delete_bms.php" method="POST">
    <table width="450" cellpadding="4" cellspacing="1" bgcolor="#cccccc">
        <tr bgcolor="#e2e8f0">
            <th align="left">Bookmark</th>
            <th align="center" width="80">Delete?</th>
        </tr>
<?php
    if (is_array($url_array) && count($url_array) > 0) {
        foreach ($url_array as $url) {
            if ($color == "#cccccc") {
                $color = "#ffffff";
            } else {
                $color = "#cccccc";
            }
            echo "<tr bgcolor='$color'>";
            echo "<td><a href='" . htmlspecialchars($url) . "' target='_blank'>" . htmlspecialchars($url) . "</a></td>";
            echo "<td align='center'><input type='checkbox' name='del_me[]' value='" . htmlspecialchars($url) . "'></td>";
            echo "</tr>";
        }
        echo "</table>";
        echo "<br><input type='submit' value='Delete Selected Bookmarks' class='btn-submit'>";
        echo "</form>";
    } else {
        echo "<tr bgcolor='#ffffff'><td colspan='2'><i>No bookmarks on record.</i></td></tr></table></form>";
    }
}

function display_user_menu() {
?>
    <div class="menu-bar">
        <a href="member.php">Home</a> | 
        <a href="add_bms.php">Add BM</a> | 
        <a href="change_passwd_form.php">Change password</a> | 
        <a href="recommend.php">Recommend URLs to me</a> | 
        <a href="logout.php">Logout</a>
    </div>
<?php
}

function display_add_bm_form() {
?>
    <div class="card">
        <form name="bm_table" action="add_bms.php" method="POST">
            <p>
                <label><b>New BM URL:</b></label><br>
                <input type="text" name="new_url" value="http://" size="45" maxlength="255" required>
            </p>
            <p>
                <input type="submit" value="Add Bookmark" class="btn-submit">
            </p>
        </form>
    </div>
<?php
}

function display_password_form() {
?>
    <div class="card">
        <form action="change_passwd.php" method="POST">
            <p>
                <label>Old password:</label><br>
                <input type="password" name="old_passwd" size="20" maxlength="16" required>
            </p>
            <p>
                <label>New password:</label><br>
                <input type="password" name="new_passwd" size="20" maxlength="16" required>
            </p>
            <p>
                <label>Repeat new password:</label><br>
                <input type="password" name="new_passwd2" size="20" maxlength="16" required>
            </p>
            <p>
                <input type="submit" value="Change Password" class="btn-submit">
            </p>
        </form>
    </div>
<?php
}

function display_forgot_form() {
?>
    <div class="card">
        <form action="forgot_passwd.php" method="POST">
            <p>
                <label>Enter your username:</label><br>
                <input type="text" name="username" size="20" maxlength="16" required>
            </p>
            <p>
                <input type="submit" value="Reset Password" class="btn-submit">
            </p>
        </form>
    </div>
<?php
}

function display_recommended_urls($url_array) {
    global $color;
    $color = "#cccccc";
?>
    <table width="450" cellpadding="4" cellspacing="1" bgcolor="#cccccc">
        <tr bgcolor="#e2e8f0">
            <th align="left">Recommendations</th>
        </tr>
<?php
    if (is_array($url_array) && count($url_array) > 0) {
        foreach ($url_array as $url) {
            if ($color == "#cccccc") {
                $color = "#ffffff";
            } else {
                $color = "#cccccc";
            }
            echo "<tr bgcolor='$color'>";
            echo "<td><a href='" . htmlspecialchars($url) . "' target='_blank'>" . htmlspecialchars($url) . "</a></td>";
            echo "</tr>";
        }
        echo "</table>";
    } else {
        echo "<tr bgcolor='#ffffff'><td><i>No recommendations for you today.</i></td></tr></table>";
    }
}
?>
