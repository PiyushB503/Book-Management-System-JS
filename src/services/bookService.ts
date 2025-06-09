// src/services/bookService.ts
import { IBook, IManualBookInput, VolumeInfo } from '../interfaces/interface';
import { ManualBook } from '../models/manual';
import { APIBook } from '../models/apibook';
import { sortItems } from '../utils/utils';

export class BookService {
  private books: IBook[] = [];

  // Fetch books from API
  fetchBooksFromAPI(): Promise<IBook[]> {
    const url = "https://www.googleapis.com/books/v1/volumes?q=subject:fiction";
    
    return fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const books: IBook[] = data.items.map((item: any) => {
          const vi: VolumeInfo = item.volumeInfo;
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
  addBook(bookData: IManualBookInput): IBook[] {
    const { title, author, isbn, publication_date, genre } = bookData;
    const book = new ManualBook(title, author, isbn, publication_date, genre);
    this.books.unshift(book); // Add book to the beginning of the array
    return this.books;
  }

  // Delete a book by ISBN
  deleteBook(isbn: string): IBook[] {
    this.books = this.books.filter((b) => b.isbn !== isbn); // Filter out the book with the given ISBN
    return this.books;
  }

  // Sort books by author
  sortBooksByAuthor(order: "asc" | "desc"): IBook[] {
    this.books = sortItems(this.books, (a, b) => a.author.localeCompare(b.author));
    if (order === "desc") this.books.reverse();
    return this.books;
  }

  // Get all books
  getBooks(): IBook[] {
    return this.books;
  }
}
