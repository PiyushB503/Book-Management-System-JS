import { Books } from "./books.js";


export class ManualBooks extends Books {
  constructor(title: string, author: string, isbn: string, publication_date: string, genre: string) {
    super(title, author, isbn, publication_date, genre, true);
  }
}
