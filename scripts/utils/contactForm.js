//Afficher le formulaire de contact
function displayModal() {
    const modal = document.getElementById('contact_modal');
    const main = document.getElementById('main');
    const header = document.querySelector('header');
    const closeButton = document.querySelector('.modal header img');
    const floatingWindows = document.querySelector('.floating-windows');
    modal.style.display = 'block';
    main.style.display = 'none';
    header.style.display = 'none';
    floatingWindows.style.display = 'none';
    modal.setAttribute('aria-hidden', 'false');
    main.setAttribute('aria-hidden', 'true');
    header.setAttribute('aria-hidden', 'true');
    floatingWindows.setAttribute('aria-hidden', 'true');
    modal.focus();
}

//utilisation du clavier pour la navigation
document.addEventListener('keydown', (e) => {
    const keyCode = e.keyCode ? e.keyCode : e.which;
 
    if(keyCode === 27 ) {
        closeLightbox();
    }
});

//fermer le formulaire de contact
function closeModal() {
    const modal = document.getElementById('contact_modal');
    const main = document.getElementById('main');
    const header = document.querySelector('header');
    const floatingWindows = document.querySelector('.floating-windows');
    modal.style.display = 'none';
    main.style.display = 'block';
    header.style.display = 'flex';
    floatingWindows.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'true');
    main.setAttribute('aria-hidden', 'false');
    header.setAttribute('aria-hidden', 'false');
    floatingWindows.setAttribute('aria-hidden', 'false');
}

//Envoie des information du formulaire de contact
function sendFormContact() {
    const prenom = document.forms['modal-form']['first'];
    const nom = document.forms['modal-form']['last'];
    const email = document.forms['modal-form']['email'];
    const message = document.forms['modal-form']['message'];
    let validation = true;

    //vérification du prénom
    if (prenom.value.length <= 0) {
        prenom.parentElement.setAttribute('data-error-visible', 'true');
        validation = false;
    } else {
        prenom.parentElement.removeAttribute('data-error-visible');
    }

    //vérification du nom
    if (nom.value.length <= 0) {
        nom.parentElement.setAttribute('data-error-visible', 'true');
        validation = false;
    } else {
        nom.parentElement.removeAttribute('data-error-visible');
    }

    //vérification de l'email
    if (email.value.length === 0 || !verifEMail(email.value)) {
        email.parentElement.setAttribute('data-error-visible', 'true');
        validation = false;
    } else {
        email.parentElement.removeAttribute('data-error-visible');
    }

    //vérification du message 
    if (message.value.length <= 0) {
        message.parentElement.setAttribute('data-error-visible', 'true');
        validation = false;
    } else {
        message.parentElement.removeAttribute('data-error-visible');
    }

    //Afficher le message de validation
    if (validation) {
        console.log('prénom : ' + prenom.value);
        console.log('nom : ' + nom.value);
        console.log('email : ' + email.value);
        console.log('le message : ' + message.value);
        prenom.value = '';
        nom.value = '';
        email.value = '';
        message.value = '';
        closeModal();
    }
}

//Vérification de l'email
function verifEMail(_email) {
    let validation = true;
    let compteurDeA = 0;

    // vérification de chaque caractère
    for (let i = 0; i < _email.length; i++) {

        //vérification des caractère interdit 
        if (_email[i] !== '-' && _email[i] !== '.' && _email[i] < '0' || _email[i] > '9' && _email[i] !== '@' && _email[i] < 'A' || _email[i] > 'Z' && _email[i] < 'a' || _email[i] > 'z' && _email[i] !== '-' && _email[i] !== '.') {
            validation = false;
        }

        //compte du nombre de '@'
        if (_email[i] === '@') {
            compteurDeA++;
        }
    }

    //vérification de la quantité de '@' et la position des '.'
    if (compteurDeA !== 1 || _email.indexOf('.', (_email.indexOf('@') + 2)) === -1) {
        validation = false;
    }

    //vérification du premier caractère
    if (_email[0] >= '0' && _email[0] <= '9') {
        validation = false;
    }

    return validation;
}

var tabbableElements = 'a[href], area[href], input:not([disabled]),' +
	'select:not([disabled]), textarea:not([disabled]),' +
	'button:not([disabled]), iframe, object, embed, *[tabindex],' +
	'*[contenteditable]';

var keepFocus = function (context) {
	var allTabbableElements = context.querySelectorAll(tabbableElements);
	var firstTabbableElement = allTabbableElements[0];
	var lastTabbableElement = allTabbableElements[allTabbableElements.length - 1];

	var keyListener = function (event) {
		var keyCode = event.which || event.keyCode; // Get the current keycode

		// Polyfill to prevent the default behavior of events
		event.preventDefault = event.preventDefault || function () {
			event.returnValue = false;
		};

		// If it is TAB
		if (keyCode === 9) {

			// Move focus to first element that can be tabbed if Shift isn't used
			if (event.target === lastTabbableElement && !event.shiftKey) {
				event.preventDefault();
				firstTabbableElement.focus();

			// Move focus to last element that can be tabbed if Shift is used
			} else if (event.target === firstTabbableElement && event.shiftKey) {
				event.preventDefault();
				lastTabbableElement.focus();
			}
		}
	};

	context.addEventListener('keydown', keyListener, false);
};

// Call the function when the part of the page gets focus
var modal = document.querySelector('.modal');
keepFocus(modal);

modal.focus();