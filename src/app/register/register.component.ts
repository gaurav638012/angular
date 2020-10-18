import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../services/user.service';

const student_expression=/[1-2]\d[A-Z0-9]\d{6}/;
const professor_expression=/P[A-Z]{2,3}\d{3}/;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})

export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    loading = false;
    submitted = false;
    auth_code_status=false;
    auth_code_form:FormGroup;
    

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
        this.auth_code_form=this.formBuilder.group({
            auth_code: ['',Validators.required],
        })
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }
    get f1() {return this.auth_code_form.controls;}

    onSubmit() {
        this.submitted = true;
      console.log(this.submitted);
        // stop here if form is invalid
        if (this.registerForm.invalid || this.auth_code_form.invalid) {
            return;
        }

        this.loading = true;
        var s=this.f1.auth_code.value;
        
        if (s!=null && s!="undefined")
        {
            if(student_expression.test(s)==true)
            {
                this.auth_code_status=true;
                
            }
            else if(professor_expression.test(s)==true)
            {
                this.auth_code_status=true;
                this.registerForm.patchValue({is_professor:true});
            }
            else
            {
                this.auth_code_status=false;
            }
        }
        else
        {
            this.auth_code_status=false;
        }
        if(!this.auth_code_status)
        {
            window.alert("incorrect authentication code on first place");
            this.loading=false;
            window.alert("registration unsuccessful");
            return;
        }
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
