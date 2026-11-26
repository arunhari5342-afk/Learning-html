
// Get HTML Elements

const studentForm = document.getElementById("student-form");
const studentName = document.getElementById("student-name");
const studentEmail = document.getElementById("student-email");
const studentCourse = document.getElementById("student-course");
const attendanceStatus = document.getElementById("attendance-status");
const feeStatus = document.getElementById("fee-status");

const studentList = document.getElementById("student-list");
const draftList = document.getElementById("draft-list");

const totalStudents = document.getElementById("total-students");
const searchInput = document.getElementById("search-student");
const message = document.getElementById("message");

const nameCount = document.getElementById("name-count");
const emailCount = document.getElementById("email-count");

const saveDraftButton = document.getElementById("save-draft-btn");
const viewDraftsButton = document.getElementById("view-drafts-btn");
const draftSection = document.getElementById("draft-section");

const courseFilter = document.getElementById("course-filter");
const sortStudents = document.getElementById("sort-students");
const themeToggle = document.getElementById("theme-toggle");

// Pagination Elements

const pageInfo = document.getElementById("page-info");
const pageNumbers = document.getElementById("page-numbers");
const previousButton = document.getElementById("previous-btn");
const nextButton = document.getElementById("next-btn");

// Character Limits

const nameLimit = 20;
const emailLimit = 40;

// Get Students from Local Storage

let students = JSON.parse(localStorage.getItem("students")) || [];

// Add Default Values to Older Student Records

students.forEach(function(student) {

    if (!student.attendance) {
        student.attendance = "Present";
    }

    if (!student.feeStatus) {
        student.feeStatus = "Unpaid";
    }

});

localStorage.setItem("students", JSON.stringify(students));

// Store the ID of the Student Being Edited

let editingStudentId = null;

// Pagination Variables

let currentPage = 1;
let studentsPerPage = 5;

// Apply Previously Saved Theme

let savedTheme = localStorage.getItem("studentTheme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";

} else {

    document.body.classList.remove("dark-mode");
    themeToggle.textContent = "🌙";

}

// Display Students When Page Loads

displayStudents();
displayDrafts();


// Name Validation While Typing

studentName.addEventListener("input", function() {

    studentName.value = studentName.value.replace(/[^a-zA-Z ]/g, "");

    studentName.value = studentName.value.replace(/^\s+/, "");

    let remaining = nameLimit - studentName.value.length;

    nameCount.textContent = remaining + " characters remaining";

});


// Email Validation While Typing

studentEmail.addEventListener("input", function() {

    studentEmail.value = studentEmail.value.replace(/\s/g, "");

    let remaining = emailLimit - studentEmail.value.length;

    emailCount.textContent = remaining + " characters remaining";

});


// Add Student

studentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    saveStudent("registered");

});


// Save as Draft

saveDraftButton.addEventListener("click", function() {

    saveStudent("draft");

});


// Save Student Function

