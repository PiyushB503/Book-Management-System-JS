"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManualBook = void 0;
const books_1 = require("./books");
class ManualBook extends books_1.Book {
    constructor(title, author, isbn, publicationDate, genre) {
        super(title, author, isbn, publicationDate, genre, true);
    }
}
exports.ManualBook = ManualBook;
