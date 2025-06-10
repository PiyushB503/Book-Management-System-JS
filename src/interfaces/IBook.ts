export interface IBook {
  title: string;
  author: string;
  isbn: string;
  publication_date: string;
  genre: string;
  price?: string;
  getAge(): string;
  getDiscountedPrice(): string;
}
