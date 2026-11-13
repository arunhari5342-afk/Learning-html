

const form = document.getElementById("login-form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const message = document.getElementById("message");
const togglePassword = document.getElementById("toggle-password");




if (togglePassword) {
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
}




function updateRule(id, isValid) {

    const rule = document.getElementById(id);

    if (!rule) {
        return;
    }

    const icon = rule.querySelector(".rule-icon");

    if (isValid) {
        rule.classList.add("valid");

        if (icon) {
            icon.textContent = "✓";
        }

    } else {
        rule.classList.remove("valid");

        if (icon) {
            icon.textContent = "○";
        }
    }

}




function checkPassword() {

    const value = password.value;

    updateRule("length-rule", value.length >= 8);
    updateRule("upper-rule", /[A-Z]/.test(value));
    updateRule("lower-rule", /[a-z]/.test(value));
    updateRule("number-rule", /[0-9]/.test(value));

}




if (password) {
    password.addEventListener("input", function () {

        checkPassword();
        message.textContent = "";

    });
}




if (email) {
    email.addEventListener("input", function () {
        message.textContent = "";
    });
}




if (form) {
    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const emailValue = email.value.trim().toLowerCase();
        const passwordValue = password.value;

        let accounts = JSON.parse(
            localStorage.getItem("signalAIAccounts")
        ) || [];

        const matchedAccount = accounts.find(function (account) {

            return account.email.toLowerCase() === emailValue &&
                   account.password === passwordValue;

        });

        if (matchedAccount) {

            showDashboard(matchedAccount);

        } else {

            message.textContent = "Invalid email or password.";
            message.style.color = "red";

        }

    });
}





