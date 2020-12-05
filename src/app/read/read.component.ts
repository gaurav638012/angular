import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MessageService} from '../services/message.service';
import { ActivatedRoute } from '@angular/router';
import {BASE_URL} from  '../services/base';
@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent implements OnInit {
  message_id:any;
  read_list:any;
  constructor(private http:HttpClient,
    private activatedRoute:ActivatedRoute,
    private messageservice:MessageService,) { }

  ngOnInit(): void {
    this.message_id=this.activatedRoute.snapshot.paramMap.get('id');
    this.messageservice.READ_MESSAGE(this.message_id).subscribe(data=>{this.read_list=data;});
    //this.userservice.get_students(this.course_id).subscribe((data)=>{this.list_of_students=data;});
  }

}
