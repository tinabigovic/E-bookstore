import { Genre } from "./genreModel";

export interface Book {
    id: number;
    name: String;
    author: String;
    price: number;
    description: String;
    imageURL: String;
    genre: Genre;
    user: String;
    contact: String;
}