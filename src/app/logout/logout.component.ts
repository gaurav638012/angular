import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../services/logout.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private logout: LogoutService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.logout.logout()
    localStorage.clear();
    this.router.navigate(['/login']);
  
  }

}
