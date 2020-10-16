import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Course} from '../_models/course';
import {CourseStatus} from '../_models/course-status';
import {BASE_URL} from './base';
const COURSE_URL = BASE_URL+'/api/courses/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};
@Injectable({
  providedIn: 'root'
})
export class AddCourseService {

  constructor(
    private http:HttpClient,
  ) { }
  addCourse(data:Course): Observable<CourseStatus>{
    var ADD_COURSE_URL=COURSE_URL+localStorage.getItem('user')+'/';
    return this.http.post<CourseStatus>(ADD_COURSE_URL,data,httpOptions);
  }
}
