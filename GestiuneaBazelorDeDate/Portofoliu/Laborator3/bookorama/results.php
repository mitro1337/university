<?php
/**
 * Book-O-Rama Search Results
 * Interogarea bazei de date books şi afişarea cărţilor găsite
 */

header('Content-Type: text/html; charset=UTF-8');

echo "<h2>Book-O-Rama Search Results</h2><hr>";

// 1. Verificarea și filtrarea datelor provenite de la utilizator
if (!isset($_POST['searchtype']) || !isset($_POST['searchterm'])) {
    echo "<p style='color:red;'>You have not entered search details. Please go back and try again.</p>";
    echo "<p><a href='search.html'>Back to search</a></p>";
    exit;
}

$searchtype = $_POST['searchtype'];
$searchterm = trim($_POST['searchterm']);

if (!$searchtype || !$searchterm) {
    echo "<p style='color:red;'>You have not entered search details. Please go back and try again.</p>";
    echo "<p><a href='search.html'>Back to search</a></p>";
    exit;
}

// Validare tip de căutare permis
if (!in_array($searchtype, array('author', 'title', 'isbn'))) {
    echo "<p style='color:red;'>Invalid search type.</p>";
    exit;
}

// 2. Configurarea unei conexiuni la BD cu utilizatorul bookorama
@ $db = new mysqli('localhost', 'bookorama', 'bookorama123', 'books');

// Fallback la root dacă utilizatorul bookorama nu a fost încă creat în mediul local
if ($db->connect_errno) {
    @ $db = new mysqli('localhost', 'root', '', 'books');
}

if ($db->connect_errno) {
    echo "<p style='color:red;'>Error: Could not connect to database. Please try again later.<br>";
    echo "Details: " . $db->connect_error . "</p>";
    exit;
}

// 3. Interogarea BD
$searchterm_escaped = $db->real_escape_string($searchterm);
$query = "SELECT * FROM books WHERE " . $searchtype . " LIKE '%" . $searchterm_escaped . "%'";
$result = $db->query($query);

if (!$result) {
    echo "<p style='color:red;'>Error executing query: " . $db->error . "</p>";
    $db->close();
    exit;
}

// 4. Regăsirea rezultatelor
$num_results = $result->num_rows;
echo "<p><b>Number of books found:</b> $num_results</p><br>";

// 5. Prezentarea rezultatelor la utilizator
for ($i = 0; $i < $num_results; $i++) {
    $row = $result->fetch_assoc();
    echo "<p><b>" . ($i + 1) . ". Title:</b> ";
    echo htmlspecialchars(stripslashes($row['title']));
    echo "<br><b>Author:</b> ";
    echo htmlspecialchars(stripslashes($row['author']));
    echo "<br><b>ISBN:</b> ";
    echo htmlspecialchars(stripslashes($row['isbn']));
    echo "<br><b>Price:</b> \$";
    echo htmlspecialchars(stripslashes($row['price']));
    echo "</p><hr width='40%' align='left'>";
}

// 6. Eliberarea setului de rezultate și închiderea conexiunii
$result->free();
$db->close();

echo "<br><p><a href='search.html'>Search again</a> | <a href='newbook.html'>Add new book</a></p>";
?>
