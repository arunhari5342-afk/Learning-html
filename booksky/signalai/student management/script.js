
// Get HTML elements
const studentForm = document.getElementById("student-form");
const studentName = document.getElementById("student-name");
const studentEmail = document.getElementById("student-email");
const studentCourse = document.getElementById("student-course");
const studentList = document.getElementById("student-list");
const totalStudents = document.getElementById("total-students");
const searchInput = document.getElementById("search-student");
const message = document.getElementById("message");

// Get students from Local Storage
let students = JSON.parse(localStorage.getItem("students")) || [];

// Display students when page loads
displayStudents();


// Add Student
studentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let name = studentName.value.trim();
    let email = studentEmail.value.trim();
    let course = studentCourse.value;

    // Validate inputs
    if (name === "" || email === "" || course === "") {
        showMessage("Please fill all fields.", "red");
        return;
    }

    // Create student object
    let student = {
        id: Date.now(),
        name: name,
        email: email,
        course: course
    };

    students.push(student);

    saveStudents();

    displayStudents();

    studentForm.reset();

    showMessage("Student added successfully!", "green");

});


// Display Students and Search Results
function displayStudents() {

    studentList.innerHTML = "";

    // Get search value
    let searchValue = searchInput.value.toLowerCase().trim();

    // Filter students
    let filteredStudents = students.filter(function(student) {

        return student.name.toLowerCase().includes(searchValue);

    });

    // Display matching students
    filteredStudents.forEach(function(student) {

        let row = document.createElement("tr");

        let nameCell = document.createElement("td");
        nameCell.textContent = student.name;

        let emailCell = document.createElement("td");
        emailCell.textContent = student.email;

        let courseCell = document.createElement("td");
        courseCell.textContent = student.course;

        let actionCell = document.createElement("td");

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-btn");

        deleteButton.addEventListener("click", function() {
            deleteStudent(student.id);
        });

        actionCell.appendChild(deleteButton);

        row.appendChild(nameCell);
        row.appendChild(emailCell);
        row.appendChild(courseCell);
        row.appendChild(actionCell);

        studentList.appendChild(row);

    });

    // Show message if no matching students
    if (filteredStudents.length === 0) {

        let row = document.createElement("tr");
        let cell = document.createElement("td");

        cell.colSpan = 4;
        cell.textContent = "No students found.";

        row.appendChild(cell);
        studentList.appendChild(row);

    }

    // Update total registered students
    totalStudents.textContent = students.length;

}


// Search Student
searchInput.addEventListener("input", function() {

    displayStudents();

});


// Delete Student
function deleteStudent(id) {

    students = students.filter(function(student) {

        return student.id !== id;

    });

    saveStudents();

    displayStudents();

    showMessage("Student deleted successfully!", "green");

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
