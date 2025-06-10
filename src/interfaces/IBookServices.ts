
import { IBook } from './IBook';
import { IManualBookInput } from './IManualBookInput';

export interface IBookService {
  fetchBooksFromAPI(): Promise<void>;
  addBook(bookData: IManualBookInput): void;
  deleteBook(isbn: string): void;
  sortBooksByAuthor(order: "asc" | "desc"): void;
  getBooks(): IBook[];
}
