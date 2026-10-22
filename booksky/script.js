
var popupOverlay = document.querySelector(".popup-overlay");
var popupBox = document.querySelector(".popup-box");
var addpopupButton = document.getElementById("add-popup-button");

addpopupButton.addEventListener("click", function() {
    popupOverlay.style.display = "block";
    popupBox.style.display = "block";
});

var cancelpopupButton = document.getElementById("cancel-popup");

cancelpopupButton.addEventListener("click", function(event) {
    event.preventDefault();
    popupOverlay.style.display = "none";
    popupBox.style.display = "none";
});

var container = document.querySelector(".container");
var addBook = document.getElementById("add-book");

var bookTitleinput = document.getElementById("book-title-input");
var bookAuthorinput = document.getElementById("book-author-input");
var bookdescriptioninput = document.getElementById("book-description");

addBook.addEventListener("click", function(event) {
    event.preventDefault();

    var div = document.createElement("div");
    div.setAttribute("class", "book-container");

    div.innerHTML = `
        <h2>${bookTitleinput.value}</h2>
        <h4>${bookAuthorinput.value}</h4>
        <p>${bookdescriptioninput.value}</p>
        <button class="delete-button">Delete</button>
    `;

    container.append(div);

    popupOverlay.style.display = "none";
    popupBox.style.display = "none";

    bookTitleinput.value = "";
    bookAuthorinput.value = "";
    bookdescriptioninput.value = "";
});


container.addEventListener("click", function(event) {
    if (event.target.classList.contains("delete-button")) {
        event.target.parentElement.remove();
    }
});
