
// Student details
let studentName = prompt("Enter student name:");

let total = 0;
let isValid = true;

// Subject details
let subjects = 5;

// Get marks for 5 subjects
for (let i = 1; i <= subjects; i++) {

    let marks = Number(prompt("Enter marks for subject " + i + ":"));

    // Validate marks
    if (marks < 0 || marks > 100 || !Number.isFinite(marks)) {

        console.log("Invalid marks entered for subject " + i);

        isValid = false;

        break;
    }

    // Calculate total
    total = total + marks;
}

// Calculate result only if all marks are valid
if (isValid) {

    let average = total / subjects;
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

    // Display student result
    console.log("Student Name: " + studentName);
    console.log("Total Marks: " + total + " / 500");
    console.log("Average Marks: " + average);
    console.log("Grade: " + grade);

    if (grade === "Fail") {
        console.log("Result: Sorry, you failed.");
    }
    else {
        console.log("Result: Congratulations! You passed.");
    }

}
else {
    console.log("Result cannot be calculated due to invalid marks.");
}
