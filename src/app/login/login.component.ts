import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {UserwhoService} from '../services/userwho.service';
import { User } from '../_models';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private idService:UserwhoService,
        )
    {
        // redirect to home if already logged in
        if (localStorage.getItem('token')!=null && localStorage.getItem('token')!="undefined") {
            this.router.navigate(['/']);
        }
    }

    ngOnInit()
    {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f(){
        return this.loginForm.controls;
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.loginForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    const tok=localStorage.getItem('token');
                    if(tok==null||tok=='undefined'){
                        this.loading=false;
                        window.alert('invalid login');
                        this.router.navigate(['login']);
                    }
                    else{
                        this.idService.IDENTITY().pipe(first())
                        .subscribe(
                            data=>{console.log(data);
                            if(data['is_professor']==true){
                                localStorage.setItem('is_professor','true');
                            }
                            else{
                                localStorage.setItem('is_professor','false');
                            }
                            this.router.navigate([this.returnUrl]);
                        });
                    }
                    
                },
                error => {
                    this.loading = false;
                });
    }

}
