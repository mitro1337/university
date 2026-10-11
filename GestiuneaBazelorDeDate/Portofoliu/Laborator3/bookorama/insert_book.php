<?php
/**
 * Book-O-Rama Book Entry Results
 * Validarea datelor şi inserarea unei noi cărţi în baza de date
 */

header('Content-Type: text/html; charset=UTF-8');

echo "<h2>Book-O-Rama Book Entry Results</h2><hr>";

$isbn = isset($_POST['isbn']) ? trim($_POST['isbn']) : '';
$author = isset($_POST['author']) ? trim($_POST['author']) : '';
$title = isset($_POST['title']) ? trim($_POST['title']) : '';
$price = isset($_POST['price']) ? trim($_POST['price']) : '';

// 1. Validare câmpuri obligatorii
if (!$isbn || !$author || !$title || !$price) {
    echo "<p style='color:red;'>You have not entered all the required details.<br>Please go back and try again.</p>";
    echo "<p><a href='newbook.html'>Back to form</a></p>";
    exit;
}

if (!is_numeric($price)) {
    echo "<p style='color:red;'>Price must be a valid numeric value!</p>";
    echo "<p><a href='newbook.html'>Back to form</a></p>";
    exit;
}

// 2. Conectare la baza de date
@ $db = new mysqli('localhost', 'bookorama', 'bookorama123', 'books');
if ($db->connect_errno) {
    @ $db = new mysqli('localhost', 'root', '', 'books');
}

if ($db->connect_errno) {
    echo "<p style='color:red;'>Error: Could not connect to database. Please try again later.<br>";
    echo "Details: " . $db->connect_error . "</p>";
    exit;
}

// 3. Inserarea cărţii în BD
$isbn_esc = $db->real_escape_string($isbn);
$author_esc = $db->real_escape_string($author);
$title_esc = $db->real_escape_string($title);
$price_val = floatval($price);

$query = "INSERT INTO books (isbn, author, title, price) VALUES ('$isbn_esc', '$author_esc', '$title_esc', $price_val)";
$result = $db->query($query);

if ($result) {
    echo "<p style='color:green; font-weight:bold;'>" . $db->affected_rows . " book inserted into database.</p>";
} else {
    echo "<p style='color:red;'>An error has occurred. The item was not added.<br>";
    echo "Details: " . $db->error . "</p>";
}

$db->close();

echo "<br><p><a href='newbook.html'>Add another book</a> | <a href='search.html'>Search catalog</a></p>";
?>
