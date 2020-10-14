import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserReal} from '../_models/user-real';
import {Course} from '../_models/course';
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
  WHO(){
    const USE_URL = 'https://back-dashboard.herokuapp.com/api/courses/' + localStorage.getItem('user') + '/';
    return this.http.get(USE_URL, httpOptions);
  }
}
