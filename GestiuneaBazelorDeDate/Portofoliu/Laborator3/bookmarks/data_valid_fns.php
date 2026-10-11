<?php
/**
 * data_valid_fns.php - Funcţii de validare a datelor introduse de utilizator
 */

function filled_out($form_vars) {
    // Verifica daca toate campurile din vector au o valoare completata
    foreach ($form_vars as $key => $value) {
        if (!isset($key) || (trim($value) === '')) {
            return false;
        }
    }
    return true;
}

function valid_email($address) {
    // Verificam validitatea adresei de e-mail (folosind filter_var standard si compatibil PHP 7/8)
    if (filter_var($address, FILTER_VALIDATE_EMAIL)) {
        return true;
    }
    
    // Verificare alternativa cu regex
    if (preg_match('/^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/', $address)) {
        return true;
    }

    return false;
}
?>
