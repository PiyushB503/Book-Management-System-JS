import { Book } from "./book";

export abstract class PriceCalculator {
  abstract calculate(book: Book): string;
}
