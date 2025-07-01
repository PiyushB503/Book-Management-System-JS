import { DISCOUNT_CONFIG } from 'config';
import { Book} from '../interfaces/books';

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
    const currentYear = new Date().getFullYear();
    const publishedYear = new Date(this.publication_date).getFullYear();
    const age = currentYear - publishedYear;
    return `${age} year${age !== 1 ? "s" : ""}`;
  }

getDiscountedPrice(): string {
  if (this.price === "Not for sale" || isNaN(parseFloat(this.price))) return "N/A";

  const yearsOld = new Date().getFullYear() - new Date(this.publication_date).getFullYear();

  if (yearsOld >= DISCOUNT_CONFIG.THRESHOLD) {
    const originalPrice = parseFloat(this.price);
    const discounted = originalPrice * DISCOUNT_CONFIG.RATE;
    const currency = this.price.split(" ")[1] || "";
    return `${discounted.toFixed(2)} ${currency}`;
  }

  return "No discount";
}
}
