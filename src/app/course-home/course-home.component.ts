import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {UserwhoService}  from '../services/userwho.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {AddToCourseService} from '../services/add-to-course.service';
@Component({
  selector: 'app-course-home',
  templateUrl: './course-home.component.html',
  styleUrls: ['./course-home.component.scss']
})
export class CourseHomeComponent implements OnInit {
  course_id;
  course_status;
  username:FormControl;
  constructor(
    private activatedRoute:ActivatedRoute,
    private who:UserwhoService,
    private addtocourse:AddToCourseService,
  ) { }

  ngOnInit(): void {
    this.course_id=this.activatedRoute.snapshot.paramMap.get('id');
    this.who.STATUS(this.course_id)
    .pipe(first())
    .subscribe(data=>{
      console.log(data);
      this.course_status=data['status'];
    });
    this.username=new FormControl('');
  }
  AddStudent(){
    this.addtocourse.AddToCourse(this.username.value,this.course_id,'student').pipe(first())
    .subscribe(
      data=>{console.log(data);}
    )
  }
  AddTA(){
    this.addtocourse.AddToCourse(this.username.value,this.course_id,'TA').pipe(first())
    .subscribe(
      data=>{console.log(data);}
    )
  }
}
