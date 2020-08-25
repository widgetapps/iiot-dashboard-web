import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    return this.http.post(`${environment.apiUrl}/authenticate`, {'email': email, 'password': password}, httpOptions);
    /*
      .pipe(
        tap(response => {
          // authentication and local storage code can go here
          console.log('Login response: ' + JSON.stringify(response));
        })
      );
     */
  }

  validate() {

  }

  logout() {

  }
}
