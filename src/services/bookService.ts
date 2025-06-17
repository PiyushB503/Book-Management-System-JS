// src/services/bookService.ts
import { IBook, IManualBookInput, VolumeInfo } from '../interfaces/books';
import { ManualBook } from '../models/manual';
import { APIBook } from '../models/apibook';
import { sortItems } from '../utils/arrayUtils';
import { BOOKS_API_URL } from '../config';


export class BookService {
  private books: IBook[] = [];

  // Fetch books from API
  fetchBooksFromAPI(): Promise<IBook[]> {
    const url =  BOOKS_API_URL;;

     if (!url) {
    console.error("BOOKS_API_URL is not defined");
    return Promise.resolve([]);
  }
    
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
 deleteBook(isbn: string): boolean {
  const index = this.books.findIndex((b) => b.isbn === isbn);

  if (index === -1) {
    return false;
  }

  this.books.splice(index, 1);
  return true;
}

  // Sort books by author
sortBooksByAuthor(order: "asc" | "desc"): IBook[] {
  this.books = sortItems(this.books, (a, b) => {
    return order === "asc"
      ? a.author.localeCompare(b.author)
      : b.author.localeCompare(a.author);
  });
  return this.books;
}

  // Get all books
  getBooks(): IBook[] {
    return this.books;
  }
}
