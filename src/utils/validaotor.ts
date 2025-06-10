import { IManualBookInput } from "../interfaces/IManualBookInput";

export function validateBookInput(book: IManualBookInput): string {
  let errors = "";

  if (!book.title || !book.author || !book.isbn || !book.publication_date || !book.genre) {
    errors += "All fields are required.\n";
  }

  if (book.isbn.length !== 13 || isNaN(Number(book.isbn))) {
    errors += "ISBN must be a 13-digit number.\n";
  }

  if (new Date(book.publication_date) > new Date()) {
    errors += "Publication date cannot be in the future.\n";
  }

  return errors;
}