function showDashboard(account) {

    const page = document.querySelector(".login-page");

    page.className = "dashboard-page";

    page.innerHTML = `

        <!-- SIDEBAR -->

        <aside class="sidebar">

            <h2>SignalAI</h2>

            <p class="menu-title">MENU</p>

            <nav class="sidebar-nav">

                <a href="#overview" class="active" title="Overview">
                    <span class="sidebar-icon">O</span>
                    <span class="sidebar-text">Overview</span>
                </a>

                <a href="#analytics" title="Analytics">
                    <span class="sidebar-icon">A</span>
                    <span class="sidebar-text">Analytics</span>
                </a>

                <a href="#reports" title="Reports">
                    <span class="sidebar-icon">R</span>
                    <span class="sidebar-text">Reports</span>
                </a>

            </nav>

            <div class="sidebar-profile">

                <div class="avatar" id="profile-avatar"></div>

                <div>
                    <p id="sidebar-name"></p>
                    <small>Account</small>
                </div>

            </div>

        </aside>


        <!-- MAIN DASHBOARD CONTENT -->

        <main class="dashboard-content">


            <!-- HEADER -->

            <header class="dashboard-header">

                <button
                    type="button"
                    id="sidebar-toggle"
                    aria-label="Hide sidebar"
                    aria-expanded="true"
                >
                    ☰
                </button>

                <div class="welcome-section">

                    <h1 id="welcome-name"></h1>

                    <p>
                        Here is what's happening with your business today.
                    </p>

                </div>


                <div class="header-actions">

                    <button type="button" id="theme-toggle">
                        🌙 Dark Mode
                    </button>


                    <div class="header-user-actions">


                        <!-- NOTIFICATION CENTER -->

                        <div class="notification-wrapper">

                            <button
                                type="button"
                                id="notification-toggle"
                                aria-label="Notifications"
                                aria-expanded="false"
                            >
                                🔔

                                <span
                                    id="notification-count"
                                    class="notification-count"
                                >
                                    3
                                </span>

                            </button>


                            <div
                                class="notification-dropdown"
                                id="notification-dropdown"
                            >

                                <div class="notification-header">

                                    <h3>Notifications</h3>

                                    <button
                                        type="button"
                                        id="mark-all-read"
                                    >
                                        Mark all as read
                                    </button>

                                </div>


                                <div class="notification-list">

                                    <button
                                        type="button"
                                        class="notification-item unread"
                                    >

                                        <span class="notification-dot"></span>

                                        <span>
                                            <strong>New user registered</strong>
                                            <small>A new user joined today.</small>
                                        </span>

                                    </button>


                                    <button
                                        type="button"
                                        class="notification-item unread"
                                    >

                                        <span class="notification-dot"></span>

                                        <span>
                                            <strong>Revenue updated</strong>
                                            <small>Your monthly revenue was updated.</small>
                                        </span>

                                    </button>


                                    <button
                                        type="button"
                                        class="notification-item unread"
                                    >

                                        <span class="notification-dot"></span>

                                        <span>
                                            <strong>New project created</strong>
                                            <small>A new project has been added.</small>
                                        </span>

                                    </button>

                                </div>

                            </div>

                        </div>


                        <!-- PROFILE DROPDOWN -->

                        <div class="profile-menu-wrapper">

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

                </div>

            </header>



            <!-- OVERVIEW -->

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



            <!-- ANALYTICS -->

            

<section id="analytics" class="analytics-section">

    <!-- REVENUE CHART -->

    <div class="chart-card revenue-card">

        <div class="chart-heading">
            <div>
                <h2>Revenue Analytics</h2>
                <p>Track your revenue over time</p>
            </div>

            <select id="revenue-filter">
                <option value="weekly">Weekly</option>
                <option value="monthly" selected>Monthly</option>
                <option value="yearly">Yearly</option>
            </select>
        </div>

        <div class="chart-container">
            <canvas id="revenue-chart"></canvas>
        </div>

    </div>


    <!-- USER GROWTH CHART -->

    <div class="chart-card">

        <h2>User Growth</h2>
        <p>Monthly user registrations</p>

        <div class="chart-container">
            <canvas id="users-chart"></canvas>
        </div>

    </div>


    <!-- TRAFFIC SOURCES CHART -->

    <div class="chart-card">

        <h2>Traffic Sources</h2>
        <p>Where your visitors come from</p>

        <div class="chart-container doughnut-container">
            <canvas id="traffic-chart"></canvas>
        </div>

    </div>


    <!-- PERFORMANCE -->

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


            <!-- REPORTS -->

            <section id="reports" class="bottom-section">

    <div class="reports-header">
        <div>
            <h2>Reports</h2>
            <p>Download your dashboard report.</p>
        </div>

        <div class="report-actions">
            <button type="button" id="download-csv-button">
                Download CSV
            </button>

            <button type="button" id="download-pdf-button">
                Download PDF
            </button>
        </div>
    </div>

    <div class="activity-card">

        <h3>Recent Activity</h3>

        <div class="activity-item">
            <p>New user registered</p>
            <span>2 minutes ago</span>
        </div>

        <div class="activity-item">
            <p>Revenue report generated</p>
            <span>1 hour ago</span>
        </div>

        <div class="activity-item">
            <p>Project completed</p>
            <span>Yesterday</span>
        </div>

    </div>

</section>

        </main>



        <!-- EDIT PROFILE MODAL -->

        <div class="profile-modal" id="profile-modal">

            <div class="profile-modal-content">

                <div class="modal-header">

                    <h2>Edit Profile</h2>

                    <button
                        type="button"
                        id="close-profile-modal"
                        aria-label="Close"
                    >
                        ×
                    </button>

                </div>


                <div class="modal-picture-section">

                    <div
                        class="profile-picture"
                        id="profile-picture"
                    ></div>

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


                <form id="edit-profile-form">

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

    `;



    

    document.getElementById("welcome-name").textContent =
        "Welcome, " + account.name + "!";

    document.getElementById("sidebar-name").textContent =
        account.name;

    document.getElementById("dropdown-name").textContent =
        account.name;

    document.getElementById("dropdown-email").textContent =
        account.email;



   

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

            profilePictureInput.value = "";

            return;

        }


        if (selectedFile.size > 1024 * 1024) {

            alert("Please select an image smaller than 1 MB.");

            profilePictureInput.value = "";

            return;

        }


        const reader = new FileReader();

        reader.onload = function () {

            const imageData = reader.result;

            let accounts = JSON.parse(
                localStorage.getItem("signalAIAccounts")
            ) || [];


            const accountIndex = accounts.findIndex(function (savedAccount) {

                return savedAccount.email.toLowerCase() ===
                       account.email.toLowerCase();

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



   

    const editProfileButton =
        document.getElementById("edit-profile-button");

    const profileModal =
        document.getElementById("profile-modal");

    const closeProfileModal =
        document.getElementById("close-profile-modal");

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


    

    editProfileButton.addEventListener("click", function () {

        profileModal.classList.add("show");

        editName.value = account.name;

        editEmail.value = account.email;

        profileMessage.textContent = "";

        document.getElementById("profile-dropdown").classList.remove("show");

    });


    

    closeProfileModal.addEventListener("click", function () {

        profileModal.classList.remove("show");

    });


    

    profileModal.addEventListener("click", function (event) {

        if (event.target === profileModal) {

            profileModal.classList.remove("show");

        }

    });


    

    editProfileForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const newName = editName.value.trim();

        const newEmail = editEmail.value.trim().toLowerCase();


        if (newName === "" || newEmail === "") {

            profileMessage.textContent = "Please fill in all fields.";

            profileMessage.style.color = "red";

            return;

        }


        let accounts = JSON.parse(
            localStorage.getItem("signalAIAccounts")
        ) || [];


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


        

        document.getElementById("welcome-name").textContent =
            "Welcome, " + account.name + "!";

        document.getElementById("sidebar-name").textContent =
            account.name;

        document.getElementById("dropdown-name").textContent =
            account.name;

        document.getElementById("dropdown-email").textContent =
            account.email;


        

        updateProfilePicture(account.profilePicture);


        profileMessage.textContent =
            "Profile updated successfully!";

        profileMessage.style.color = "green";

    });



   

    const themeToggle = document.getElementById("theme-toggle");

    const savedTheme = localStorage.getItem("signalAITheme");


    if (savedTheme === "dark") {

        page.classList.add("dark-mode");

        themeToggle.textContent = "☀️ Light Mode";

    } else {

        themeToggle.textContent = "🌙 Dark Mode";

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



   

    const sidebarToggle = document.getElementById("sidebar-toggle");


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



  

    const sidebarLinks = document.querySelectorAll(".sidebar-nav a");


    sidebarLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            sidebarLinks.forEach(function (item) {

                item.classList.remove("active");

            });

            link.classList.add("active");

        });

    });



   

    const profileMenuToggle =
        document.getElementById("profile-menu-toggle");

    const profileDropdown =
        document.getElementById("profile-dropdown");


    profileMenuToggle.addEventListener("click", function (event) {

        event.stopPropagation();

        profileDropdown.classList.toggle("show");


        if (profileDropdown.classList.contains("show")) {

            profileMenuToggle.setAttribute("aria-expanded", "true");

        } else {

            profileMenuToggle.setAttribute("aria-expanded", "false");

        }

    });





    const notificationToggle =
        document.getElementById("notification-toggle");

    const notificationDropdown =
        document.getElementById("notification-dropdown");

    const notificationCount =
        document.getElementById("notification-count");

    const notificationItems =
        document.querySelectorAll(".notification-item");

    const markAllRead =
        document.getElementById("mark-all-read");


    

    function updateNotificationCount() {

        const unreadNotifications =
            document.querySelectorAll(".notification-item.unread");

        notificationCount.textContent =
            unreadNotifications.length;


        if (unreadNotifications.length === 0) {

            notificationCount.style.display = "none";

        } else {

            notificationCount.style.display = "flex";

        }

    }


    

    notificationToggle.addEventListener("click", function (event) {

        event.stopPropagation();

        notificationDropdown.classList.toggle("show");


        if (notificationDropdown.classList.contains("show")) {

            notificationToggle.setAttribute("aria-expanded", "true");

        } else {

            notificationToggle.setAttribute("aria-expanded", "false");

        }

    });


   

    notificationItems.forEach(function (item) {

        item.addEventListener("click", function () {

            item.classList.remove("unread");

            updateNotificationCount();

        });

    });


   

    markAllRead.addEventListener("click", function () {

        notificationItems.forEach(function (item) {

            item.classList.remove("unread");

        });

        updateNotificationCount();

    });


    

    updateNotificationCount();



    

    document.addEventListener("click", function (event) {


        

        if (
            !profileMenuToggle.contains(event.target) &&
            !profileDropdown.contains(event.target)
        ) {

            profileDropdown.classList.remove("show");

            profileMenuToggle.setAttribute("aria-expanded", "false");

        }


       

        if (
            !notificationToggle.contains(event.target) &&
            !notificationDropdown.contains(event.target)
        ) {

            notificationDropdown.classList.remove("show");

            notificationToggle.setAttribute("aria-expanded", "false");

        }

    });

    // Download CSV Report

