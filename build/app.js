"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const manual_1 = require("./models/manual");
const apibook_1 = require("./models/apibook");
const utils_1 = require("./utils/utils");
const validaotor_1 = require("./utils/validaotor");
const BookDisplay_1 = require("./book/BookDisplay");
const BookEdit_1 = require("./book/BookEdit");
class BookManager {
    books = [];
    constructor() {
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
    addBook(bookData) {
        const { title, author, isbn, publicationDate, genre } = bookData;
        const book = new manual_1.ManualBook(title, author, isbn, publicationDate, genre);
        this.books.unshift(book);
        this.handleDisplayBooks();
    }
    fetchBooksFromAPI() {
        const url = "https://www.googleapis.com/books/v1/volumes?q=subject:fiction";
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
            const books = data.items.map((item) => {
                const vi = item.volumeInfo;
                const si = item.saleInfo;
                let price = "Not for sale";
                if (si?.saleability === "FOR_SALE" && si.listPrice) {
                    price = `${si.listPrice.amount} ${si.listPrice.currencyCode}`;
                }
                vi.price = price;
                return new apibook_1.APIBook(vi);
            });
            this.books = this.books.concat(books);
            this.handleDisplayBooks();
        })
            .catch((err) => console.error("API Error:", err));
    }
    deleteBook(isbn) {
        this.books = this.books.filter((b) => b.isbn !== isbn);
        this.handleDisplayBooks();
    }
    handleDisplayBooks() {
        (0, BookDisplay_1.displayBooks)(this.books);
    }
    handleEdit(isbn) {
        (0, BookEdit_1.editBook)(isbn, this.books);
    }
    sortBooksByAuthor(order) {
        this.books = (0, utils_1.sortItems)(this.books, (a, b) => a.author.localeCompare(b.author));
        if (order === "desc")
            this.books.reverse();
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
            publicationDate: formData.get("publication_date")?.toString() || "",
            genre: formData.get("genre")?.toString() || ""
        };
        const errors = (0, validaotor_1.validateBookInput)(newBook);
        if (errors) {
            alert(errors);
            return;
        }
        this.addBook(newBook);
        form.reset();
    }
}
const bookApp = new BookManager();
