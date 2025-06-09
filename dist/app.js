// src/app.ts (or wherever your BookManager is defined)
import { BookService } from './services/bookService.js';
import { displayBooks } from './book/BookDisplay.js';
import { editBook } from './book/BookEdit.js';
import { validateBookInput } from './utils/validaotor.js';
class BookManager {
    bookService;
    constructor() {
        this.bookService = new BookService();
        document.addEventListener("DOMContentLoaded", () => this.initialize());
    }
    initialize() {
        this.fetchBooksFromAPI();
        const eventConfig = [
            { id: "genreFilter", event: "change", handler: () => this.handleDisplayBooks() },
            { id: "searchBtn", event: "click", handler: () => this.handleDisplayBooks() },
            { id: "sortAscButton", event: "click", handler: () => this.sortBooksByAuthor("asc") },
            { id: "sortDescButton", event: "click", handler: () => this.sortBooksByAuthor("desc") },
            { id: "formField", event: "submit", handler: (e) => this.handleFormSubmit(e) }
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
                const target = event.target;
                const isbn = target.closest("button")?.getAttribute("data-isbn");
                if (!isbn)
                    return;
                if (target.classList.contains("edit-btn")) {
                    this.handleEdit(isbn);
                }
                else if (target.classList.contains("delete-btn")) {
                    this.deleteBook(isbn);
                }
            });
        }
    }
    fetchBooksFromAPI() {
        this.bookService.fetchBooksFromAPI()
            .then((books) => this.handleDisplayBooks())
            .catch((err) => console.error("API Error:", err));
    }
    handleDisplayBooks() {
        const books = this.bookService.getBooks();
        displayBooks(books);
    }
    addBook(bookData) {
        const updatedBooks = this.bookService.addBook(bookData);
        this.handleDisplayBooks();
    }
    deleteBook(isbn) {
        const updatedBooks = this.bookService.deleteBook(isbn);
        this.handleDisplayBooks();
    }
    handleEdit(isbn) {
        editBook(isbn, this.bookService.getBooks());
    }
    sortBooksByAuthor(order) {
        const sortedBooks = this.bookService.sortBooksByAuthor(order);
        this.handleDisplayBooks();
    }
    handleFormSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const newBook = {
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
