import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models';
const register_url="https://back-dashboard.herokuapp.com/api/user/";
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
  register(user: User):Observable<User> 
  {
    return this.http.post<User>(register_url, user,httpOptions);
  }
}
