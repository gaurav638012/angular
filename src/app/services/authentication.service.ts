import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Login} from '../_models/login';
import {UserMy} from '../_models/user-my';
import {UserToken} from '../_models/user-token';
import * as uuid from 'uuid';
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
  login(data: Login): Observable<UserToken>
  {
    data['uuid']=uuid.v4();
    this.currentUserValue = this.http.post<UserToken>(LOGIN_URL, data, httpOptions);
    return this.currentUserValue;
  }
}
