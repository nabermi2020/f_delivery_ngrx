import { LoadingService } from '../../shared/services/loading.service';
import { AuthService } from '../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EditModalService } from 'src/app/shared/services/edit-modal.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromAuth from './../store/auth.reducers';
import * as authListActions from './../store/auth.actions';
 

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {
  authStatus = new Subscription();
  authResults = {
    authStatus: true,
    onlineMode: navigator.onLine
  };
   
  constructor(private authService: AuthService,
              private store: Store<fromAuth.State>) {}

  ngOnInit() {
   // this.subscribeToAuthResults();
  }

  subscribeToAuthResults() {
    this.authStatus = this.authService.isUserAuthorized
      .subscribe(this.onUserAuthorizedSuccess.bind(this));
  }

  onUserAuthorizedSuccess(authStatus) {
    this.authResults  = authStatus;
  }

  onLogin(form: NgForm) {
    const { login, password } = form.value;
    const credentials = {
      login: login,
      password: password
    };
   // this.authService.signIn(login, password);
    
    //this.store.dispatch(new authListActions.SignIn());
    this.store.select('auth')
      .subscribe(res => {
        console.log(res);
      });

    this.store.dispatch(new authListActions.TrySignIn({login: login, password: password}));
    
    
    // if (this.authService) {
    //   localStorage.setItem("userInfo", JSON.stringify(credentials));
    // }      
  }

  ngOnDestroy() {
    //this.authStatus.unsubscribe();
  }
}
