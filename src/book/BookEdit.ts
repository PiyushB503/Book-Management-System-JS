import { Book } from "../interfaces/books";
import { displayBooks } from "./bookDisplay";

  export function editBook(isbn: string ,book: Book[]): void {
    const index = book.findIndex((b) => b.isbn === isbn);
    if (index !== -1) {
      const b = book[index];
      (document.getElementById("title") as HTMLInputElement).value = b.title;
      (document.getElementById("author") as HTMLInputElement).value = b.author;
      (document.getElementById("isbn") as HTMLInputElement).value = b.isbn;
      (document.getElementById("publication_date") as HTMLInputElement).value =
        b.publication_date;
      (document.getElementById("genre") as HTMLSelectElement).value = b.genre;
      book.splice(index, 1);
      displayBooks(book);
       alert("Book loaded for editing successfully!");
    }
  }
