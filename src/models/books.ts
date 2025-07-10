import { PriceCalculator } from "interfaces/priceCalculator.js";
import { Book } from "../interfaces/book.js";
import { DiscountPriceCalculator } from "../services/discounted-price-calculator.service.js";
import { RegularPriceCalculator } from "../services/regular-price-calculator.service.js";

export class Books implements Book {
  constructor(
    public title: string,
    public author: string,
    public isbn: string,
    public publication_date: string,
    public genre: string,
    public isFavorite: boolean,
    public price: string = "Not for sale"
  ) {}

  getAge(): string {
    const publishedYear = new Date(this.publication_date).getFullYear();
    const age = new Date().getFullYear() - publishedYear;
    return `${age} year${age !== 1 ? "s" : ""}`;
  }

 getDiscountedPrice(): string {
    const yearsOld = new Date().getFullYear() - new Date(this.publication_date).getFullYear();
    const calculator: PriceCalculator =
      yearsOld >= 5 ? new DiscountPriceCalculator() : new RegularPriceCalculator();
    return calculator.calculate(this);
  }
}
