import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BookInfo';
  user = localStorage.getItem("username")  == null ? "" : localStorage.getItem("username") ;

  onLogout() {
    console.log("logout");
    localStorage.removeItem("username");
    localStorage.clear();
    window.location.reload();
  }
}