function saveStudent(status) {

    let name = studentName.value.trim();
    let email = studentEmail.value.trim().toLowerCase();
    let course = studentCourse.value;
    let attendance = attendanceStatus.value;
    let payment = feeStatus.value;

    // Check Name Length

    if (name !== "" && (name.length < 3 || name.length > nameLimit)) {

        showMessage("Name must contain 3 to 20 characters.", "red");
        return;

    }

    // Check Name Characters

    for (let i = 0; i < name.length; i++) {

        let character = name[i];

        if (!((character >= "a" && character <= "z") ||
              (character >= "A" && character <= "Z") ||
              character === " ")) {

            showMessage("Name can contain only alphabets and spaces.", "red");
            return;

        }

    }

    // Check Email Length

    if (email.length > emailLimit) {

        showMessage("Email cannot exceed 40 characters.", "red");
        return;

    }

    // Validate Email Using RegEx

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email !== "" && !emailPattern.test(email)) {

        showMessage("Please enter a valid email address.", "red");
        return;

    }

    // Check Duplicate Email

    if (email !== "") {

        let emailExists = students.some(function(student) {

            return student.email.toLowerCase() === email &&
                   student.id !== editingStudentId;

        });

        if (emailExists) {

            showMessage("This email is already registered or saved as draft!", "red");
            return;

        }

    }

    // Registered Students Must Have All Fields

    if (status === "registered") {

        if (name === "" || email === "" || course === "") {

            showMessage("Please fill all fields before adding the student.", "red");
            return;

        }

    } else {

        // Draft Must Have at Least One Field Filled

        if (name === "" && email === "" && course === "") {

            showMessage("Enter at least one detail to save a draft.", "red");
            return;

        }

    }

    // Check Whether We Are Editing an Existing Student

    if (editingStudentId !== null) {

        let existingStudent = students.find(function(student) {

            return student.id === editingStudentId;

        });

        if (existingStudent) {

            existingStudent.name = name;
            existingStudent.email = email;
            existingStudent.course = course;
            existingStudent.attendance = attendance;
            existingStudent.feeStatus = payment;
            existingStudent.status = status;

            if (status === "draft") {

                showMessage("Student saved as draft successfully!", "green");

            } else {

                showMessage("Student registered successfully!", "green");

            }

        }

    } else {

        // Create a New Student

        let student = {

            id: Date.now(),
            name: name,
            email: email,
            course: course,
            attendance: attendance,
            feeStatus: payment,
            status: status

        };

        students.push(student);

        if (status === "draft") {

            showMessage("Student saved as draft successfully!", "green");

        } else {

            showMessage("Student added successfully!", "green");

        }

    }

    // Reset Editing Mode

    editingStudentId = null;

    document.getElementById("add-student-btn").textContent = "Add Student";

    // Save Students in Local Storage

    saveStudents();

    // Go Back to First Page After Saving

    currentPage = 1;

    // Update Both Lists

    displayStudents();
    displayDrafts();

    // Reset Form

    studentForm.reset();

    resetCounters();

}


// Display Registered Students

function displayStudents() {

    studentList.innerHTML = "";

    let searchValue = searchInput.value.toLowerCase().trim();

    let selectedCourse = courseFilter.value;

    let selectedSort = sortStudents.value;

    // Get Registered Students Using Search and Course Filter

    let registeredStudents = students.filter(function(student) {

        return student.status !== "draft" &&

               student.name.toLowerCase().includes(searchValue) &&

               (selectedCourse === "" || student.course === selectedCourse);

    });

    // Sort Registered Students

    if (selectedSort === "ascending") {

        registeredStudents.sort(function(a, b) {

            return a.name.localeCompare(b.name);

        });

    } else if (selectedSort === "descending") {

        registeredStudents.sort(function(a, b) {

            return b.name.localeCompare(a.name);

        });

    }

    // Calculate Total Pages

    let totalPages = Math.ceil(registeredStudents.length / studentsPerPage);

    // Make Sure Current Page Is Valid

    if (currentPage > totalPages) {

        currentPage = Math.max(totalPages, 1);

    }

    // Calculate Starting and Ending Positions

    let startIndex = (currentPage - 1) * studentsPerPage;

    let endIndex = startIndex + studentsPerPage;

    // Get Students for the Current Page

    let paginatedStudents = registeredStudents.slice(startIndex, endIndex);

    // Display Students on the Current Page

    paginatedStudents.forEach(function(student) {

        let row = document.createElement("tr");

        let nameCell = document.createElement("td");
        nameCell.textContent = student.name;

        let emailCell = document.createElement("td");
        emailCell.textContent = student.email;

        let courseCell = document.createElement("td");
        courseCell.textContent = student.course;

        let attendanceCell = document.createElement("td");
        attendanceCell.textContent = student.attendance || "Present";

        let feeCell = document.createElement("td");
        feeCell.textContent = student.feeStatus || "Unpaid";

        let actionCell = document.createElement("td");

        // Edit Button

        let editButton = document.createElement("button");

        editButton.textContent = "Edit";
        editButton.classList.add("edit-btn");

        editButton.addEventListener("click", function() {

            editStudent(student);

        });

        // Delete Button

        let deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-btn");

        deleteButton.addEventListener("click", function() {

            deleteStudent(student.id);

        });

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        row.appendChild(nameCell);
        row.appendChild(emailCell);
        row.appendChild(courseCell);
        row.appendChild(attendanceCell);
        row.appendChild(feeCell);
        row.appendChild(actionCell);

        studentList.appendChild(row);

    });

    // Show Message If No Students Exist

    if (registeredStudents.length === 0) {

        let row = document.createElement("tr");
        let cell = document.createElement("td");

        cell.colSpan = 6;
        cell.textContent = "No registered students found.";

        row.appendChild(cell);
        studentList.appendChild(row);

    }

    // Update Total Registered Student Count

    totalStudents.textContent = students.filter(function(student) {

        return student.status !== "draft";

    }).length;

    // Update Pagination

    updatePagination(totalPages, registeredStudents.length);

}


