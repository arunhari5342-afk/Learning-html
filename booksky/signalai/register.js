const registerForm = document.getElementById("register-form");

const fullName = document.getElementById("full-name");
const registerEmail = document.getElementById("register-email");
const registerPassword = document.getElementById("register-password");
const confirmPassword = document.getElementById("confirm-password");

const registerMessage = document.getElementById("register-message");


function updateRule(id, isValid) {

    const rule = document.getElementById(id);
    const icon = rule.querySelector(".rule-icon");

    if (isValid) {

        rule.classList.add("valid");
        icon.textContent = "✓";

    } else {

        rule.classList.remove("valid");
        icon.textContent = "○";

    }

}


function checkPassword() {

    const value = registerPassword.value;

    updateRule("register-length-rule", value.length >= 8);

    updateRule("register-upper-rule", /[A-Z]/.test(value));

    updateRule("register-lower-rule", /[a-z]/.test(value));

    updateRule("register-number-rule", /[0-9]/.test(value));

}


registerPassword.addEventListener("input", function () {

    checkPassword();

    registerMessage.textContent = "";

});


registerForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const nameValue = fullName.value.trim();

    const emailValue = registerEmail.value.trim().toLowerCase();

    const passwordValue = registerPassword.value;

    const confirmValue = confirmPassword.value;


    

    if (
        nameValue === "" ||
        emailValue === "" ||
        passwordValue === "" ||
        confirmValue === ""
    ) {

        registerMessage.textContent = "Please fill in all fields.";

        registerMessage.style.color = "red";

        return;

    }


    

    const emailPattern = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

    if (!emailPattern.test(emailValue)) {

        registerMessage.textContent = "Please enter a valid email address.";

        registerMessage.style.color = "red";

        return;

    }


    

    const hasLength = passwordValue.length >= 8;

    const hasUppercase = /[A-Z]/.test(passwordValue);

    const hasLowercase = /[a-z]/.test(passwordValue);

    const hasNumber = /[0-9]/.test(passwordValue);


    if (
        !hasLength ||
        !hasUppercase ||
        !hasLowercase ||
        !hasNumber
    ) {

        registerMessage.textContent = "Please meet all password conditions.";

        registerMessage.style.color = "red";

        return;

    }


    

    if (passwordValue !== confirmValue) {

        registerMessage.textContent = "Passwords do not match.";

        registerMessage.style.color = "red";

        return;

    }


    

    let accounts = JSON.parse(localStorage.getItem("signalAIAccounts")) || [];


    

    const existingAccount = accounts.find(function (account) {

        return account.email === emailValue;

    });


    if (existingAccount) {

        registerMessage.textContent = "This email is already registered.";

        registerMessage.style.color = "red";

        return;

    }


    

    const newAccount = {

        name: nameValue,

        email: emailValue,

        password: passwordValue

    };


    

    accounts.push(newAccount);


    

    localStorage.setItem("signalAIAccounts", JSON.stringify(accounts));


    

    registerMessage.textContent = "Account created successfully! Please sign in.";

    registerMessage.style.color = "green";


    

    registerForm.reset();

    checkPassword();

});