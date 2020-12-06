import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Login} from '../_models/login';
//import {UserMy} from '../_models/user-my';
//import {UserToken} from '../_models/user-token';
//import * as uuid from 'uuid';
import {BASE_URL} from './base';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { CanActivate, Router } from '@angular/router';
import { tap, shareReplay } from 'rxjs/operators';
import { LogoutService } from './logout.service';

//import * as jwtDecode from 'jwt-decode';
import * as moment from 'moment';
const LOGIN_URL = BASE_URL+'/api/auth/get-token/';
const REFRESH_URL = BASE_URL+'/api/auth/refresh-token/';

/*const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};*/
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
  /**
   * storing current user value i.e, username if necessary
   */
  currentUserValue; 
  constructor(
    private http: HttpClient,
  ) { }
  private setSession(authResult) {
    console.log("start");
    const token = authResult.token; 
    console.log("token got");
    /**
     * using function decode to get payload of JWT token
     * 
     */
    const payload = this.decode(token); 
    console.log("payload got");
    /**
     * converting expiry time from unix timestamp to date time
     */
    const expiresAt = moment.unix(payload.exp); 
    console.log("expiry got");
    console.log(authResult.token); 
    /**
     * storing token and expiry details
     */
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }
  /**
   * @return extracting token
   */
  get token(): string {
    return localStorage.getItem('token');
  }
  
  /**
   * @param token JWT TOKEN
   */
  private decode(token: string) {
    try {
        /**
         * breaking JWT into 3 components and parsing
         */
        return JSON.parse(atob(token.split(".")[1])); 
    } catch (e) {
        console.log("error decoding token");
    }
  }
  /**
   * to call on rendering any page 
   */
  refreshToken() {
    if (moment().isBetween(this.getExpiration().subtract(1, 'days'), this.getExpiration())) {  
      /**
       * sending a refresh request to backend server if loggedIn
       */
      return this.http.post(REFRESH_URL,{token:this.token})
      .pipe(
        tap(response => this.setSession(response)), 
        shareReplay(),
      ).subscribe();
    }
  }
  /**
   * @return Returns expiry time of the token
   */
  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);

    return moment(expiresAt); 
  }
  /**
   * sending post to get-token url
   * @param data Login object
   * @return Sets data of get-token result via setSession
   */
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
  
  /**
   * @return Returns if user is logged in
   */
  isLoggedIn() {
    return moment().isBefore(this.getExpiration()); 
  }
  
  /**
   * @return Returns if user is logged out
   */
  isLoggedOut() {
    return !this.isLoggedIn();
  }
}


@Injectable()
export class AuthInterceptor implements HttpInterceptor { 
  /** 
   * HttpInterceptor to add authentication requests to outgoing requests
   * 
   * @return Returns request with authourization request
   **/
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /**
     * token value is stored here
     */
    const token = localStorage.getItem('token');
    if (token) {
      /**
       * add authorization header "Authorization:JWT token"
       */
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
  /**
   * Authgaurd to block unauthenticated page access
  **/
  constructor(private authService: AuthenticationService, private router: Router, private logout:LogoutService) { }
  /**
   * @return this returns a boolean value which tells whether its logged in or not
   * If you are logged in this refreshes the token to make sure the website isnt idle for long
   * If not logged in it logs out and redirects to login page
   */
  canActivate() {
    if (this.authService.isLoggedIn()) {
      /**
       * check login status and refresh
       */
      this.authService.refreshToken();

      return true;
    } else {
      /**
       * for unauthenticated request redirect to login
       */
      this.logout.logout(); 
      this.router.navigate(['login']);

      return false;
    }
  }
}
