import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../services/logout.service';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private logout: LogoutService,
  ) { }

  ngOnInit(): void {
    this.logout.logout().subscribe(data=>console.log('hi'))
    localStorage.clear();
  }

}
