import { IBook} from '../interfaces/interface';

export class Book implements IBook {
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
    if (yearsOld >= 5) {
      const discounted = parseFloat(this.price) * 0.8;
      return `${discounted.toFixed(2)} ${this.price.split(" ")[1] || ""}`;
    }
    return "No discount";
  }
}
