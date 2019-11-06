import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, Observer } from 'rxjs';
import { User } from '../user.model';
import { environment } from 'src/environments/environment';
import { AuthHttpClientService } from './auth-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: any = environment.apiUrl;
  isAuthenticated: boolean;
  userData = new Subject<any>();
  currentUser: any;
  authResults: any;

  constructor(private router: Router,
              private http: HttpClient,
              private httpClient: AuthHttpClientService) {}

  public authenticateUser(login: string, password: string): Observable<any> {
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

  private aunthenticateUserOnline(login: string, password: string, authObserver: Observer<any>): void {
    const headers = new HttpHeaders({'Content-type': 'application/json'});
    this.httpClient.get(`${this.apiUrl}/users?login=${login}&&password=${password}`)
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

  private onAunthenticateUserOnlineSuccess(authResults, authObserver: Observer<any>): void {
      let onlineMode = navigator.onLine;
      localStorage.setItem('userInfo', JSON.stringify(authResults[0]));
      let authStatus = this.getAuthStatus(authResults) == true ? true : false;
      authObserver.next({ authStatus: authStatus, onlineMode: onlineMode, userData: authResults[0] });
  }

  private onAunthenticateUserOnlineFailure(error, authObserver: Observer<any>): void {
      let onlineMode = navigator.onLine;
      authObserver.error(error);
      authObserver.next({ authStatus: false, onlineMode: onlineMode });
  }

  public signIn(login, password): void {
    this.authenticateUser(login, password)
      .subscribe(
        this.onSignInSuccess.bind(this),
        this.onSignInFailure.bind(this)
      );
  }

  private onSignInSuccess(authStatus): void {
    this.authResults = authStatus;
    this.router.navigate(['dashboard/products/pizza']);
  }

  private onSignInFailure(authErr): void {
    this.authResults = authErr;
  }

  private getAuthStatus(userData): boolean {
    let authStatus;
    if (userData && userData.length > 0 ) {
      this.currentUser = userData[0];
      this.isAuthenticated = true;
      authStatus =  true;
      this.userData.next(userData[0]);
      return true;
    } else {
      authStatus = false;
    }

    return authStatus;
  }

  private updateUserData(): void {
    let onlineMode = navigator.onLine;
    if (onlineMode) {
      this.signIn(this.currentUser.login, this.currentUser.password);
    } else {
      let activeCategory = JSON.parse(localStorage.getItem("productList")).category;
      this.router.navigate([`dashboard/products/${activeCategory}`]);
    }
  }

  public signUp(users): Observable<Response> {
    return Observable.create( (observer: Observer<any>) => {
      this.httpClient.post(`${this.apiUrl}/users`, users)
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

  public checkFieldExistense(field: string, value: string): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/users?${field}=${value}`);
  }

  public isAuthorized(): boolean {
    return this.isAuthenticated;
  }

  public getCurrentUser(): any {
    return this.currentUser;
  }

  public checkUserInfo(userData): Observable<any> {
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

  private getUserInfo(login, password, observer): void {
    this.httpClient.get(`${this.apiUrl}/users?login=${login}&&password=${password}`)
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

  public updateUserInfo(userData): Observable<any> {   
    const user = new User(userData.firstName, userData.lastName,
      this.currentUser.login, userData.passwords.password,
      userData.phone, this.currentUser.email, userData.address);

    return this.httpClient.put(`${this.apiUrl}/users/${this.currentUser.id}`,  user);
  }

}
