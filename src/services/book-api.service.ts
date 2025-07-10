import { ApiBook } from '../models/api-book.js';
import { API_CONFIG } from '../config/api-config.js';
import { Book } from '../interfaces/book.js';

export class BookApiService {
  private baseUrl = API_CONFIG.BASE_URL;

  async fetchBooksFromAPI(): Promise<Book[]> {
    try {
      const response = await fetch(this.baseUrl);
      const data = await response.json();

      if (!data.items) {
        console.warn('No books found in API response.');
        return [];
      }

      const apiBooks: Book[] = data.items.map((item: any) => {
        const vi = item.volumeInfo;
        const si = item.saleInfo;

        let price = 'Not for sale';
        if (si?.saleability === 'FOR_SALE' && si.listPrice) {
          price = `${si.listPrice.amount} ${si.listPrice.currencyCode}`;
        }

        vi.price = price;
        return new ApiBook(vi); // ApiBook implements Book interface
      });

      return apiBooks; // ✅ return the books
    } catch (error) {
      console.error('API Error:', error);
      return []; // return empty array on error
    }
  }
}
