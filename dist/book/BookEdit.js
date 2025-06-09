import { displayBooks } from "./BookDisplay.js";
export function editBook(isbn, book) {
    const index = book.findIndex((b) => b.isbn === isbn);
    if (index !== -1) {
        const b = book[index];
        document.getElementById("title").value = b.title;
        document.getElementById("author").value = b.author;
        document.getElementById("isbn").value = b.isbn;
        document.getElementById("publication_date").value =
            b.publication_date;
        document.getElementById("genre").value = b.genre;
        book.splice(index, 1);
        displayBooks(book);
    }
}
