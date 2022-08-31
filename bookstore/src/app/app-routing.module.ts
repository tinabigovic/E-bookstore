import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './bookinfo/add-book/add-book.component';
import { BookListComponent } from './bookinfo/book-list/book-list.component';
import { ChangebookComponent } from './bookinfo/changebook/changebook.component';
import { MybooksComponent } from './bookinfo/mybooks/mybooks.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'bookinfo/add', component: AddBookComponent, canActivate: [AuthGuard]},
  {path:'bookinfo/list', component: BookListComponent, canActivate: [AuthGuard]},
  {path:'bookinfo/mylist', component: MybooksComponent, canActivate: [AuthGuard]},
  {path:'**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
