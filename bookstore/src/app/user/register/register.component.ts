import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


//treba iskoristit servis
constructor(private userService: UserService, private router: Router) { }

public username: string = '';
public password: string = '';
ngOnInit(): void {
}

register() {
  return this.userService.register(this.username, this.password).subscribe(resp => {
    alert(resp.msg);
    this.router.navigate(['/login']);
  });
}

}
