import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from 'src/app/model/bookModel';
import { BookdetailsComponent } from '../bookdetails/bookdetails.component';
import { ChangebookComponent } from '../changebook/changebook.component';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss']
})
export class BookItemComponent implements OnInit {

  @Input()
  public book: Book;

  user = localStorage.getItem("username")  == null ? "" : localStorage.getItem("username") ;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDetailsDialog() {
    const dialogRef = this.dialog.open(BookdetailsComponent, {
      data: {
        name: this.book.name,
        author: this.book.author,
        description: this.book.description,
        imageURL: this.book.imageURL,
        genre: this.book.genre,
        user: this.book.user,
        contact: this.book.contact
      }
    });
  }

  openChangeDialog() {
    const dialogRef = this.dialog.open(ChangebookComponent, {
      data: {
        id: this.book.id,
        name: this.book.name,
        author: this.book.author,
        description: this.book.description,
        imageURL: this.book.imageURL,
        genre: this.book.genre,
        user: this.book.user,
        contact: this.book.contact
      }
    });
  }

}

