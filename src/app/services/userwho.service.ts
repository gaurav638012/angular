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
  /**
   * 
   */
  WHO(){
    const USE_URL = BASE_URL+'/api/courses/';
    return this.http.get(USE_URL, httpOptions);
  }
  /**
   * 
   * @param id 
   */
  STATUS(id:number){
    const USE_URL=BASE_URL+'/api/user/'+id.toString()+'/abc/';
    return this.http.get(USE_URL,httpOptions);
  }
  /**
   * 
   */
  IDENTITY(){
    const USE_URL = BASE_URL + '/api/usermy/';
    return this.http.get(USE_URL,httpOptions);
  }
}
