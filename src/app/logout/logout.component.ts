import { Component, OnInit } from '@angular/core';
//import { LogoutService } from '../services/logout.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    //private logout: LogoutService,
    private router:Router,
  ) { }
/**
 * This functions clears the local storage and moves out
 * 
 * Then it takes to the login page
 */
  ngOnInit(): void {
    //this.logout.logout()
    window.localStorage.clear();
    this.router.navigate(['/login']);
  
  }

}