// Update Pagination

function updatePagination(totalPages, totalStudentsCount) {

    pageNumbers.innerHTML = "";

    // Show Student Count

    if (totalStudentsCount === 0) {

        pageInfo.textContent = "Showing 0 students";

    } else {

        let start = (currentPage - 1) * studentsPerPage + 1;

        let end = Math.min(currentPage * studentsPerPage, totalStudentsCount);

        pageInfo.textContent = "Showing " + start + "–" + end +
                               " of " + totalStudentsCount + " students";

    }

    // Disable Previous Button on First Page

    previousButton.disabled = currentPage === 1;

    // Disable Next Button on Last Page

    nextButton.disabled = currentPage === totalPages || totalPages === 0;

    // Create Numbered Page Buttons

    for (let i = 1; i <= totalPages; i++) {

        let pageButton = document.createElement("button");

        pageButton.textContent = i;

        // Highlight Current Page

        if (i === currentPage) {

            pageButton.classList.add("active");

        }

        pageButton.addEventListener("click", function() {

            currentPage = i;

            displayStudents();

        });

        pageNumbers.appendChild(pageButton);

    }

}


// Previous Page Button

previousButton.addEventListener("click", function() {

    if (currentPage > 1) {

        currentPage--;

        displayStudents();

    }

});


// Next Page Button

nextButton.addEventListener("click", function() {

    currentPage++;

    displayStudents();

});


// Display Draft Students

function displayDrafts() {

    draftList.innerHTML = "";

    // Get Only Draft Students

    let drafts = students.filter(function(student) {

        return student.status === "draft";

    });

    drafts.forEach(function(student) {

        let row = document.createElement("tr");

        let nameCell = document.createElement("td");
        nameCell.textContent = student.name || "Not entered";

        let emailCell = document.createElement("td");
        emailCell.textContent = student.email || "Not entered";

        let courseCell = document.createElement("td");
        courseCell.textContent = student.course || "Not selected";

        let attendanceCell = document.createElement("td");
        attendanceCell.textContent = student.attendance || "Present";

        let feeCell = document.createElement("td");
        feeCell.textContent = student.feeStatus || "Unpaid";

        let actionCell = document.createElement("td");

        // Edit Button

        let editButton = document.createElement("button");

        editButton.textContent = "Edit";
        editButton.classList.add("edit-btn");

        editButton.addEventListener("click", function() {

            editStudent(student);

        });

        // Add Student Button

        let registerButton = document.createElement("button");

        registerButton.textContent = "Add Student";
        registerButton.classList.add("register-btn");

        registerButton.addEventListener("click", function() {

            registerDraft(student.id);

        });

        // Delete Button

        let deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-btn");

        deleteButton.addEventListener("click", function() {

            deleteStudent(student.id);

        });

        actionCell.appendChild(editButton);
        actionCell.appendChild(registerButton);
        actionCell.appendChild(deleteButton);

        row.appendChild(nameCell);
        row.appendChild(emailCell);
        row.appendChild(courseCell);
        row.appendChild(attendanceCell);
        row.appendChild(feeCell);
        row.appendChild(actionCell);

        draftList.appendChild(row);

    });

    // Show Message If There Are No Drafts

    if (drafts.length === 0) {

        let row = document.createElement("tr");
        let cell = document.createElement("td");

        cell.colSpan = 6;
        cell.textContent = "No drafts available.";

        row.appendChild(cell);
        draftList.appendChild(row);

    }

}


