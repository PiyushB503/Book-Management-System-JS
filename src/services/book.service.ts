// src/services/bookService.ts
import { Book, ManualBookInput, VolumeInfo } from '../interfaces/books';
import { ManualBook } from '../models/manualBook';
import { ApiBook } from '../models/apiBook';
import { sortItems } from '../utils/arrayUtils';
import { BOOKS_API_URL } from '../config';


export class BookService {
  private books: Book[] = [];

  // Fetch books from API
  fetchBooksFromAPI(): Promise<Book[]> {
    const url =  BOOKS_API_URL;;

     if (!url) {
    console.error("BOOKS_API_URL is not defined");
    return Promise.resolve([]);
  }
    
    return fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const books: Book[] = data.items.map((item: any) => {
          const vi: VolumeInfo = item.volumeInfo;
          const si = item.saleInfo;
          let price = "Not for sale";
          if (si?.saleability === "FOR_SALE" && si.listPrice) {
            price = `${si.listPrice.amount} ${si.listPrice.currencyCode}`;
          }
          vi.price = price;
          return new ApiBook(vi);
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
  addBook(bookData: ManualBookInput): Book[] {
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
sortBooksByAuthor(order: "asc" | "desc"): Book[] {
  this.books = sortItems(this.books, (a, b) => {
    return order === "asc"
      ? a.author.localeCompare(b.author)
      : b.author.localeCompare(a.author);
  });
  return this.books;
}

  // Get all books
  getBooks(): Book[] {
    return this.books;
  }
}
