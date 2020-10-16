import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Course} from '../_models/course';
import {CourseStatus} from '../_models/course-status';
import {BASE_URL} from './base';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};
@Injectable({
  providedIn: 'root'
})
export class AddToCourseService {

  constructor(
    private http:HttpClient
  ) { }
  AddToCourse(username:string,id:number,status:string): Observable<CourseStatus>{
    const URL=BASE_URL+'/api/user/'+id.toString()+'/'+username+'/'+localStorage.getItem('user')+'/';
    var data = {};
    data['status']=status
    return this.http.post<CourseStatus>(URL,data,httpOptions);
  }
}
