import { Books } from './books';

export class ManualBook extends Books {
  constructor(
    title: string,
    author: string,
    isbn: string,
    publication_date: string,
    genre: string
  ) {
    super(title, author, isbn, publication_date, genre, true);
  }
}