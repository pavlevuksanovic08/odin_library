let myLibrary = [];

//DOM Elements from HTML document
let table = document.querySelector("table");
const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".newBookBtn button");
const confirmBtn = dialog.querySelector("#confirmBtn");
const cancelBtn = dialog.querySelector("#cancelBtn")
const titleInput = dialog.querySelector(".titleInput");
const authorInput = dialog.querySelector(".authorInput");
const genreInput = dialog.querySelector(".genreInput");
const nopInput = dialog.querySelector(".nopInput");
const yearInput = dialog.querySelector(".yearInput");
const readBtns = document.querySelectorAll(".readBtn");
const bookAttributes = ["title", "author", "genre", "numberOfPages", "year"];

//BOOK object
function Book(title, author, genre, numberOfPages, year) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.numberOfPages = numberOfPages;
    this.year = year;
    this.read = false;
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

//function that creates book object and stores it in library
function addBookToLibrary(title, author, genre, numberOfPages, year) {
    let newBook = new Book(title, author, genre, numberOfPages, year);
    myLibrary.push(newBook);
}

addBookToLibrary("Harry Potter", "unknown", "sci-fi", 300, 2002);

function displayLibrary() {

    //clear table
    let tableBody = document.querySelector("tbody");
    tableBody.remove();

    //render new table
    let index = 0;

    let tbody = document.createElement("tbody");
    for (let book of myLibrary) {
        let row = document.createElement("tr");
        for (let attribute of bookAttributes) {
            let cell = document.createElement("td");
            cell.textContent = book[attribute];
            row.appendChild(cell);
        }
        
        //read status
        let readStatusCell = document.createElement("td")
        let readToggleBtn = document.createElement("button");

        readToggleBtn.className = "readBtn";

        readToggleBtn.addEventListener("click", () => {
            book.toggleRead();
            if (book.read) {
                readToggleBtn.style.backgroundColor = "green";
            } else {
                readToggleBtn.style.backgroundColor = "red";
            }
        });

        if (book.read) {
            readToggleBtn.style.backgroundColor = "green";
        } else {
            readToggleBtn.style.backgroundColor = "red";
        }

        readStatusCell.appendChild(readToggleBtn);
        row.appendChild(readStatusCell);

        //delete row
        let rand = document.createElement("td");
        let deleteButton = document.createElement("button");

        deleteButton.value = index;
        deleteButton.className = "deleteBtn";

        deleteButton.addEventListener("click", () => {
            myLibrary.splice(deleteButton.value, 1);
            displayLibrary();
        });

        index += 1;

        rand.appendChild(deleteButton);
        row.appendChild(rand);
        tbody.appendChild(row);
    }

    table.appendChild(tbody);
}

readBtns.forEach((readBtn) => {
    readBtn.addEventListener("click", () => {
        Book.toogleRead()
    });
});

//displays library as a table
displayLibrary();

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

//closes the dialog
cancelBtn.addEventListener("click", () => {

    dialog.close();

    titleInput.value = "";
    authorInput.value = "";
    genreInput.value = "";
    nopInput.value = "";
    yearInput.value = "";
});

//Creates new book based on user's inputs
confirmBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const title = titleInput.value;
    const author = authorInput.value;
    const genre = genreInput.value;
    const nop = nopInput.value;
    const year = yearInput.value;

    addBookToLibrary(title, author, genre, nop, year);

    titleInput.value = "";
    authorInput.value = "";
    genreInput.value = "";
    nopInput.value = "";
    yearInput.value = "";

    dialog.close();

    displayLibrary();
});