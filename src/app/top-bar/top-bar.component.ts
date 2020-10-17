import { NONE_TYPE } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  logged_in;
  interval=setInterval(()=>{this.check_logIN();},300);
  constructor(
  ) { 
  }

  ngOnInit(): void {
    this.check_logIN();
  }
  check_logIN(){
    if(localStorage.getItem('user')==null||localStorage.getItem('user')=='undefined'){
      this.logged_in=false;
    }
    else{
      this.logged_in=true;
    }
  }

}
