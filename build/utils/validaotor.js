"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBookInput = validateBookInput;
function validateBookInput(book) {
    let errors = "";
    // if (!book.title || !book.author || !book.isbn || !book.publicationDate || !book.genre) {
    //   errors += "All fields are required.\n";
    // }
    if (book.isbn.length !== 13 || isNaN(Number(book.isbn))) {
        errors += "ISBN must be a 13-digit number.\n";
    }
    if (new Date(book.publicationDate) > new Date()) {
        errors += "Publication date cannot be in the future.\n";
    }
    return errors;
}
