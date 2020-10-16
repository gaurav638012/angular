import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {UserwhoService}  from '../services/userwho.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {AddToCourseService} from '../services/add-to-course.service';
import {MessageService} from '../services/message.service';
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
  username:FormControl;
  message:FormControl;
  messages:Observable<Message[]>
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
    this.username=new FormControl('');
    this.message=new FormControl('');
    this.messageService.GET_MESSAGES(this.course_id).subscribe(data=>this.messages=data);
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
  SendTA(){
    var new_mess=this.messageService.SEND_MESSAGE(this.course_id,this.message.value,'TA').pipe(first())
    .subscribe(
      data=>{console.log(data)
        this.router.navigate(['course',this.course_id]);
      }
    );
  }
  SendStudent(){
    this.messageService.SEND_MESSAGE(this.course_id,this.message.value,'student').pipe(first())
    .subscribe(
      data=>console.log(data)
    )
  }
}
