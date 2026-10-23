
const form = document.getElementById("login-form");
const email = document.getElementById("email");
const password = document.getElementById("password");

const message = document.getElementById("message");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const emailValue = email.value.trim();
    const passwordValue = password.value;

    if (emailValue === "" || passwordValue === "") {
        message.textContent = "Please fill in all fields.";
        message.style.color = "red";
    } else if (!email.checkValidity()) {
        message.textContent = "Please enter a valid email address.";
        message.style.color = "red";
        email.focus();
    } else if (passwordValue.length < 6) {
        message.textContent = "Password must be at least 6 characters.";
        message.style.color = "red";
        password.focus();
    } else {
        showDashboard(emailValue);
    }
});

function showDashboard(userEmail) {
    const loginBox = document.querySelector(".login-box");

    loginBox.innerHTML = `
        <h1>SignalAI</h1>
        <p class="subtitle">Welcome to your dashboard!</p>
        <p class="description" id="user-email"></p>
        <h2>Overview</h2>
        <p class="description">
            Your AI insights and analytics are ready.
        </p>
        <button id="logout-button" type="button">Log out</button>
    `;

    document.getElementById("user-email").textContent =
        "You are signed in as " + userEmail;

    document.getElementById("logout-button").addEventListener("click", function () {
        window.location.reload();
    });
}
