import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const LOGOUT_URL = 'https://back-dashboard.herokuapp.com/api/auth/logout/';
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
