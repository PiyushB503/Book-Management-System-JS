import { Book } from './books.js';
export class ManualBook extends Book {
    constructor(title, author, isbn, publication_date, genre) {
        super(title, author, isbn, publication_date, genre, true);
    }
}
