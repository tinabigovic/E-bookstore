import { NgModule,  } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BookItemComponent } from './bookinfo/book-item/book-item.component';
import { BookListComponent } from './bookinfo/book-list/book-list.component';
import { AddBookComponent } from './bookinfo/add-book/add-book.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

import { MatMenuModule} from '@angular/material/menu';
import { UserService } from './services/user.service';
import { AuthGuard } from './guard/auth.guard';
import { BookService } from './services/book.service';
import { TokenInterceptor } from './services/token-interceptor';
import { MybooksComponent } from './bookinfo/mybooks/mybooks.component';
import {MatDialogModule} from '@angular/material/dialog';
import { BookdetailsComponent } from './bookinfo/bookdetails/bookdetails.component';
import { ChangebookComponent } from './bookinfo/changebook/changebook.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    BookItemComponent,
    BookListComponent,
    AddBookComponent,
    MybooksComponent,
    BookdetailsComponent,
    ChangebookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule
  ],
  providers: [UserService, BookService, AuthGuard,  {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
