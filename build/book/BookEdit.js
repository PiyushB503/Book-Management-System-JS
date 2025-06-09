"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editBook = editBook;
const BookDisplay_1 = require("./BookDisplay");
function editBook(isbn, book) {
    const index = book.findIndex((b) => b.isbn === isbn);
    if (index !== -1) {
        const b = book[index];
        document.getElementById("title").value = b.title;
        document.getElementById("author").value = b.author;
        document.getElementById("isbn").value = b.isbn;
        document.getElementById("Publication_Date").value =
            b.publicationDate;
        document.getElementById("genre").value = b.genre;
        book.splice(index, 1);
        (0, BookDisplay_1.displayBooks)(book);
    }
}
