import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
        /*private authenticationService: AuthenticationService,
        
        private alertService: AlertService*/
    ) { 
        // redirect to home if already logged in
        /*if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }*/
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            email: ['',Validators.required],
            is_professor:[false,Validators.required],
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;
      console.log(this.submitted);
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {window.alert("registered successfully");
                         this.router.navigate(['/login']);
                },
                error => {
                    window.alert("registration unsuccessful");
                    this.loading = false;
                });
          console.log(this.registerForm.value);
    }
}
