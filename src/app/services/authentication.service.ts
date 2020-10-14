import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Login} from '../_models/login';
import {UserReal} from '../_models/user-real';
const LOGIN_URL = 'http://127.0.0.1:8000/api/auth/login/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUserValue;
  constructor(
    private http: HttpClient,
  ) { }
  login(data: Login): Observable<UserReal>
  {
    this.currentUserValue = this.http.post<UserReal>(LOGIN_URL, data, httpOptions);
    return this.currentUserValue;
  }
}
