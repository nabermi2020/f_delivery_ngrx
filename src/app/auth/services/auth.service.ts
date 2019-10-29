
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, Observer } from 'rxjs';
import { User } from '../user.model';
import { environment } from 'src/environments/environment';

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
          this.router.navigate(['dashboard/products/pizza']);
        },

        (err: Response) => {
          this.onAunthenticateUserOnlineFailure(err, authObserver);
        }
      );
  }

  onAunthenticateUserOnlineSuccess(authResults, authObserver: Observer<any>) {
      let onlineMode = navigator.onLine;
      //console.log(authResults);
      localStorage.setItem('userInfo', JSON.stringify(authResults[0]));
      let authStatus = this.getAuthStatus(authResults) == true ? true : false;
      authObserver.next({ authStatus: authStatus, onlineMode: onlineMode, userData: authResults[0] });
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
    console.log(authStatus);
    this.router.navigate(['dashboard/products/pizza']);
    //this.isUserAuthorized.next(this.authResults);
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

  updateUserData() {
    let onlineMode = navigator.onLine;
    if (onlineMode) {
      this.signIn(this.currentUser.login, this.currentUser.password);
    } else {
      let activeCategory = JSON.parse(localStorage.getItem("productList")).category;
      this.router.navigate([`dashboard/products/${activeCategory}`]);
    }
  }

  logOut() {
    //this.authResults.authStatus = false;
    //this.isUserAuthorized.next(this.authResults);
    //localStorage.removeItem('userInfo');
  }

  signUp(users) {
    return Observable.create( (observer: Observer<any>) => {
      const headers = new HttpHeaders({'Content-type': 'application/json'});
      
      this.http.post(`${this.apiUrl}/users`, users, { headers })
        .subscribe(
          (authenticationStatus: Response) => {
            observer.next(authenticationStatus);
            this.router.navigate(['']);
            observer.complete();
          },

          (error: Response) => {
            observer.next(error);
            observer.complete();
          }
        );
    });
  }

  checkFieldExistense(field: string, value: string): Observable<any> {
    const headers = new HttpHeaders({'Content-type': 'application/json'});
    return this.http.get(`${this.apiUrl}/users?${field}=${value}`, { headers });
  }

  isAuthorized(): boolean {
    return this.isAuthenticated;
  }

  getCurrentUser(): any {
    return this.currentUser;
  }

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

  updateUserInfo(userData): Observable<any> {
    const user = new User(userData.firstName, userData.lastName,
                        this.currentUser.login, userData.passwords.password,
                        userData.phone, this.currentUser.email, userData.address);

    const headers = new HttpHeaders({'Content-type': 'application/json'});
    return this.http.put(`${this.apiUrl}/users/${this.currentUser.id}`,  user, { headers });
  }

}
