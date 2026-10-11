<?php
/**
 * Problema rezolvată 11: Lucrul cu variabile, tipuri de date şi vectori în PHP
 */

header('Content-Type: text/html; charset=UTF-8');

echo "<h2>Problema rezolvata 11: Variabile si Vectori in PHP</h2><hr>";

// 1. Variabile numerice
$variabila = 1;
$numar = 0;
echo "<b>Variabile numerice:</b> \$variabila = $variabila, \$numar = $numar <br><br>";

// 2. Variabile text (stringuri)
$text = "Salut";
$text2 = 'Ce faci?';
echo "<b>Variabile text:</b> $text! $text2 <br><br>";

// 3. Variabile logice (boolean)
$stiuPHP = true;
$uitRepede = false;
echo "<b>Variabile logice:</b> \$stiuPHP = " . ($stiuPHP ? 'adevarat (true)' : 'fals (false)') . ", ";
echo "\$uitRepede = " . ($uitRepede ? 'adevarat (true)' : 'fals (false)') . "<br><br>";

// 4. Vectori indexati numeric
$vectorGol = array();
$vectorSimplu = array(10, 11, 12, 13);
echo "<b>Vector simplu indexat:</b> ";
print_r($vectorSimplu);
echo "<br><br>";

// 5. Vector asociativ (chei alfanumerice)
$vectorAsociativ = array(
    'luni' => 'Monday',
    'marti' => 'Tuesday',
    'miercuri' => 'Wednesday'
);

// Definirea unei noi componente intr-un vector asociativ
$vectorAsociativ['joi'] = 'Thursday';

echo "<b>Vector asociativ zile:</b><br>";
foreach ($vectorAsociativ as $ro => $en) {
    echo "Ziua in romana: <i>$ro</i> => Ziua in engleza: <b>$en</b><br>";
}
echo "<br>";

// Vector simplu definit cu chei numerice explicite (echivalentul lui $vectorSimplu)
$vectorS2 = array(
    0 => 10,
    1 => 11,
    2 => 12,
    3 => 13
);

// 6. Observatie importanta: Case sensitivity la nume de variabile
$variabila = "negru";
$vaRiabila = "alb";
$Variabila = 1;

echo "<b>Demonstratie Case-Sensitivity (PHP distinge majusculele de minuscule):</b><br>";
echo "\$variabila = $variabila <br>";
echo "\$vaRiabila = $vaRiabila <br>";
echo "\$Variabila = $Variabila <br>";
?>
