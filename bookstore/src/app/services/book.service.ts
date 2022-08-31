import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../model/bookModel';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient: HttpClient) { }

  BACKEND_BASE = 'http://localhost:3000';

  getBooks(query: string): Observable<any> {
    return this.httpClient.get<Book[]>(this.BACKEND_BASE + "/api/movie", {
      params: { q: query }
    })
  }

  addBook(book: Book): Observable<Book> {
    return this.httpClient.post<Book>(this.BACKEND_BASE + "/api/movie", book);
  }

  getMyBooks(user: String): Observable<any> {
    return this.httpClient.get<Book[]>(this.BACKEND_BASE + "/api/movie/" + user)
  }

  changeBook(id: number, changeName: String, changeAuthor: String, changePrice: number,
    changeDescription: String, changeImageURL: String, changeGenre: String, changeContact:String): Observable<any> {

   
    return this.httpClient.patch(this.BACKEND_BASE + "/api/movie/" + id, {
      changeName: changeName,
      changeAuthor: changeAuthor,
      changePrice: changePrice,
      changeDescription: changeDescription,
      changeImageURL: changeImageURL,
      changeGenre: changeGenre,
      changeContact: changeContact
    });
  }

  booksByGenre(genre: String): Observable<any> {
    console.log("Usao u servis")
    return this.httpClient.get<Book[]>(this.BACKEND_BASE + "/api/movie/genreS/" + genre)
  }

}