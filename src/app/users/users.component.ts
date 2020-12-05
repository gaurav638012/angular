import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import {BASE_URL} from  '../services/base';
import {UserService} from '../services/user.service';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
list_of_students:any;
course_id:any;
DELETE_URL:any;
is_professor:boolean;
  constructor(private http:HttpClient,
    private activatedRoute:ActivatedRoute,
    private userservice:UserService,
    ) { 
    
  }

  ngOnInit(): void {
    this.course_id=this.activatedRoute.snapshot.paramMap.get('id');
    //window.alert(this.course_id);
    this.userservice.get_students(this.course_id).subscribe((data)=>{this.list_of_students=data;});
    
    //console.log("haio");
    //console.log("hell");
    //console.log(this.list_of_students)

    //window.alert(this.list_of_students.length());
    if(localStorage.getItem('is_professor')=='true'){
      this.is_professor=true;
    }
    else{
      this.is_professor=false;
    }
  }

  delete_student(username:string)
  {
    console.log("i am a jackasss");
    this.userservice.delete_students(this.course_id,username).subscribe(data=>{location.reload()});
    
  }


}
