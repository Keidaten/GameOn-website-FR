function editNav() {
	var x = document.getElementById('myTopnav');
	if (x.className === 'topnav') {
		x.className += ' responsive';
	} else {
		x.className = 'topnav';
	}
}

// Modal elements
const modalbg = document.querySelector('.bground');
const modalBtn = document.querySelectorAll('.modal-btn');
const crossModal = document.querySelector('.close');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

// Close modal event
crossModal.addEventListener('click', closeModal);

// launch modal form
function launchModal() {
	modalbg.style.display = 'block';
}

// Close modal form
function closeModal() {
	modalbg.style.display = 'none';
}

//                            //
//     Feedbacks for user     //
//                            //

//create text feedbacks for users // errorElement to target div error element, errorInnerText to chose error message to apply
function feedbackMessage(errorElement, errorInnerText) {
	errorElement.innerText = errorInnerText;
	errorElement.style.fontSize = '65%';
	errorElement.style.color = 'red';
}

//create visual feedbacks for user // formDataElement to target form input, borderColor to chose border color to apply
function feedbackVisual(formDataElement, borderColor) {
	formDataElement.focus();
	formDataElement.style.borderColor = borderColor;
}

//Create feedback for user when form submitted
const header = document.getElementById('myTopnav');

function feedbackFormValid() {
	let feedbackSpan = document.createElement('span');
	feedbackSpan.innerText = 'Merci ! Votre réservation a été reçue.';
	feedbackSpan.style.backgroundColor = 'lightgreen';
	feedbackSpan.style.margin = '0px 40px 0px 40px';
	feedbackSpan.style.padding = '10px';
	feedbackSpan.style.textAlign = 'Center';
	feedbackSpan.style.borderRadius = '10px';
	header.insertAdjacentElement('afterend', feedbackSpan);
}

//Display feedback if form submitted
if (window.location.href.indexOf('?first=') > -1) {
	feedbackFormValid();
}

//                            //
// Check if inputs are valid  //
//                            //

let firstNameIsValid = false;
let lastNameIsValid = false;
let emailIsValid = false;
let tourneyIsValid = false;
let cityIsValid = false;
let cguIsValid = false;

//Check if first name is valid
const firstName = document.querySelector('#first');
const errorMsgFirstName = document.querySelector('#errorMsgFirstName');

function verifyFirstName() {
	if (!firstName.value.match(/^[a-z'-]+$/i) || firstName.value.length < 2 || firstName.value == ' ' || firstName.value == null) {
		feedbackMessage(errorMsgFirstName, 'Veuillez vérifier votre prénom');
		feedbackVisual(firstName, 'red');
	} else {
		feedbackMessage(errorMsgFirstName, null);
		feedbackVisual(firstName, 'green');
		firstNameIsValid = true;
	}
}

//Check if last name is valid
const lastName = document.querySelector('#last');
const errorMsgLastName = document.querySelector('#errorMsgLastName');

function verifyLastName() {
	if (!lastName.value.match(/^[a-z'-]+$/i) || lastName.value.length < 2 || lastName.value == ' ' || lastName.value == null) {
		feedbackMessage(errorMsgLastName, 'Veuillez vérifier votre nom de famille');
		feedbackVisual(lastName, 'red');
	} else {
		feedbackMessage(errorMsgLastName, null);
		feedbackVisual(lastName, 'green');
		lastNameIsValid = true;
	}
}

//Check if email is valid
const eMail = document.querySelector('#email');
const errorMsgMail = document.querySelector('#errorMsgMail');

function verifyMail() {
	if (!eMail.value.match(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]{3,}[.][a-zA-Z]{2,3}/) || eMail.value == ' ' || eMail.value == null) {
		feedbackMessage(errorMsgMail, 'Veuillez vérifier votre email');
		feedbackVisual(eMail, 'red');
	} else {
		feedbackMessage(errorMsgMail, null);
		feedbackVisual(eMail, 'green');
		emailIsValid = true;
	}
}

//Check if tourney is valid
const quantityTourney = document.querySelector('#quantity');
const errorMsgTourney = document.querySelector('#errorMsgTourney');

function verifyTourney() {
	if (!quantityTourney.value.match(/^[0-9]+$/) || quantityTourney.value == ' ' || quantityTourney.value == null) {
		feedbackMessage(errorMsgTourney, 'Veuillez saisir une valeur numérique');
		feedbackVisual(quantityTourney, 'red');
	} else {
		feedbackMessage(errorMsgTourney, null);
		feedbackVisual(quantityTourney, 'green');
		tourneyIsValid = true;
	}
}

//Check if one city is checked
const location1 = document.getElementById('location1');
const location2 = document.getElementById('location2');
const location3 = document.getElementById('location3');
const location4 = document.getElementById('location4');
const location5 = document.getElementById('location5');
const location6 = document.getElementById('location6');
const checkbox = document.querySelectorAll('.checkbox-input');
const errorMsgCity = document.querySelector('#errorMsgCity');

function verifyCity() {
	if (!location1.checked && !location2.checked && !location3.checked && !location4.checked && !location5.checked && !location6.checked) {
		feedbackMessage(errorMsgCity, 'Veuillez selectionner au moins une ville');
	} else {
		feedbackMessage(errorMsgCity, null);
		cityIsValid = true;
	}
}

//Check if CGU is checked
const checkbox1 = document.getElementById('checkbox1');
const errorMsgCGU = document.querySelector('#errorMsgCGU');

function verifyCGU() {
	if (!checkbox1.checked) {
		feedbackMessage(errorMsgCGU, "Veuillez accepter les conditions d'utilisation");
	} else {
		feedbackMessage(errorMsgCGU, null);
		cguIsValid = true;
	}
}

//                            //
//       Form validation      //
//                            //

// Form validation
function validate() {
	//call verifications
	verifyFirstName();
	verifyLastName();
	verifyMail();
	verifyTourney();
	verifyCity();
	verifyCGU();

	//Listening inputs for real time feedbacks
	firstName.addEventListener('input', verifyFirstName);
	lastName.addEventListener('input', verifyLastName);
	eMail.addEventListener('input', verifyMail);
	quantityTourney.addEventListener('input', verifyTourney);
	checkbox1.addEventListener('input', verifyCGU);
	checkbox.forEach((box) => box.addEventListener('input', verifyCity));

	//Check if all inputs are valids
	if (firstNameIsValid == true && lastNameIsValid == true && emailIsValid == true && tourneyIsValid == true && cityIsValid == true && cguIsValid == true) {
		return true;
	}
	if (firstNameIsValid == false || lastNameIsValid == false || emailIsValid == false || tourneyIsValid == false || cityIsValid == false || cguIsValid == false) {
		return false;
	}
}
