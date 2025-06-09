import { Book } from './books';
import { VolumeInfo } from '../interfaces/interface';

export class APIBook extends Book {
  constructor(volumeInfo: VolumeInfo) {
    const title = volumeInfo.title || "N/A";
    const author = volumeInfo.authors?.join(", ") || "N/A";
    const isbn =
      volumeInfo.industryIdentifiers?.[0]?.identifier ||
      `API-${Math.random().toString(36).substr(2, 9)}`;
    const publicationDate = volumeInfo.publishedDate || "N/A";
    const genre = volumeInfo.categories?.join(", ") || "N/A";
    const price = volumeInfo.price || "Not for sale";

    super(title, author, isbn, publicationDate, genre, false, price);
  }
}