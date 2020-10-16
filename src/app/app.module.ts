import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import {UserService} from './services/user.service';
import { LogoutComponent } from './logout/logout.component';
import { AddCourseComponent } from './add-course/add-course.component'
import { CourseHomeComponent } from './course-home/course-home.component';
import { combineAll } from 'rxjs/operators';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopBarComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    AddCourseComponent,
    CourseHomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'addcourse',component: AddCourseComponent},
      {path: 'course/:id', component: CourseHomeComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'logout', component: LogoutComponent},
      {path:'**',component:LoginComponent},
    ])
    ],
  providers: [
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
