import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Book } from 'src/app/model/bookModel';
import { Genre } from 'src/app/model/genreModel';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-changebook',
  templateUrl: './changebook.component.html',
  styleUrls: ['./changebook.component.scss']
})
export class ChangebookComponent implements OnInit {

  book: Book;
  bookname = "ispis";
  genres$ = Object.keys(Genre).filter((v) => isNaN(Number(v)));

  constructor(@Inject(MAT_DIALOG_DATA) public data: Book, private bookService: BookService, private router:Router) { }

  ngOnInit(): void {
  }

  changeBook(bookForm: any) {
    console.log("usao u komponentu")
    let bookId = this.data.id;
    let changeName = bookForm.value["name"];
    let changeAuthor = bookForm.value["author"];
    let changePrice = bookForm.value["price"];
    let changeDescription = bookForm.value["description"];
    let changeImageURL = bookForm.value["imageURL"];
    let changeGenre = bookForm.value["genre"];
    let changeContact = bookForm.value["contact"]
    this.bookService.changeBook(bookId, changeName, changeAuthor,
      changePrice, changeDescription, changeImageURL, changeGenre, changeContact).subscribe(res => {
        // alert("Changed")
      })
      this.reloadPage();
      this.router.navigate(['/bookinfo/mylist']);
  }

  reloadPage() {
    setTimeout(()=>{
      window.location.reload();
    }, 100);
  }

}
