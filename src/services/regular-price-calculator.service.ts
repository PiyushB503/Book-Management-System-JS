import { Book } from "../interfaces/book.js";
import { PriceCalculator } from "../interfaces/priceCalculator.js";

export class RegularPriceCalculator extends PriceCalculator {
  calculate(book: Book): string {
    return book.price ?? "Not for sale";
  }
}
