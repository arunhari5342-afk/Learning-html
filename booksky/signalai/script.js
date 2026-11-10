const form = document.getElementById("login-form");

const email = document.getElementById("email");

const password = document.getElementById("password");

const message = document.getElementById("message");




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

    const value = password.value;

    updateRule("length-rule", value.length >= 8);

    updateRule("upper-rule", /[A-Z]/.test(value));

    updateRule("lower-rule", /[a-z]/.test(value));

    updateRule("number-rule", /[0-9]/.test(value));

}




password.addEventListener("input", function () {

    checkPassword();

    message.textContent = "";

});




email.addEventListener("input", function () {

    message.textContent = "";

});




form.addEventListener("submit", function (event) {

    event.preventDefault();

    const emailValue = email.value.trim().toLowerCase();

    const passwordValue = password.value;


    

    let accounts = JSON.parse(localStorage.getItem("signalAIAccounts")) || [];


    

    const matchedAccount = accounts.find(function (account) {

        return account.email === emailValue &&
               account.password === passwordValue;

    });


    if (matchedAccount) {

        showDashboard(matchedAccount);

    } else {

        message.textContent = "Invalid email or password.";

        message.style.color = "red";

    }

});




function showDashboard(account) {

    const loginBox = document.querySelector(".login-box");

    loginBox.innerHTML = `

        <h1>SignalAI</h1>

        <p class="subtitle">
            Welcome!
        </p>

        <p class="description">
            You have successfully logged in.
        </p>

        <div class="profile-details">

            <h2>Your Account</h2>

            <p id="profile-name"></p>

            <p id="profile-email"></p>

        </div>

        <button id="logout-button" type="button">
            Log out
        </button>

    `;


    

    document.getElementById("profile-name").textContent =
        "Name: " + account.name;

    document.getElementById("profile-email").textContent =
        "Email: " + account.email;



    document.getElementById("logout-button").addEventListener("click", function () {

        window.location.reload();

    });

}