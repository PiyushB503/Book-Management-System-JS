 export interface Book {
    title: string;
    author: string;
    isbn: string;
    publication_date: string;
    genre: string;
    price: string;
    // [key: string]: string;
    getAge(): string;
    getDiscountedPrice(): string;
}

export interface ManualBookInput {
    title: string;
    author: string;
    isbn: string;
    publication_date: string;
    genre: string;
}

export interface Author {
    fullName: string;
    birthYear ? : number;
    nationality ? : string;
    biography ? : string;
}

export interface VolumeInfo {
    title ? : string;
    authors ? : string[];
    publishedDate ? : string;
    categories ? : string[];
    industryIdentifiers ? : {
        identifier: string
    } [];
    price ? : string;
}