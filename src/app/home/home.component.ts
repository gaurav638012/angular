import { Component, OnInit } from '@angular/core';
import {UserwhoService} from '../services/userwho.service';
import {AuthenticationService} from '../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  courses;
  is_professor;
  constructor(
    private who: UserwhoService,
    private router: Router,
    private authenticationService : AuthenticationService,
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('user')!=null&&localStorage.getItem('user')!='undefined')
    {
      this.router.navigate(['/login']);
    }
    this.who.WHO().subscribe(data => {console.log(data);
                                      this.courses = data;
                                    });
    if(localStorage.getItem('is_professor')=='true'){
      this.is_professor=true;
    }
    else{
      this.is_professor=false;
    }
  }
  AddCourse(){
    console.log('clicked');
    this.router.navigate(['addcourse']);
  }

}
