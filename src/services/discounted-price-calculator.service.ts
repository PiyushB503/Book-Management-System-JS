import { Book } from "../interfaces/book.js";
import { PriceCalculator } from "../interfaces/priceCalculator.js";

export class DiscountPriceCalculator extends PriceCalculator {
  calculate(book: Book): string {
    if (!book.price || isNaN(parseFloat(book.price))) return "N/A";

    const originalPrice = parseFloat(book.price);
    const currency = book.price.replace(/[0-9.]/g, "").trim();
    const discountedPrice = (originalPrice * 0.8).toFixed(2);
    return `${discountedPrice} ${currency}`;
  }
}
