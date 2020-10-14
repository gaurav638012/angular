import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserReal} from '../_models/user-real';
const USER_URL = 'https://back-dashboard.herokuapp.com/api/user/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};
@Injectable({
  providedIn: 'root'
})
export class UserwhoService {

  constructor(
    private http: HttpClient,
  ) { }
  WHO(): Observable<UserReal>{
    const USE_URL = 'http://127.0.0.1:8000/api/courses/' + localStorage.getItem('user') + '/';
    return this.http.get<UserReal>(USE_URL, httpOptions);
  }
}
