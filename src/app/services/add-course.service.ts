import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Course} from '../_models/course';
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
  /**
   * @param data this represents the course object to be added.This service is called by add course component from which the course oject was passed
   * So the add course function adds the course by sending a post request to the backend
   * @return Post Request
   */
  addCourse(data:Course): Observable<Course>{
    var ADD_COURSE_URL=COURSE_URL;
    return this.http.post<Course>(ADD_COURSE_URL,data,httpOptions);
  }
}
