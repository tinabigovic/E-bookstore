import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Book } from 'src/app/model/bookModel';
import { Genre } from 'src/app/model/genreModel';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  private _ngZone: any;
  genres$ = Object.keys(Genre).filter((v) => isNaN(Number(v)));
  book: Book;


  constructor(private bookService:BookService, private router:Router) { }

  ngOnInit(): void {
  }

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  addBook(bookForm: any) {
    if (!bookForm.valid) {
      alert("Nepravilno popunjena forma.");
      return;
    }

    this.book = bookForm.value;

    console.log(bookForm.value["contact"])
    this.book.genre = bookForm.value["genre"];
    this.book.user = localStorage.getItem("username") || "";
    console.log(this.book)
    return this.bookService.addBook(this.book).subscribe((res) => this.router.navigate(['/bookinfo/mylist']))
  }
}
