import { AuthService } from '../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.checkAuthenticationStatus();  
  }

  checkAuthenticationStatus() {
    this.authService.isUserAuthorized
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        authStatus => {
          if (authStatus.authStatus && authStatus.onlineMode) {
            this.router.navigate(['/dashboard/products/pizza']);
          } else { 
            this.router.navigate(['']);
          }
        }
      );

    this.isAuthenticated();
  }

  isAuthenticated() {
    const userData = localStorage.getItem("userInfo");
    if (navigator.onLine && userData) {
      const { login, password } = JSON.parse(userData);
      this.authService.signIn(login, password);
    }    
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
