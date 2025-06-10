import { VolumeInfo } from '../interfaces/VolumeInfo';
import { Book } from './books';

export class APIBook extends Book {
  constructor(volumeInfo: VolumeInfo) {
    const title = volumeInfo.title || "N/A";
    const author = volumeInfo.authors?.join(", ") || "N/A";
    const isbn = volumeInfo.industryIdentifiers?.[0]?.identifier || `API-${Math.random().toString(36).substr(2, 9)}`;
    const publication_date = volumeInfo.publishedDate || "N/A";
    const genre = volumeInfo.categories?.join(", ") || "N/A";
    const price = volumeInfo.price || "Not for sale";

    super(title, author, isbn, publication_date, genre, false, price);
  }
}
