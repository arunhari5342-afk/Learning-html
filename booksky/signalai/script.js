
const form = document.getElementById("login-form");

const email = document.getElementById("email");

const password = document.getElementById("password");

const message = document.getElementById("message");

const togglePassword = document.getElementById("toggle-password");




togglePassword.addEventListener("click", function () {

    if (password.type === "password") {

        password.type = "text";

        togglePassword.textContent = "👁️‍🗨️";

        togglePassword.setAttribute("aria-label", "Hide password");

    } else {

        password.type = "password";

        togglePassword.textContent = "👁";

        togglePassword.setAttribute("aria-label", "Show password");

    }

});




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

    const page = document.querySelector(".login-page");

    page.className = "dashboard-page";

    page.innerHTML = `

        <aside class="sidebar">

            <h2>SignalAI</h2>

            <p class="menu-title">MENU</p>

            <nav>
                <a href="#overview" class="active">Overview</a>
                <a href="#analytics">Analytics</a>
                <a href="#reports">Reports</a>
                <a href="#settings">Settings</a>
            </nav>

            <div class="sidebar-profile">

                <div class="avatar" id="profile-avatar"></div>

                <div>
                    <p id="sidebar-name"></p>
                    <small>Account</small>
                </div>

            </div>

        </aside>


        <main class="dashboard-content">

            <header class="dashboard-header">

                <div>
                    <h1 id="welcome-name"></h1>
                    <p>Here is what's happening with your business today.</p>
                </div>

                <div class="header-profile" id="header-avatar"></div>

            </header>


            <section id="overview">

                <h2>Overview</h2>

                <div class="stats-container">

                    <div class="stat-card">
                        <p>Total Users</p>
                        <h2>12,450</h2>
                        <span>+12.5% this month</span>
                    </div>

                    <div class="stat-card">
                        <p>Total Revenue</p>
                        <h2>$48,250</h2>
                        <span>+8.2% this month</span>
                    </div>

                    <div class="stat-card">
                        <p>Active Projects</p>
                        <h2>24</h2>
                        <span>+4 new projects</span>
                    </div>

                    <div class="stat-card">
                        <p>Growth Rate</p>
                        <h2>18.6%</h2>
                        <span>+3.4% this month</span>
                    </div>

                </div>

            </section>


            <section id="analytics" class="analytics-section">

                <div class="chart-card">

                    <h2>Revenue Analytics</h2>

                    <p>Monthly revenue overview</p>

                    <div class="bar-chart">

                        <div class="bar-group">
                            <div class="bar" style="height: 45%"></div>
                            <small>Jan</small>
                        </div>

                        <div class="bar-group">
                            <div class="bar" style="height: 65%"></div>
                            <small>Feb</small>
                        </div>

                        <div class="bar-group">
                            <div class="bar" style="height: 50%"></div>
                            <small>Mar</small>
                        </div>

                        <div class="bar-group">
                            <div class="bar" style="height: 80%"></div>
                            <small>Apr</small>
                        </div>

                        <div class="bar-group">
                            <div class="bar" style="height: 60%"></div>
                            <small>May</small>
                        </div>

                        <div class="bar-group">
                            <div class="bar" style="height: 95%"></div>
                            <small>Jun</small>
                        </div>

                    </div>

                </div>


                <div class="chart-card">

                    <h2>Performance</h2>

                    <p>Overall business performance</p>

                    <div class="performance-circle">
                        <div>
                            <h2>78%</h2>
                            <small>Performance</small>
                        </div>
                    </div>

                    <p class="performance-note">
                        Your performance is looking good!
                    </p>

                </div>

            </section>


            <section id="reports" class="bottom-section">

                <h2>Recent Activity</h2>

                <div class="activity-card">

                    <p>New users registered</p>
                    <span>Today</span>

                    <hr>

                    <p>Monthly revenue updated</p>
                    <span>Yesterday</span>

                    <hr>

                    <p>New project created</p>
                    <span>2 days ago</span>

                </div>

            </section>


            <section id="settings" class="bottom-section">

                <h2>User Profile</h2>

                <div class="activity-card user-profile-card">

                    <div class="profile-picture" id="profile-picture"></div>

                    <div class="profile-info">

                        <h3 id="profile-name"></h3>

                        <p id="profile-email"></p>

                        <label
                            for="profile-picture-input"
                            class="upload-picture-label"
                        >
                            Change profile picture
                        </label>

                        <input
                            type="file"
                            id="profile-picture-input"
                            accept="image/*"
                            hidden
                        >

                    </div>

                </div>

            </section>


            <button id="logout-button" type="button">
                Log out
            </button>

        </main>

    `;


    

    document.getElementById("welcome-name").textContent =
        "Welcome, " + account.name + "!";

    document.getElementById("sidebar-name").textContent =
        account.name;

    document.getElementById("profile-name").textContent =
        "Name: " + account.name;

    document.getElementById("profile-email").textContent =
        "Email: " + account.email;


    

    const profilePicture = document.getElementById("profile-picture");

    const profileAvatar = document.getElementById("profile-avatar");

    const headerAvatar = document.getElementById("header-avatar");


    

    function updateProfilePicture(imageData) {

        const pictureElements = [
            profilePicture,
            profileAvatar,
            headerAvatar
        ];

        pictureElements.forEach(function (element) {

            element.textContent = "";

            if (imageData) {

                const image = document.createElement("img");

                image.src = imageData;

                image.alt = "Profile picture";

                element.appendChild(image);

            } else {

                element.textContent =
                    account.name.charAt(0).toUpperCase();

            }

        });

    }


    

    updateProfilePicture(account.profilePicture);


    

    const profilePictureInput =
        document.getElementById("profile-picture-input");

    profilePictureInput.addEventListener("change", function () {

        const selectedFile = profilePictureInput.files[0];

        if (!selectedFile) {

            return;

        }


        

        if (!selectedFile.type.startsWith("image/")) {

            alert("Please select an image.");

            return;

        }


        

        if (selectedFile.size > 1024 * 1024) {

            alert("Please select an image smaller than 1 MB.");

            return;

        }


        

        const reader = new FileReader();

        reader.onload = function () {

            const imageData = reader.result;

            let accounts =
                JSON.parse(localStorage.getItem("signalAIAccounts")) || [];


            

            const accountIndex = accounts.findIndex(function (savedAccount) {

                return savedAccount.email === account.email;

            });


            if (accountIndex !== -1) {

                

                accounts[accountIndex].profilePicture = imageData;

                localStorage.setItem(
                    "signalAIAccounts",
                    JSON.stringify(accounts)
                );

                

                account.profilePicture = imageData;

                

                updateProfilePicture(imageData);

            }

        };

        reader.readAsDataURL(selectedFile);

    });


    

    document.getElementById("logout-button").addEventListener("click", function () {

        window.location.reload();

    });

}