const downloadCsvButton = document.getElementById("download-csv-button");

downloadCsvButton.addEventListener("click", function () {

    const reportData = [
        ["Report", "Value"],
        ["Total Users", "12450"],
        ["Total Revenue", "$48,250"],
        ["Active Projects", "24"],
        ["Growth Rate", "18.6%"],
        ["Performance", "78%"],
        [],
        ["Recent Activity"],
        ["New user registered", "2 minutes ago"],
        ["Revenue report generated", "1 hour ago"],
        ["Project completed", "Yesterday"]
    ];

    let csvContent = "";

    reportData.forEach(function (row) {

        const formattedRow = row.map(function (value) {

            return '"' + String(value).replace(/"/g, '""') + '"';

        });

        csvContent += formattedRow.join(",") + "\n";

    });

    const file = new Blob([csvContent], {
        type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(file);

    const link = document.createElement("a");

    link.href = url;
    link.download = "signalai-report.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

});




const downloadPdfButton = document.getElementById("download-pdf-button");

downloadPdfButton.addEventListener("click", function () {

    const reportWindow = window.open("", "_blank");

    if (!reportWindow) {

        alert("Please allow popups to download the PDF report.");

        return;

    }

    reportWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>SignalAI Report</title>

            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 40px;
                    color: #333;
                }

                h1 {
                    color: #1558d6;
                }

                h2 {
                    margin-top: 30px;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }

                th, td {
                    border: 1px solid #ddd;
                    padding: 12px;
                    text-align: left;
                }

                th {
                    background: #f0f4ff;
                }

                @media print {
                    body {
                        padding: 10px;
                    }
                }
            </style>
        </head>

        <body>

            <h1>SignalAI Dashboard Report</h1>

            <p>Dashboard Summary</p>

            <table>
                <tr>
                    <th>Report</th>
                    <th>Value</th>
                </tr>

                <tr>
                    <td>Total Users</td>
                    <td>12,450</td>
                </tr>

                <tr>
                    <td>Total Revenue</td>
                    <td>$48,250</td>
                </tr>

                <tr>
                    <td>Active Projects</td>
                    <td>24</td>
                </tr>

                <tr>
                    <td>Growth Rate</td>
                    <td>18.6%</td>
                </tr>

                <tr>
                    <td>Performance</td>
                    <td>78%</td>
                </tr>
            </table>

            <h2>Recent Activity</h2>

            <ul>
                <li>New user registered - 2 minutes ago</li>
                <li>Revenue report generated - 1 hour ago</li>
                <li>Project completed - Yesterday</li>
            </ul>

        </body>
        </html>
    `);

    reportWindow.document.close();

    reportWindow.onload = function () {

        reportWindow.print();

    };

});


   

    const revenueCanvas = document.getElementById("revenue-chart");

    const revenueFilter = document.getElementById("revenue-filter");

    const revenueData = {

        weekly: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            values: [1200, 1800, 1500, 2400, 2100, 3000, 3500]
        },

        monthly: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            values: [4500, 6500, 5000, 8000, 6000, 9500]
        },

        yearly: {
            labels: ["2021", "2022", "2023", "2024", "2025", "2026"],
            values: [25000, 32000, 40000, 38000, 52000, 65000]
        }

    };


    const revenueChart = new Chart(revenueCanvas, {

        type: "line",

        data: {
            labels: revenueData.monthly.labels,

            datasets: [{
                label: "Revenue",
                data: revenueData.monthly.values,

                borderColor: "#1558d6",
                backgroundColor: "rgba(21, 88, 214, 0.12)",

                borderWidth: 3,
                fill: true,
                tension: 0.4,

                pointRadius: 5,
                pointHoverRadius: 8
            }]
        },

        options: {

            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    display: false
                },

                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return "Revenue: $" +
                                context.parsed.y.toLocaleString();
                        }
                    }
                }
            },

            scales: {
                y: {
                    beginAtZero: true
                }
            }

        }

    });


    

    revenueFilter.addEventListener("change", function () {

        const selectedPeriod = revenueFilter.value;

        revenueChart.data.labels =
            revenueData[selectedPeriod].labels;

        revenueChart.data.datasets[0].data =
            revenueData[selectedPeriod].values;

        revenueChart.update();

    });



    

    const usersChart = new Chart(
        document.getElementById("users-chart"),
        {

            type: "bar",

            data: {

                labels: [
                    "Jan", "Feb", "Mar",
                    "Apr", "May", "Jun"
                ],

                datasets: [{

                    label: "New Users",

                    data: [120, 190, 150, 250, 220, 320],

                    backgroundColor: "#1558d6",

                    borderRadius: 6,

                    barThickness: 25

                }]

            },

            options: {

                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                    legend: {
                        display: false
                    }
                },

                scales: {
                    y: {
                        beginAtZero: true
                    }
                }

            }

        }
    );



    

    const trafficChart = new Chart(
        document.getElementById("traffic-chart"),
        {

            type: "doughnut",

            data: {

                labels: [
                    "Direct",
                    "Social Media",
                    "Search Engines",
                    "Others"
                ],

                datasets: [{

                    data: [35, 25, 30, 10],

                    backgroundColor: [
                        "#1558d6",
                        "#16a34a",
                        "#f59e0b",
                        "#8b5cf6"
                    ],

                    borderWidth: 0,

                    hoverOffset: 12

                }]

            },

            options: {

                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                    legend: {
                        position: "bottom"
                    }
                },

                cutout: "65%"

            }

        }
    );




   

    const logoutButton = document.getElementById("logout-button");

    logoutButton.addEventListener("click", function () {

        window.location.reload();

    });

}
