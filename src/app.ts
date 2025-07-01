import { BookService } from './services/book.service';
import { displayBooks } from './book/bookDisplay';
import { editBook } from './book/bookEdit';
import { validateBookInput } from './utils/validatorUtils';
import { ManualBookInput } from './interfaces/books';
class BookManager {
  private bookService: BookService;

  constructor() {
    this.bookService = new BookService();
    document.addEventListener("DOMContentLoaded", () => this.initialize());
  }

  initialize(): void {
    this.fetchBooksFromAPI();

    const eventConfig = [
      { id: "genreFilter", event: "change", handler: () => this.handleDisplayBooks() },
      { id: "searchBtn", event: "click", handler: () => this.handleDisplayBooks() },
      { id: "sortAscButton", event: "click", handler: () => this.sortBooksByAuthor("asc") },
      { id: "sortDescButton", event: "click", handler: () => this.sortBooksByAuthor("desc") },
      { id: "formField", event: "submit", handler: (e: Event) => this.handleFormSubmit(e) }
    ];

    eventConfig.forEach(({ id, event, handler }) => {
      const element = document.getElementById(id);
      if (element) {
        element.addEventListener(event, handler);
      }
    });

const tableBody = document.getElementById("bookTableBody");

if (tableBody) {
  tableBody.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    const isbn = target.closest("button")?.getAttribute("data-isbn");

    if (!isbn) return;

    if (target.classList.contains("edit-btn")) {
      this.handleEdit(isbn);
    } else if (target.classList.contains("delete-btn")) {
      const success = this.deleteBook(isbn);

      if (success) {
        alert("Book deleted successfully.");
      } else {
        alert("Failed to delete the book. Book not found.");
      }
    }
  });
}
  }

  fetchBooksFromAPI(): void {
    this.bookService.fetchBooksFromAPI()
      .then((books) => this.handleDisplayBooks())
      .catch((err) => console.error("API Error:", err));
  }

  addBook(bookData: ManualBookInput): void {
    const updatedBooks = this.bookService.addBook(bookData);
    this.handleDisplayBooks();
  }

 deleteBook(isbn: string): boolean {
  const success = this.bookService.deleteBook(isbn);

  if (success) {
    this.handleDisplayBooks();
  }

  return success;
}
 handleDisplayBooks(): void {
    const books = this.bookService.getBooks();
    displayBooks(books);
  }

  handleEdit(isbn: string): void {
    editBook(isbn, this.bookService.getBooks());
  }

  sortBooksByAuthor(order: "asc" | "desc"): void {
    const sortedBooks = this.bookService.sortBooksByAuthor(order);
    this.handleDisplayBooks();
  }

  handleFormSubmit(event: Event): void {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const newBook: ManualBookInput = {
      title: formData.get("title")?.toString().trim() || "",
      author: formData.get("author")?.toString().trim() || "",
      isbn: formData.get("isbn")?.toString().trim() || "",
      publication_date: formData.get("publication_date")?.toString() || "",
      genre: formData.get("genre")?.toString() || ""
    };

    const errors = validateBookInput(newBook);
    if (errors) {
      alert(errors);
      return;
    }

    this.addBook(newBook);
    form.reset();
  }
}

const bookApp = new BookManager();
