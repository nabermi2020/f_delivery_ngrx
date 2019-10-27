import { LoadingService } from '../../shared/services/loading.service';
import { ProductCart } from '../../shared/services/product-cart.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, Observer } from 'rxjs';
import { User } from '../user.model';
import { EditModalService } from '../../shared/services/edit-modal.service';
import { environment } from 'src/environments/environment';
import { ErrorService } from '../../shared/services/error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: any = environment.apiUrl;
  isAuthenticated: boolean;
  isUserAuthorized = new Subject<any>();
  userData = new Subject<any>();
  currentUser: any;
  authResults: any;
  
  constructor(private router: Router,
              private http: HttpClient,
              ) {}

  authenticateUser(login: string, password: string) {
    const authObserver = Observable.create((authObserver: Observer<any>) => {
      let onlineMode = navigator.onLine;
      if (onlineMode) {
        this.aunthenticateUserOnline(login, password, authObserver);
      } else {
        authObserver.next({ authStatus: false, onlineMode: false }); 
      }
    });
    
    return authObserver;
  }   
  
  aunthenticateUserOnline(login: string, password: string, authObserver: Observer<any>) {
    const headers = new HttpHeaders({'Content-type': 'application/json'});
    this.http.get(`${this.apiUrl}/users?login=${login}&&password=${password}`, { headers })
      .subscribe(
        (authResults: Response) => {
          this.onAunthenticateUserOnlineSuccess(authResults, authObserver);
        },

        (err: Response) => {
          this.onAunthenticateUserOnlineFailure(err, authObserver); 
        }
      );  
  }

  onAunthenticateUserOnlineSuccess(authResults, authObserver: Observer<any>) {
      let onlineMode = navigator.onLine;
      localStorage.setItem('userInfo', JSON.stringify(authResults[0]));
      let authStatus = this.getAuthStatus(authResults) == true ? true : false;
      authObserver.next({ authStatus: authStatus, onlineMode: onlineMode });
  }

  onAunthenticateUserOnlineFailure(error, authObserver: Observer<any>) {
      let onlineMode = navigator.onLine;
      authObserver.error(error);
      authObserver.next({ authStatus: false, onlineMode: onlineMode }); 
  }
  
  signIn(login, password) {
    this.authenticateUser(login, password)
      .subscribe(
        this.onSignInSuccess.bind(this),
        this.onSignInFailure.bind(this)
      );
  }

  onSignInSuccess(authStatus) {
    this.authResults = authStatus;
    this.isUserAuthorized.next(this.authResults);
  }

  onSignInFailure(authErr) {
    this.authResults = authErr;
    console.log(authErr.status)
    console.log(this.authResults);
  }

  getAuthStatus(userData) {
    let authStatus;
    if (userData && userData.length > 0 ) {
      this.currentUser = userData[0];
      this.isAuthenticated = true;
      authStatus =  true;
      this.userData.next(userData[0]);
      return true;
    } else {
      console.log('Authentication error!');
      authStatus = false;
    }

    return authStatus;
  }

/**
 * Update user data
 */
  updateUserData() {
    let onlineMode = navigator.onLine;
    if (onlineMode) {
      this.signIn(this.currentUser.login, this.currentUser.password);
    } else {
      let activeCategory = JSON.parse(localStorage.getItem("productList")).category;
      this.router.navigate([`dashboard/products/${activeCategory}`]);
    }
  }

/**
 * Logout user from the active session
 */  
  logOut() {
    this.authResults.authStatus = false;
    this.isUserAuthorized.next(this.authResults);
    localStorage.removeItem('userInfo');
  }

 /**
  * Register new user and navigate to the 'sign-in'
  * @param {User} new user instance
  */ 
  signUp(users) {
    const headers = new HttpHeaders({'Content-type': 'application/json'});
     
    this.http.post(`${this.apiUrl}/users`, users, { headers })
      .subscribe(
        this.onSignUpSuccess.bind(this),
        this.onSignUpFailure.bind(this)
      );
  }

  onSignUpSuccess(res) {
    this.router.navigate(['']);  
  }

  onSignUpFailure(err) {
    alert('Something went wrong, try again!!!');
  }

/**
 * Check user's login existence in DB
 * @param {User} user's login 
 * @return {Observable} result with array of 1 user if there's user with the same login
 */
  checkFieldExistense(field: string, value: string): Observable<any> {
    const headers = new HttpHeaders({'Content-type': 'application/json'});
    return this.http.get(`${this.apiUrl}/users?${field}=${value}`, { headers });
  }

/**
 * Return user's authentication status
 * @return {boolean} auth status;
 */
  isAuthorized(): boolean {
    return this.isAuthenticated;
  }

 /**
  * Return current user's info
  * @return {obj} user's data
  */ 
  getCurrentUser(): any {
    return this.currentUser;
  }

 /**
  * Check user credentials
  * @param {obj} object with credentials
  * @return {Observable} array of 1 user if search was successfull 
  */ 
  checkUserInfo(userData): Observable<any> {
    const checkObservable = Observable.create( (observer: Observer<any>) => {
      const login = this.currentUser.login;
      const password = userData.passwords.password;
      let onlineMode = navigator.onLine;
      
      if (onlineMode) {
        this.getUserInfo(login, password, observer);
      } else {
        observer.error("offline mode!");
      }
    });
    
    return checkObservable;
  }

  getUserInfo(login, password, observer) {
    const headers = new HttpHeaders({'Content-type': 'application/json'});
    this.http.get(`${this.apiUrl}/users?login=${login}&&password=${password}`, { headers })
    .subscribe(
      (checkResults: Array<any>) => {
        if (checkResults.length > 0) {
          observer.next(checkResults);
        }
      },

      (checkErrors) => {  
        observer.error('User not found! ' + checkErrors);
      }
    )  
  }

/**
 * Update user info for user with appropriate id
 * @param user's data
 * @return {Observable} updating result
 */
  updateUserInfo(userData): Observable<any> {
    const user = new User(userData.firstName, userData.lastName, 
                        this.currentUser.login, userData.passwords.password,
                        userData.phone, this.currentUser.email, userData.address);
    
    const headers = new HttpHeaders({'Content-type': 'application/json'});
    return this.http.put(`${this.apiUrl}/users/${this.currentUser.id}`,  user, { headers });
  }

}
