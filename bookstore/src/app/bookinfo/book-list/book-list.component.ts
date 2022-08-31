import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/switchMap';

import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Book } from 'src/app/model/bookModel';
import { BookService } from 'src/app/services/book.service';
import { Genre } from 'src/app/model/genreModel';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  public books$: Observable<Book[]>;
  genres$ = Object.keys(Genre).filter((v) => isNaN(Number(v)));
  public searchTerm: string = '';
  public booksGenre: Observable<Book[]>

  private searchSubject: Subject<string> = new Subject();
  private reloadBooksList: Subject<void> = new Subject();

  constructor(private bookService: BookService) { 
  }

  ngOnInit() {
    this.books$ = this.searchSubject
        .startWith(this.searchTerm)
        .debounceTime(300)
        .distinctUntilChanged()
        .merge(this.reloadBooksList)
        .switchMap((query) => this.bookService.getBooks(this.searchTerm));
  }

  booksByGenre(bookForm:any) {
    let genre = bookForm.value["genre"];
    console.log(genre);

    this.booksGenre = this.searchSubject
    .startWith(this.searchTerm)
    .debounceTime(300)
    .distinctUntilChanged()
    .merge(this.reloadBooksList)
    .switchMap((query) => this.bookService.booksByGenre(genre));
  }

  search() {
    this.searchSubject.next(this.searchTerm);
  }

  reload() {
    window.location.reload();
  }

}