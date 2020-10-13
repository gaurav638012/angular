import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { User } from '../_models';
const register_url="https://back-dashboard.herokuapp.com/api/user/";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'mode': 'no-cors',
    'Access-Control-Allow-Origin':'**',
  })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) 
  { 

  }
  register(user: User) 
  {
    return this.http.post(register_url, user,httpOptions);
  }
}
