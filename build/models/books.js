"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
class Book {
    title;
    author;
    isbn;
    publicationDate;
    genre;
    isFavorite;
    price;
    constructor(title, author, isbn, publicationDate, genre, isFavorite, price = "Not for sale") {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.publicationDate = publicationDate;
        this.genre = genre;
        this.isFavorite = isFavorite;
        this.price = price;
    }
    getAge() {
        const currentYear = new Date().getFullYear();
        const publishedYear = new Date(this.publicationDate).getFullYear();
        const age = currentYear - publishedYear;
        return `${age} year${age !== 1 ? "s" : ""}`;
    }
    getDiscountedPrice() {
        if (this.price === "Not for sale" || isNaN(parseFloat(this.price)))
            return "N/A";
        const yearsOld = new Date().getFullYear() - new Date(this.publicationDate).getFullYear();
        if (yearsOld >= 5) {
            const discounted = parseFloat(this.price) * 0.8;
            return `${discounted.toFixed(2)} ${this.price.split(" ")[1] || ""}`;
        }
        return "No discount";
    }
}
exports.Book = Book;
