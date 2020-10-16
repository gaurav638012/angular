import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserReal} from '../_models/user-real';
import {Course} from '../_models/course';
import {BASE_URL} from './base';
const USER_URL = BASE_URL+'/api/user/';
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
    const USE_URL = BASE_URL+'/api/courses/' + localStorage.getItem('user') + '/';
    return this.http.get(USE_URL, httpOptions);
  }
  STATUS(id:number){
    const USE_URL=BASE_URL+'/api/user/'+id.toString()+'/abc/'+localStorage.getItem('user')+'/';
    return this.http.get(USE_URL,httpOptions);
  }
}
