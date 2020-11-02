import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Message} from '../_models/message';
import {BASE_URL} from './base';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private http:HttpClient,
  ) { }
  GET_MESSAGES(id:number):Observable<Message>{
    const URL=BASE_URL+'/api/messages/'+id.toString()+'/';
    return this.http.get<Message>(URL,httpOptions);
  }
  SEND_MESSAGE(id:number,message:string,to:string): Observable<Message>{
    const URL=BASE_URL+'/api/messages/'+id.toString()+'/';
    var data={};
    data['to']=to;
    data['message']=message;
    console.log(data);
    return this.http.post<Message>(URL,data,httpOptions);
  }
}
