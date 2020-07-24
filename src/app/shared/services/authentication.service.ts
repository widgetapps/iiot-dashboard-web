import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from "../models/user.model";
import { tap } from "rxjs/operators";
import { environment } from "../../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    console.log(email);
    return this.http.post(`${environment.apiUrl}/authenticate`, {'email': email, 'password': password}, httpOptions)
      .pipe(
        tap((res: User) => {
          // authentication and local storage code can go here
          console.log('Login response');
        })
      );
  }

  validate() {

  }

  logout() {

  }
}
