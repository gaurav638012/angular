import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models';
import {UserMy} from '../_models/user-my';
import {UserMyList} from '../_models/list_of_student';
import {BASE_URL} from  './base';
const REGISTER_URL = BASE_URL+'/api/user/';
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
  get_students(id:number):Observable<UserMyList>
  { 
    var url=BASE_URL+'/api/usercourse/'+id.toString()+'/';
    return this.http.get<UserMyList>(url,httpOptions);
  }
  delete_students(id:number,username:string)
  {
    var url=BASE_URL+'/api/usercourse/'+id.toString()+'/';
    var data={};
    data['username']=username;
    this.http.post(url,data,httpOptions);
  }
}
