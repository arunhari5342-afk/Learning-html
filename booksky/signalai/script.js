
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

        <!-- Sidebar -->

        <aside class="sidebar">

            <h2>SignalAI</h2>

            <p class="menu-title">MENU</p>

            <nav>

                <a href="#overview" class="active">Overview</a>

                <a href="#analytics">Analytics</a>

                <a href="#reports">Reports</a>

            </nav>

            <div class="sidebar-profile">

                <div class="avatar" id="profile-avatar"></div>

                <div>

                    <p id="sidebar-name"></p>

                    <small>Account</small>

                </div>

            </div>

        </aside>


        <!-- Dashboard Content -->

        <main class="dashboard-content">


            <!-- Dashboard Header -->

            <header class="dashboard-header">

                <button
                    type="button"
                    id="sidebar-toggle"
                    aria-label="Hide sidebar"
                    aria-expanded="true"
                >
                    ☰
                </button>

                <div>

                    <h1 id="welcome-name"></h1>

                    <p>
                        Here is what's happening with your business today.
                    </p>

                </div>


                <div class="header-actions">

                    <button type="button" id="theme-toggle">
                        🌙 Dark Mode
                    </button>


                    <!-- Profile Menu -->

                    <div class="header-user-actions">

                        <button
                            type="button"
                            id="profile-menu-toggle"
                            aria-label="Open profile menu"
                            aria-expanded="false"
                        >

                            <div
                                class="header-profile"
                                id="header-avatar"
                            ></div>

                        </button>


                        <div
                            class="profile-dropdown"
                            id="profile-dropdown"
                        >

                            <p id="dropdown-name"></p>

                            <p id="dropdown-email"></p>

                            <hr>

                            <button
                                type="button"
                                id="edit-profile-button"
                            >
                                Edit Profile
                            </button>

                            <button
                                type="button"
                                id="logout-button"
                            >
                                Log out
                            </button>

                        </div>

                    </div>

                </div>

            </header>



            <!-- Edit Profile Popup -->

            <div class="profile-modal" id="profile-modal">

                <div class="profile-modal-content">

                    <div class="modal-header">

                        <h2>Edit Profile</h2>

                        <button
                            type="button"
                            id="close-profile-modal"
                        >
                            &times;
                        </button>

                    </div>


                    <form id="edit-profile-form">

                        <div class="modal-picture-section">

                            <div
                                class="profile-picture"
                                id="profile-picture"
                            ></div>

                            <label
                                for="profile-picture-input"
                                class="upload-picture-label"
                            >
                                Change Profile Picture
                            </label>

                            <input
                                type="file"
                                id="profile-picture-input"
                                accept="image/*"
                                hidden
                            >

                        </div>


                        <label for="edit-name">Full Name</label>

                        <input
                            type="text"
                            id="edit-name"
                            required
                        >


                        <label for="edit-email">Email Address</label>

                        <input
                            type="email"
                            id="edit-email"
                            required
                        >


                        <p id="profile-message"></p>


                        <button
                            type="submit"
                            id="save-profile-button"
                        >
                            Save Changes
                        </button>

                    </form>

                </div>

            </div>



            <!-- Overview Section -->

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



            <!-- Analytics Section -->

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



            <!-- Recent Activity -->

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


        </main>

    `;



    


    document.getElementById("welcome-name").textContent =
        "Welcome, " + account.name + "!";

    document.getElementById("sidebar-name").textContent =
        account.name;


    

    const profilePicture =
        document.getElementById("profile-picture");

    const profileAvatar =
        document.getElementById("profile-avatar");

    const headerAvatar =
        document.getElementById("header-avatar");


    

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


                // Update All Profile Pictures

                updateProfilePicture(imageData);

            }

        };


        reader.readAsDataURL(selectedFile);

    });




    


    const editProfileForm =
        document.getElementById("edit-profile-form");

    const editName =
        document.getElementById("edit-name");

    const editEmail =
        document.getElementById("edit-email");

    const profileMessage =
        document.getElementById("profile-message");


    

    editName.value = account.name;

    editEmail.value = account.email;



   

    editProfileForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const newName = editName.value.trim();

        const newEmail = editEmail.value.trim().toLowerCase();


        if (newName === "" || newEmail === "") {

            profileMessage.textContent =
                "Please fill in all fields.";

            profileMessage.style.color = "red";

            return;

        }


        let accounts =
            JSON.parse(localStorage.getItem("signalAIAccounts")) || [];


       

        const accountIndex = accounts.findIndex(function (savedAccount) {

            return savedAccount.email.toLowerCase() ===
                   account.email.toLowerCase();

        });


        if (accountIndex === -1) {

            profileMessage.textContent = "Account not found.";

            profileMessage.style.color = "red";

            return;

        }


       

        const emailAlreadyUsed = accounts.some(function (savedAccount, index) {

            return index !== accountIndex &&
                   savedAccount.email.toLowerCase() === newEmail;

        });


        if (emailAlreadyUsed) {

            profileMessage.textContent =
                "This email is already registered.";

            profileMessage.style.color = "red";

            return;

        }


        

        accounts[accountIndex].name = newName;

        accounts[accountIndex].email = newEmail;


        localStorage.setItem(
            "signalAIAccounts",
            JSON.stringify(accounts)
        );


       

        account.name = newName;

        account.email = newEmail;


        

        document.getElementById("dropdown-name").textContent =
            account.name;

        document.getElementById("dropdown-email").textContent =
            account.email;


        

        document.getElementById("welcome-name").textContent =
            "Welcome, " + account.name + "!";

        document.getElementById("sidebar-name").textContent =
            account.name;


       

        updateProfilePicture(account.profilePicture);


        profileMessage.textContent =
            "Profile updated successfully!";

        profileMessage.style.color = "green";


        

        profileModal.classList.remove("show");

    });




    


    const profileMenuToggle =
        document.getElementById("profile-menu-toggle");

    const profileDropdown =
        document.getElementById("profile-dropdown");


    

    document.getElementById("dropdown-name").textContent =
        account.name;

    document.getElementById("dropdown-email").textContent =
        account.email;


    

    profileMenuToggle.addEventListener("click", function () {

        profileDropdown.classList.toggle("show");

        if (profileDropdown.classList.contains("show")) {

            profileMenuToggle.setAttribute("aria-expanded", "true");

        } else {

            profileMenuToggle.setAttribute("aria-expanded", "false");

        }

    });


    

    document.addEventListener("click", function (event) {

        if (
            !profileMenuToggle.contains(event.target) &&
            !profileDropdown.contains(event.target)
        ) {

            profileDropdown.classList.remove("show");

            profileMenuToggle.setAttribute("aria-expanded", "false");

        }

    });




    


    const editProfileButton =
        document.getElementById("edit-profile-button");

    const profileModal =
        document.getElementById("profile-modal");

    const closeProfileModal =
        document.getElementById("close-profile-modal");


   

    editProfileButton.addEventListener("click", function () {

        profileDropdown.classList.remove("show");

        profileMenuToggle.setAttribute("aria-expanded", "false");

        profileMessage.textContent = "";

        profileModal.classList.add("show");

    });


    

    closeProfileModal.addEventListener("click", function () {

        profileModal.classList.remove("show");

    });


    

    profileModal.addEventListener("click", function (event) {

        if (event.target === profileModal) {

            profileModal.classList.remove("show");

        }

    });


    

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            profileModal.classList.remove("show");

        }

    });




   


    const themeToggle =
        document.getElementById("theme-toggle");


    const savedTheme =
        localStorage.getItem("signalAITheme");


    if (savedTheme === "dark") {

        page.classList.add("dark-mode");

        themeToggle.textContent = "☀️ Light Mode";

    }


    themeToggle.addEventListener("click", function () {

        page.classList.toggle("dark-mode");


        if (page.classList.contains("dark-mode")) {

            localStorage.setItem("signalAITheme", "dark");

            themeToggle.textContent = "☀️ Light Mode";

        } else {

            localStorage.setItem("signalAITheme", "light");

            themeToggle.textContent = "🌙 Dark Mode";

        }

    });




    


    const sidebarToggle =
        document.getElementById("sidebar-toggle");


    sidebarToggle.addEventListener("click", function () {

        page.classList.toggle("sidebar-hidden");


        if (page.classList.contains("sidebar-hidden")) {

            sidebarToggle.setAttribute("aria-label", "Show sidebar");

            sidebarToggle.setAttribute("aria-expanded", "false");

        } else {

            sidebarToggle.setAttribute("aria-label", "Hide sidebar");

            sidebarToggle.setAttribute("aria-expanded", "true");

        }

    });




   


    document.getElementById("logout-button").addEventListener("click", function () {

        window.location.reload();

    });

}
