import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs-compat/operator/switchMap';
import { Book } from 'src/app/model/bookModel';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-mybooks',
  templateUrl: './mybooks.component.html',
  styleUrls: ['./mybooks.component.scss']
})
export class MybooksComponent implements OnInit {

  public myBooks$: Observable<Book[]>;
  user = "";
  public searchTerm: string = '';
  private searchSubject: Subject<string> = new Subject();
  private reloadBooksList: Subject<void> = new Subject();

  constructor(private bookService:BookService) { }

  ngOnInit(): void {
    this.user = localStorage.getItem("username") || "" ;
    
    this.myBooks$ = this.searchSubject
    .startWith(this.searchTerm)
    .debounceTime(300)
    .distinctUntilChanged()
    .merge(this.reloadBooksList)
    .switchMap((query) => this.bookService.getMyBooks(this.user));
  }
} 
