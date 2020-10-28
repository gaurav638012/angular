import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {AddCourseService} from '../services/add-course.service';
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {
  CourseForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private addCourse:AddCourseService,
  ) { }

  ngOnInit(): void {
    this.CourseForm = this.formBuilder.group({
      name: ['', Validators.required],
      code: ['', [Validators.required, Validators.maxLength(5)]]
  });
  }
  get f() { return this.CourseForm.controls; }
  onSubmit(){
    
    this.submitted = true;
    if (this.CourseForm.invalid) {
      return;
    }
    this.loading = true;
    console.log(this.CourseForm.value);
    this.addCourse.addCourse(this.CourseForm.value)
            .pipe(first())
            .subscribe(
                data => {console.log(data);
                        this.router.navigate(['home']);
                },
                error => {
                    console.log(error);
                    this.router.navigate(['addcourse']);
                });
  }
}
