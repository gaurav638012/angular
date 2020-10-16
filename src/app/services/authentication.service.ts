import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Login} from '../_models/login';
import {UserMy} from '../_models/user-my';
import {BASE_URL} from './base';
const LOGIN_URL = BASE_URL+'/api/auth/login/';
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
  login(data: Login): Observable<UserMy>
  {
    this.currentUserValue = this.http.post<UserMy>(LOGIN_URL, data, httpOptions);
    return this.currentUserValue;
  }
}
