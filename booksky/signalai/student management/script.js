
// Get HTML elements

const studentForm = document.getElementById("student-form");
const studentName = document.getElementById("student-name");
const studentEmail = document.getElementById("student-email");
const studentCourse = document.getElementById("student-course");

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


// Character limits

const nameLimit = 20;
const emailLimit = 40;


// Get students from Local Storage

let students = JSON.parse(localStorage.getItem("students")) || [];


// Store the ID of the student being edited

let editingStudentId = null;


// Display students when page loads

displayStudents();
displayDrafts();


// Name validation while typing

studentName.addEventListener("input", function() {

    studentName.value = studentName.value.replace(/[^a-zA-Z ]/g, "");

    studentName.value = studentName.value.replace(/^\s+/, "");

    let remaining = nameLimit - studentName.value.length;

    nameCount.textContent = remaining + " characters remaining";

});


// Email validation while typing

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


    // Check name length if name is entered

    if (name !== "" && (name.length < 3 || name.length > nameLimit)) {

        showMessage("Name must contain 3 to 30 characters.", "red");
        return;

    }


    // Check name characters

    for (let i = 0; i < name.length; i++) {

        let character = name[i];

        if (!((character >= "a" && character <= "z") ||
              (character >= "A" && character <= "Z") ||
              character === " ")) {

            showMessage("Name can contain only alphabets and spaces.", "red");
            return;

        }

    }


    // Check email length

    if (email.length > emailLimit) {

        showMessage("Email cannot exceed 50 characters.", "red");
        return;

    }


    // Validate email using RegEx if email is entered

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email !== "" && !emailPattern.test(email)) {

        showMessage("Please enter a valid email address.", "red");
        return;

    }


    // Check duplicate email

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


    // Registered students must have all fields

    if (status === "registered") {

        if (name === "" || email === "" || course === "") {

            showMessage("Please fill all fields before adding the student.", "red");
            return;

        }

    } else {

        // Draft must have at least one field filled

        if (name === "" && email === "" && course === "") {

            showMessage("Enter at least one detail to save a draft.", "red");
            return;

        }

    }


    // Check whether we are editing an existing student

    if (editingStudentId !== null) {

        let existingStudent = students.find(function(student) {

            return student.id === editingStudentId;

        });


        if (existingStudent) {

            // Update existing student

            existingStudent.name = name;
            existingStudent.email = email;
            existingStudent.course = course;

            // Change student status

            existingStudent.status = status;

            if (status === "draft") {

                showMessage("Student saved as draft successfully!", "green");

            } else {

                showMessage("Student registered successfully!", "green");

            }

        }

    } else {

        // Create a new student

        let student = {

            id: Date.now(),
            name: name,
            email: email,
            course: course,
            status: status

        };


        // Add student to array

        students.push(student);


        if (status === "draft") {

            showMessage("Student saved as draft successfully!", "green");

        } else {

            showMessage("Student added successfully!", "green");

        }

    }


    // Reset editing mode

    editingStudentId = null;


    // Reset button text

    document.getElementById("add-student-btn").textContent = "Add Student";


    // Save students in Local Storage

    saveStudents();


    // Update both lists

    displayStudents();
    displayDrafts();


    // Reset form

    studentForm.reset();


    // Reset character counters

    resetCounters();

}


// Display Registered Students

function displayStudents() {

    studentList.innerHTML = "";

    let searchValue = searchInput.value.toLowerCase().trim();


    // Get only registered students

    let registeredStudents = students.filter(function(student) {

        return student.status !== "draft" &&
               student.name.toLowerCase().includes(searchValue);

    });


    registeredStudents.forEach(function(student) {

        let row = document.createElement("tr");


        let nameCell = document.createElement("td");
        nameCell.textContent = student.name;


        let emailCell = document.createElement("td");
        emailCell.textContent = student.email;


        let courseCell = document.createElement("td");
        courseCell.textContent = student.course;


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
        row.appendChild(actionCell);


        studentList.appendChild(row);

    });


    // Show message if no students exist

    if (registeredStudents.length === 0) {

        let row = document.createElement("tr");
        let cell = document.createElement("td");

        cell.colSpan = 4;
        cell.textContent = "No registered students found.";

        row.appendChild(cell);
        studentList.appendChild(row);

    }


    // Update registered student count

    totalStudents.textContent = students.filter(function(student) {

        return student.status !== "draft";

    }).length;

}


// Display Draft Students

function displayDrafts() {

    draftList.innerHTML = "";


    // Get only draft students

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
        row.appendChild(actionCell);


        draftList.appendChild(row);

    });


    // Show message if there are no drafts

    if (drafts.length === 0) {

        let row = document.createElement("tr");
        let cell = document.createElement("td");

        cell.colSpan = 4;
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


    // Update character counters

    nameCount.textContent =
        nameLimit - studentName.value.length + " characters remaining";

    emailCount.textContent =
        emailLimit - studentEmail.value.length + " characters remaining";


    // Store existing student ID

    editingStudentId = student.id;


    // Change heading button text

    document.getElementById("add-student-btn").textContent = "Update Student";


    // Show form

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


    // Check whether all fields are filled

    if (draft.name === "" || draft.email === "" || draft.course === "") {

        showMessage("Please edit the draft and fill all fields first.", "red");

        editStudent(draft);

        return;

    }


    // Change draft status to registered

    draft.status = "registered";


    // Save changes

    saveStudents();


    // Refresh both lists

    displayStudents();
    displayDrafts();


    // Show success message

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

    displayStudents();

});


// Delete Student Function

function deleteStudent(id) {

    students = students.filter(function(student) {

        return student.id !== id;

    });


    // Reset form if the deleted student was being edited

    if (editingStudentId === id) {

        editingStudentId = null;

        studentForm.reset();

        document.getElementById("add-student-btn").textContent = "Add Student";

        resetCounters();

    }


    // Save changes

    saveStudents();


    // Refresh lists

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
