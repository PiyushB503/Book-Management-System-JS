import { ManualBookInput } from '../interfaces/manualBook.js';
import { ManualBooks } from '../models/manual-books.js';
import { Book } from '../interfaces/book.js';

export class ManualBookService {
  createManualBook(bookInput: ManualBookInput): Book {
    const { title, author, isbn, publication_date, genre } = bookInput;
    return new ManualBooks(title, author, isbn, publication_date, genre);
  }
}
