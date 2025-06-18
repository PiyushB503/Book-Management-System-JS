import { IBook } from '../interfaces/IBook.js';
import { IManualBookInput } from '../interfaces/IManualBookInput.js';
import { APIBook } from '../models/apibook.js';
import { ManualBook } from '../models/manualBook.js';


export class BookService {
  private books: IBook[] = [];

  addManualBook(book: IManualBookInput): void {
  const { title, author, isbn, publication_date, genre } = book;
  const newBook = new ManualBook(title, author, isbn, publication_date, genre);
  this.books.unshift(newBook);
}

  getBooks(): IBook[] {
    return this.books;
  }

  async fetchBooksFromAPI(): Promise<void> {
    const url = 'https://www.googleapis.com/books/v1/volumes?q=subject:fiction';
    try {
      const response = await fetch(url);
      const data = await response.json();
      const apiBooks: IBook[] = data.items.map((item: any) => {
        const vi = item.volumeInfo;
        const si = item.saleInfo;
        let price = 'Not for sale';
        if (si?.saleability === 'FOR_SALE' && si.listPrice) {
          price = `${si.listPrice.amount} ${si.listPrice.currencyCode}`;
        }
        vi.price = price;
        return new APIBook(vi);
      });
      this.books = [...this.books, ...apiBooks];
    } catch (error) {
      console.error('API Error:', error);
    }
  }
}
