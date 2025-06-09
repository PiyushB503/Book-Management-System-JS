import { ManualBook } from '../models/manual.js';
import { APIBook } from '../models/apibook.js';
import { sortItems } from '../utils/utils.js';
export class BookService {
    books = [];
    // Fetch books from API
    fetchBooksFromAPI() {
        const url = "https://www.googleapis.com/books/v1/volumes?q=subject:fiction";
        return fetch(url)
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
                return new APIBook(vi);
            });
            this.books = this.books.concat(books); // Merge fetched books
            return this.books;
        })
            .catch((err) => {
            console.error("API Error:", err);
            return [];
        });
    }
    // Add a new book
    addBook(bookData) {
        const { title, author, isbn, publication_date, genre } = bookData;
        const book = new ManualBook(title, author, isbn, publication_date, genre);
        this.books.unshift(book); // Add book to the beginning of the array
        return this.books;
    }
    // Delete a book by ISBN
    deleteBook(isbn) {
        this.books = this.books.filter((b) => b.isbn !== isbn); // Filter out the book with the given ISBN
        return this.books;
    }
    // Sort books by author
    sortBooksByAuthor(order) {
        this.books = sortItems(this.books, (a, b) => a.author.localeCompare(b.author));
        if (order === "desc")
            this.books.reverse();
        return this.books;
    }
    // Get all books
    getBooks() {
        return this.books;
    }
}
