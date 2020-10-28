import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {UserwhoService}  from '../services/userwho.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {AddToCourseService} from '../services/add-to-course.service';
import {MessageService} from '../services/message.service';
import {MatExpansionModule} from '@angular/material/expansion';
import { Observable } from 'rxjs';
import {Message} from '../_models/message';
@Component({
  selector: 'app-course-home',
  templateUrl: './course-home.component.html',
  styleUrls: ['./course-home.component.scss']
})
export class CourseHomeComponent implements OnInit {
  course_id;
  course_status;
  submitted_add=false;
  submitted_m=false;
  username:FormControl;
  message:FormControl;
  a_s_l=false;
  a_t_l=false;
  m_t_l=false;
  m_s_l=false;
  messages
  constructor(
    private activatedRoute:ActivatedRoute,
    private who:UserwhoService,
    private addtocourse:AddToCourseService,
    private messageService:MessageService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.course_id=this.activatedRoute.snapshot.paramMap.get('id');
    this.who.STATUS(this.course_id)
    .pipe(first())
    .subscribe(data=>{
      console.log(data);
      this.course_status=data['status'];
    });
    this.username=new FormControl('',Validators.required);
    this.message=new FormControl('',Validators.required);
    this.messageService.GET_MESSAGES(this.course_id).subscribe(data1=>this.messages=data1);
  }
  AddStudent(){
    this.submitted_add=true;
    if(this.username.invalid){
      return ;
    }
    this.a_s_l=true;
    this.addtocourse.AddToCourse(this.username.value,this.course_id,'student').pipe(first())
    .subscribe(
      data=>{console.log(data);window.alert("Student is added successfully")},
      error=>{window.alert("adding student is unsuccessful");}
    )
    this.a_s_l=false;
    this.submitted_add=false;
  }
  AddTA(){
    this.submitted_add=true;
    if(this.username.invalid){
      return ;
    }
    this.a_t_l=true;
    this.addtocourse.AddToCourse(this.username.value,this.course_id,'TA').pipe(first())
    .subscribe(
      data=>{console.log(data);window.alert("TA is added successfully");},
      error=>{window.alert("adding TA unsuccessful");}
      
    )
    this.a_t_l=false;
    this.submitted_add=false;
  }
  SendTA(){
    this.submitted_m=true;
    if(this.message.invalid){
      return ;
    }
    this.m_t_l=true;
    this.messageService.SEND_MESSAGE(this.course_id,this.message.value,'TA').pipe(first())
    .subscribe(
      data=>{console.log(data);
        this.router.navigate(['course',this.course_id]);
      }
    );
    this.m_t_l=false;
    this.submitted_m=false;
  }
  SendStudent(){
    this.submitted_m=true;
    if(this.message.invalid){
      return ;
    }
    this.m_s_l=true;
    this.messageService.SEND_MESSAGE(this.course_id,this.message.value,'student').pipe(first())
    .subscribe(
      data=>{console.log(data);
        location.reload();
      }
    )
    this.m_s_l=false;
    this.submitted_m=false;
  }
}
