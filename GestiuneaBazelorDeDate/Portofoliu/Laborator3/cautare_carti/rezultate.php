<?php
/**
 * Problema rezolvată 13: Căutarea cărţilor în baza de date MySQL cu biblioteca MySQLi
 */

header('Content-Type: text/html; charset=UTF-8');

echo "<h2>Rezultate cautare carti</h2><hr>";

// 1. Verificarea şi filtrarea datelor primite de la utilizator
if (!isset($_POST['tipcautare']) || !isset($_POST['termencautat'])) {
    echo "<p style='color:red;'>Nu ati introdus detaliile cautarii. Va rugam sa reveniti la pagina anterioara.</p>";
    echo "<p><a href='search.html'>Inapoi la cautare</a></p>";
    exit;
}

$tipcautare = $_POST['tipcautare'];
$termencautat = trim($_POST['termencautat']);

if (!$tipcautare || !$termencautat) {
    echo "<p style='color:red;'>Trebuie sa introduceti un termen de cautare!</p>";
    echo "<p><a href='search.html'>Inapoi la cautare</a></p>";
    exit;
}

// Filtrare suplimentara pentru campul de cautare (securitate anti SQL injection)
if (!in_array($tipcautare, array('autor', 'titlu'))) {
    echo "<p style='color:red;'>Tip de cautare invalid!</p>";
    exit;
}

// 2. Configurarea conexiunii la BD
// Setati parametrii corespunzatori mediului local (host, user, pass, db)
@ $db = new mysqli('localhost', 'root', '', 'carti');

if (mysqli_connect_errno()) {
    echo "<p style='color:red;'>Eroare: Nu s-a putut realiza conexiunea la baza de date. Incercati mai tarziu.<br>";
    echo "Detalii eroare: " . mysqli_connect_error() . "</p>";
    exit;
}

// 3. Interogarea BD
$termen_escaped = $db->real_escape_string($termencautat);
$query = "SELECT * FROM carti WHERE " . $tipcautare . " LIKE '%" . $termen_escaped . "%'";
$rezultat = $db->query($query);

if (!$rezultat) {
    echo "<p style='color:red;'>Eroare la executia interogarii: " . $db->error . "</p>";
    $db->close();
    exit;
}

// 4. Regăsirea rezultatelor
$nr_rezultate = $rezultat->num_rows;
echo "<p><b>Numar de carti gasite:</b> $nr_rezultate</p><br>";

// 5. Prezentarea rezultatelor la utilizator
for ($i = 0; $i < $nr_rezultate; $i++) {
    $rand = $rezultat->fetch_assoc();
    echo "<b>" . ($i + 1) . ". Titlu:</b> ";
    echo htmlspecialchars(stripslashes($rand['titlu']));
    echo "<br><b>Autor:</b> ";
    echo htmlspecialchars(stripslashes($rand['autor']));
    echo "<br><b>ISBN:</b> ";
    echo htmlspecialchars(stripslashes($rand['isbn']));
    echo "<br><b>Pret:</b> ";
    echo htmlspecialchars(stripslashes($rand['pret'])) . " RON";
    echo "<br><hr width='30%' align='left'>";
}

// 6. Eliberarea memoriei şi închiderea conexiunii
$rezultat->free();
$db->close();

echo "<br><p><a href='search.html'>Efectuati o noua cautare</a></p>";
?>
