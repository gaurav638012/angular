import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models';
import {UserMy} from '../_models/user-my';
const REGISTER_URL = 'https://back-dashboard.herokuapp.com/api/user/asc/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient)
  {
  }
  register(user: User): Observable<UserMy>
  {
    return this.http.post<UserMy>(REGISTER_URL, user, httpOptions);
  }
}
