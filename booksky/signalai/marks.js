
// Get the form and result elements
let studentForm = document.getElementById("studentForm");
let result = document.getElementById("result");
let errorMessage = document.getElementById("errorMessage");

// Handle form submission
studentForm.addEventListener("submit", function(event) {

    // Prevent page refresh
    event.preventDefault();

    // Get student name
    let studentName = document.getElementById("studentName").value.trim();

    let total = 0;
    let isValid = true;

    // Get marks for 5 subjects
    for (let i = 1; i <= 5; i++) {

        let marks = Number(document.getElementById("subject" + i).value);

        // Validate marks
        if (!Number.isFinite(marks) || marks < 0 || marks > 100) {

            errorMessage.textContent =
                "Invalid marks! Enter marks between 0 and 100.";

            isValid = false;

            break;
        }

        // Calculate total
        total = total + marks;
    }

    // Stop if marks are invalid
    if (!isValid) {
        result.innerHTML = "";
        return;
    }

    // Calculate average
    let average = total / 5;

    let grade;

    // Calculate grade
    if (average >= 90) {
        grade = "A";
    }
    else if (average >= 80) {
        grade = "B";
    }
    else if (average >= 70) {
        grade = "C";
    }
    else if (average >= 60) {
        grade = "D";
    }
    else {
        grade = "Fail";
    }

    // Determine pass or fail
    let finalResult;

    if (grade === "Fail") {
        finalResult = "Sorry, you failed.";
    }
    else {
        finalResult = "Congratulations! You passed.";
    }

    // Clear previous error
    errorMessage.textContent = "";

    // Display result on webpage
    result.innerHTML = `
        <h2>Student Result</h2>
        <p><strong>Student Name:</strong> <span id="resultName"></span></p>
        <p><strong>Total Marks:</strong> ${total} / 500</p>
        <p><strong>Average Marks:</strong> ${average.toFixed(2)}</p>
        <p><strong>Grade:</strong> ${grade}</p>
        <p><strong>Result:</strong> ${finalResult}</p>
    `;

    // Display student name safely
    document.getElementById("resultName").textContent = studentName;

});
