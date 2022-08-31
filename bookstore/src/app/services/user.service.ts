import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  BACKEND_BASE = "http://localhost:3000"

  login(username: string, password: string): Observable<any> {
    return this.httpClient.post(this.BACKEND_BASE + "/api/user/login", {
      username: username,
      password: password
    }).pipe(map((resp: any) => {
      alert(resp.msg)
      return resp;
    }));
  }

  register(username: string, password: string): Observable<any> {
    return this.httpClient.post(this.BACKEND_BASE + "/api/user/register", {
      username: username,
      password: password
    });
  }
}
