import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Login} from '../_models/login';
import {UserMy} from '../_models/user-my';
import {UserToken} from '../_models/user-token';
import * as uuid from 'uuid';
import {BASE_URL} from './base';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { CanActivate, Router } from '@angular/router';
import { tap, shareReplay } from 'rxjs/operators';
import { LogoutService } from './logout.service';

import * as jwtDecode from 'jwt-decode';
import * as moment from 'moment';
const LOGIN_URL = BASE_URL+'/api/auth/get-token/';
const REFRESH_URL = BASE_URL+'/api/auth/refresh-token/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};
interface JWTPayload {
  user_id: number;
  username: string;
  email: string;
  exp: number;
}
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUserValue;
  constructor(
    private http: HttpClient,
  ) { }
  private setSession(authResult) {
    console.log("start");
    const token = authResult.token;
    console.log("token got");
    const payload = this.decode(token);
    console.log("payload got");
    const expiresAt = moment.unix(payload.exp);
    console.log("expiry got");
    console.log(authResult.token);
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  get token(): string {
    return localStorage.getItem('token');
  }

  private decode(token: string) {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
        console.log("error decoding token");
    }
  }

  refreshToken() {
    if (moment().isBetween(this.getExpiration().subtract(1, 'days'), this.getExpiration())) {
      return this.http.post(REFRESH_URL,{token:this.token})
      .pipe(
        tap(response => this.setSession(response)),
        shareReplay(),
      ).subscribe();
    }
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);

    return moment(expiresAt);
  }

  login(data: Login)
  { console.log("1");
    return this.http.post(LOGIN_URL,data)
    .pipe(
      tap(response => {
        console.log("init");
        this.setSession(response);
      console.log("login");}),
      shareReplay(),
    );
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }
}


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'JWT '.concat(token))
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router, private logout:LogoutService) { }
  /**
   * @return this returns a boolean value which tells whether its logged in or not
   * If you are logged in this refreshes the token to make sure the website isnt idle for long
   * If not logged in it logs out and redirects to login page
   */
  canActivate() {
    if (this.authService.isLoggedIn()) {
      this.authService.refreshToken();

      return true;
    } else {
      this.logout.logout();
      this.router.navigate(['login']);

      return false;
    }
  }
}