// Edit Student Function

function editStudent(student) {

    studentName.value = student.name;
    studentEmail.value = student.email;
    studentCourse.value = student.course;
    attendanceStatus.value = student.attendance || "Present";
    feeStatus.value = student.feeStatus || "Unpaid";

    // Update Character Counters

    nameCount.textContent =
        nameLimit - studentName.value.length + " characters remaining";

    emailCount.textContent =
        emailLimit - studentEmail.value.length + " characters remaining";

    // Store Existing Student ID

    editingStudentId = student.id;

    // Change Button Text

    document.getElementById("add-student-btn").textContent = "Update Student";

    // Show Form

    studentForm.scrollIntoView({

        behavior: "smooth"

    });

}


// Register Draft Function

function registerDraft(id) {

    let draft = students.find(function(student) {

        return student.id === id && student.status === "draft";

    });

    if (!draft) {
        return;
    }

    // Check Whether All Fields Are Filled

    if (draft.name === "" || draft.email === "" || draft.course === "") {

        showMessage("Please edit the draft and fill all fields first.", "red");

        editStudent(draft);

        return;

    }

    // Change Draft Status to Registered

    draft.status = "registered";

    // Save Changes

    saveStudents();

    currentPage = 1;

    // Refresh Both Lists

    displayStudents();
    displayDrafts();

    showMessage("Draft registered successfully!", "green");

}


// View Drafts Button

viewDraftsButton.addEventListener("click", function() {

    if (draftSection.hidden) {

        draftSection.hidden = false;

        viewDraftsButton.textContent = "Hide Drafts";

        draftSection.scrollIntoView({

            behavior: "smooth"

        });

    } else {

        draftSection.hidden = true;

        viewDraftsButton.textContent = "View Drafts";

    }

});


// Search Students

searchInput.addEventListener("input", function() {

    currentPage = 1;

    displayStudents();

});


// Course Filter

courseFilter.addEventListener("change", function() {

    currentPage = 1;

    displayStudents();

});


// Sort Students

sortStudents.addEventListener("change", function() {

    currentPage = 1;

    displayStudents();

});


// Dark and Light Theme Toggle

themeToggle.addEventListener("click", function() {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        themeToggle.textContent = "☀️";

        themeToggle.setAttribute("aria-label", "Enable light mode");

        localStorage.setItem("studentTheme", "dark");

    } else {

        themeToggle.textContent = "🌙";

        themeToggle.setAttribute("aria-label", "Enable dark mode");

        localStorage.setItem("studentTheme", "light");

    }

});


// Delete Student Function

function deleteStudent(id) {

    let confirmDelete = confirm("Are you sure you want to delete this student?");

    if (!confirmDelete) {
        return;
    }

    // Remove Selected Student

    students = students.filter(function(student) {

        return student.id !== id;

    });

    // Reset Form If Deleted Student Was Being Edited

    if (editingStudentId === id) {

        editingStudentId = null;

        studentForm.reset();

        document.getElementById("add-student-btn").textContent = "Add Student";

        resetCounters();

    }

    // Save Changes

    saveStudents();

    // Refresh Lists

    displayStudents();
    displayDrafts();

    showMessage("Student deleted successfully!", "green");

}


// Reset Character Counters

function resetCounters() {

    nameCount.textContent = nameLimit + " characters remaining";

    emailCount.textContent = emailLimit + " characters remaining";

}


// Save Students in Local Storage

function saveStudents() {

    localStorage.setItem("students", JSON.stringify(students));

}


// Display Messages

function showMessage(text, type) {

    message.textContent = text;

    message.className = "message";

    message.classList.add(type);

}
