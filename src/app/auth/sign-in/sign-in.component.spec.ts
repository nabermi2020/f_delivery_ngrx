import { Credentials } from './../auth.interfaces';
import { AuthFacade } from './../store/auth.facade';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SignInComponent } from './sign-in.component';
import {RouterTestingModule} from "@angular/router/testing";
import {AuthenticationComponent} from "../authentication/authentication.component";
import * as fromApp from './../../store/app.reducers';
import * as fromAuth from './../store/auth.reducers';
import { Store } from '@ngrx/store';
import * as authListActions from './../store/auth.actions';
import { BehaviorSubject, Observable } from 'rxjs';

export class TestStore<T> {
  private state: BehaviorSubject<T> = new BehaviorSubject(undefined);

  setState(data: T) {
    this.state.next(data);
  }

  select(selector?: any): Observable<T> {
    return this.state.asObservable();
  }

  dispatch(action: any) {}
}

describe('SignInComponent', () => {
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        SignInComponent
      ],
      providers: [
        { provide: Store, useClass: TestStore }
      ]
    })
  }));

  it('Unsubscribe hook', () => {
    const store = jasmine.createSpyObj<Store<fromApp.AppState>>('store', ['dispatch', 'select', 'pipe']);
    let authFacade = new AuthFacade(store);
    let signInComponent = new SignInComponent(store, authFacade);
    let onDestroy = spyOn(signInComponent, 'ngOnDestroy');
    signInComponent.ngOnDestroy();
    expect(onDestroy).toHaveBeenCalledTimes(1);
  });

  it('onLogin', () => {
    const userMock: Credentials = { login: 'John', password: 'test123'};
    const store = jasmine.createSpyObj<Store<fromApp.AppState>>('store', ['dispatch', 'select', 'pipe']);
    let authFacade = new AuthFacade(store);
    let signInComp = new SignInComponent(store, authFacade);
    signInComp.authResults.authStatus = false;
    signInComp.authResults.authStatus = true;
    let trySignInSpy = spyOn(authFacade, 'trySignIn');
    authFacade.trySignIn(userMock);
    expect(signInComp.authResults.authStatus).toEqual(true);
    expect(trySignInSpy).toHaveBeenCalledTimes(1);
    expect(trySignInSpy).toHaveBeenCalledWith({ login: 'John', password: 'test123'});
  });

  
  it('Check Authentication Success', () => {
    let store = new TestStore<fromAuth.AuthState>();
    store.setState({
      authStatus: true,
      userData: []
    });

    store.select().subscribe(authRes => {
      expect(authRes).toEqual({authStatus: true, userData: []});
    });
    
  });

  it('Check Authentication False', () => {
    let store = new TestStore<fromAuth.AuthState>();
    store.setState({
      authStatus: false,
      userData: []
    });

    store.select().subscribe(authRes => {
      expect(authRes).toEqual({authStatus: false, userData: []});
    });
    
  });

});
