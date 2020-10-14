import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const LOGOUT_URL = 'https://127.0.0.1:8000/api/auth/logout/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};
@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(
    private http: HttpClient,
  ) {
  }
  logout(){
    this.http.get(LOGOUT_URL, httpOptions);
  }
}
