// Input validation for all fields as user is typing
// CSS to mark validity of fields
// Give user high five is successful
// No field should be left valueMissing
// setCustomValidity(message) to construct custom error messages


const formatMessages = { 
  "email": "That doesn't look like an email address to Odin.",
  "phone-number": "Phone number must be 10–11 digits, numbers only.",
  "password": "At least 8 characters, with an uppercase, a lowercase, and a number.",
  "password-confirm": "At least 8 characters, with an uppercase, a lowercase, and a number.",
};

function getErrorMessage(field) {
    const valid = field.validity;

    if (valid.valueMissing) return "This field is required by Odin himself";
    if (valid.typeMismatch) return formatMessages[field.name];
    if (valid.patternMismatch) return formatMessages[field.name];
    if (valid.customError) return field.validationMessage;
    return "";
}

function validateField(field) {
    const message = getErrorMessage(field);
    document.getElementById(`error-${field.id}`).textContent = message;
    return message === "";
}

const form = document.getElementById("my-form");
const fields = [...form.querySelectorAll("input")];
const successMessage = document.getElementById("success-message");
fields.forEach((field) => {
    field.addEventListener("input", () => {
        successMessage.hidden = true;
        validateField(field);
    });
})

const password = document.getElementById("password");
const passwordConfirm = document.getElementById("password-confirm");

function checkPasswordMatch() {
    passwordConfirm.setCustomValidity(
        password.value === passwordConfirm.value ? "" : "Consistency is important to Odin. Passwords do not match.");

};

[password, passwordConfirm].forEach(field => {
    field.addEventListener("input", () => {
        checkPasswordMatch();
        validateField(passwordConfirm);
    })
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkPasswordMatch();
    const allValid = fields.map(validateField).every(Boolean);
    if (!allValid) return;
    form.reset();
    successMessage.hidden = false;
});