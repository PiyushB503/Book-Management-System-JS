import { Book } from 'interfaces/book.js';

export class BookService {
  private books: Book[] = [];

   getBooks(): Book[] {
    return this.books;
  }

  addBook(book: Book): void {
    this.books.unshift(book);
  }
   addBooksFromApi(apiBooks: Book[]): void {
    this.books = [...this.books, ...apiBooks];
  }
 deleteBookByIsbn(isbn: string): void {
    const index = this.books.findIndex(b => b.isbn === isbn);
    if (index !== -1) {
      this.books.splice(index, 1);
    }
  }
}
