import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {BASE_URL} from './base';
const LOGOUT_URL = BASE_URL+'/api/auth/logout/';
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
    const USE_URL=LOGOUT_URL+localStorage.getItem('user')+'/'
    console.log(USE_URL)
    return this.http.get(USE_URL, httpOptions);
  }
}
