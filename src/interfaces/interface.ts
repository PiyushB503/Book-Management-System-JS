 export interface IBook {
    title: string;
    author: string;
    isbn: string;
    publication_date: string;
    genre: string;
    isFavorite: boolean;
    price: string;
    // [key: string]: string;
    getAge(): string;
    getDiscountedPrice(): string;
}

export interface IManualBookInput {
    title: string;
    author: string;
    isbn: string;
    publication_date: string;
    genre: string;
}

export interface IAuthor {
    fullName: string;
    birthYear ? : number;
    nationality ? : string;
    biography ? : string;
}

export interface ICategory {
    name: string;
    description ? : string;
    parentCategory ? : string;
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