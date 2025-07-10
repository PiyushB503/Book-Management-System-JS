import { ManualBookInput } from "../interfaces/manualBook.js";

export class BookValidator {
  validate(book: ManualBookInput): string[] {
    const errors: string[] = [];

    if (!book.title?.trim()) errors.push("Title is required.");
    if (!book.author?.trim()) errors.push("Author is required.");
    if (!book.isbn?.trim()) {
      errors.push("ISBN is required.");
    } else if (!/^\d{10,13}$/.test(book.isbn)) {
      errors.push("ISBN must be 10–13 digits.");
    }

    if (!book.publication_date?.trim()) {
      errors.push("Publication date is required.");
    } else {
      const date = new Date(book.publication_date);
      if (isNaN(date.getTime())) {
        errors.push("Publication date is invalid.");
      }
    }

    if (!book.genre?.trim()) errors.push("Genre is required.");

    return errors;
  }
}
