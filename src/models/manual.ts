import { Book } from './books';

export class ManualBook extends Book {
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