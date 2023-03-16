// ==========================================================================
// We need to have a variable that controls which language to use.
// In this file we only show the simplest version of language change.
// How to do this with more than two languages, is left as an
// exercise.
//

let language = 'en';

// ==========================================================================
// The dictionary consists of a simple JSON structure. It also keeps
// track of the different keys that are available  for IDs.
//
dict = {
    // keys for strings
    'keys' :
        ['guest-mode-text',
            'show-login-popup-button',
            'menu-header',
            'username-label',
            'password-label',
            'login-button',
            'login_as_guest',
            'credit-label',
            'deposit-button',
            'logout-button',
            'deposit-popup-label',
            'deposit-popup-button',
            'current-order-label',
            'empty-order-message',
            'thank-you-order-message',
            'order-button',
            'order-total-label',
            'comment-popup-label',
            'comment-submit'
    ],

    // We use one JSON substructure for each language. If we have
    // many different languages and a large set of strings we might
    // need to store a JSON file for each language to be loaded on
    // request.
    //
    'en': {
        'guest-mode-text' : "You are in guest mode.",
        'show-login-popup-button': "Press to login",
        'menu-header' : 'Menu',
        'username-label' : 'Username:',
        'password-label' : 'Password:',
        'login-button' : 'Login',
        'login_as_guest' : 'Continue as guest',
        'credit-label' : 'Balance: ', //Include space at the end
        'deposit-button' : 'Deposit money',
        'logout-button' : 'Logout',
        'deposit-popup-label' : 'Enter amount to add:',
        'deposit-popup-button' : 'Add to balance',
        'current-order-label' : 'Current Order',
        'empty-order-message' : 'Your order is empty',
        'thank-you-order-message' : 'Thank you for your order',
        'order-button' : 'Place order',
        'order-total-label' : 'Total: ', //Include space at the end
        'comment-popup-label' : 'Add comment to ', //Include space at the end
        'comment-submit' : 'Add comment'
    },
    'sv' : {
        'guest-mode-text' : "Du tittar som gäst.",
        'show-login-popup-button' : "Logga in",
        'menu-header' : 'Meny',
        'username-label' : 'Användarnamn:',
        'password-label' : 'Lösenord:',
        'login-button' : 'Logga in',
        'login_as_guest' : 'Fortsätt som gäst',
        'credit-label' : 'Saldo: ', //Include space at the end
        'deposit-button' : 'Lägg in pengar',
        'logout-button' : 'Logga ut',
        'deposit-popup-label' : 'Ange belopp',
        'deposit-popup-button' : 'Lägg till',
        'current-order-label' : 'Din beställning',
        'empty-order-message' : 'Din beställning är tom',
        'thank-you-order-message' : 'Tack för din beställning',
        'order-button' : 'Beställ',
        'order-total-label' : 'Summa: ', //Include space at the end
        'comment-popup-label' : 'Lägg till kommentar för ', //Include space at the end
        'comment-submit' : 'Lägg till kommentar'
    },
    // FILL WITH TURKISH TRANSLATION
    'tr': {
        'guest-mode-text' : "You are in guest mode.",
        'show-login-popup-button': "Press to login",
        'menu-header' : 'Menu',
        'username-label' : 'Username:',
        'password-label' : 'Password:',
        'login-button' : 'Login',
        'login_as_guest' : 'Continue as guest',
        'credit-label' : 'Balance: ', //Include space at the end
        'deposit-button' : 'Deposit money',
        'logout-button' : 'Logout',
        'deposit-popup-label' : 'Enter amount to add:',
        'deposit-popup-button' : 'Add to balance',
        'current-order-label' : 'Current Order',
        'empty-order-message' : 'Your order is empty',
        'thank-you-order-message' : 'Thank you for your order',
        'order-button' : 'Place order',
        'order-total-label' : 'Total: ', //Include space at the end
        'comment-popup-label' : 'Add comment to ', //Include space at the end
        'comment-submit' : 'Add comment'
    },

    'de': {
        'guest-mode-text' : "Als Gast eingeloggt",
        'show-login-popup-button': "Zum Login",
        'menu-header' : 'Menü',
        'username-label' : 'Benutzername:',
        'password-label' : 'Passwort:',
        'login-button' : 'Login',
        'login_as_guest' : 'Als Gast fortsetzen',
        'credit-label' : 'Guthaben: ', //Include space at the end
        'deposit-button' : 'Guthaben aufladen',
        'logout-button' : 'Logout',
        'deposit-popup-label' : 'Betrag eingeben:',
        'deposit-popup-button' : 'Zu Guthaben hinzufügen',
        'current-order-label' : 'Aktuelle Bestellung',
        'empty-order-message' : 'Leere Bestellung',
        'thank-you-order-message' : 'Vielen Dank für Ihre Bestellung',
        'order-button' : 'Bestellung aufgeben',
        'order-total-label' : 'Total: ', //Include space at the end
        'comment-popup-label' : 'Kommentar hinzufügen ', //Include space at the end
        'comment-submit' : 'Hinzufügen'
    },
}

// This function will return the appropriate string for each
// key. The language handling is made "automatic".
//
function get_string(key) {
    return dict[language][key];
}

// This function is the simplest possible. However, in order
// to handle many different languages it will not be sufficient.
// The necessary change should not be difficult to implement.
//
// After each language change, we will need to update the view, to propagate
// the change to the whole view.
//

function update_view() {
    let keys = dict['keys'];
    for (let idx in keys) {
        let key = keys[idx];
        $("#" + key).text(get_string(key));
    };
    let pics = dict['pics'];
    for (let idx in pics) {
        let pic = pics[idx];
        $("#" + pic).attr('src', get_string(pic));
    };
}

function change_lang(lang) {
    language = lang;
    update_view();
}

// ==========================================================================
// END OF FILE
// ==========================================================================
