<?php
/**
 * Modul de gestionare a datelor despre anunturi prin sesiune
 */

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

/**
 * Functie auxiliara pentru initializarea si citirea listei de anunturi din memorie/sesiune
 */
function citireDate() {
    if (!isset($_SESSION['anunturi']) || !is_array($_SESSION['anunturi'])) {
        // Anunturi implicite de test
        $_SESSION['anunturi'] = array(
            array(
                'nume' => 'Popescu George',
                'telefon' => '0722111222',
                'email' => 'george@exemplu.ro',
                'oras' => 'Bucuresti',
                'continut' => 'Vand manuale de baze de date MySQL si programare PHP in stare excelenta.'
            ),
            array(
                'nume' => 'Ionescu Andreea',
                'telefon' => '0744333444',
                'email' => 'andreea@exemplu.ro',
                'oras' => 'Cluj-Napoca',
                'continut' => 'Caut coleg/colega de apartament in zona centrala.'
            )
        );
    }
    return $_SESSION['anunturi'];
}

/**
 * Functie pentru adaugarea unui anunt nou in sesiune
 */
function adaugaAnunt($nume, $telefon, $email, $oras, $continut) {
    if (!isset($_SESSION['anunturi'])) {
        citireDate();
    }
    $_SESSION['anunturi'][] = array(
        'nume' => $nume,
        'telefon' => $telefon,
        'email' => $email,
        'oras' => $oras,
        'continut' => $continut
    );
    return true;
}
?>
