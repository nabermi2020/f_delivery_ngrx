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

// I am sorry, formatting is so bad as always, please start using autoformatting in your IDE, why it is important? - because the code which are you providing showing how good are you and what you can.
// and first thing on which I believe almost everybody is looking it is formatting.
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
    // please try to follow next structure in your tests

    // declarations
    // line break
    // executions, Spies and etc
    // line break
    // expects

    // it will makes you tests more readable

    // I do not see that you are calling - onLogin from component
    const userMock: Credentials = { login: 'John', password: 'test123'};
    // duplicate
    const store = jasmine.createSpyObj<Store<fromApp.AppState>>('store', ['dispatch', 'select', 'pipe']);
    let authFacade = new AuthFacade(store);
    let signInComp = new SignInComponent(store, authFacade);
    signInComp.authResults.authStatus = false;
    signInComp.authResults.authStatus = true;
    let trySignInSpy = spyOn(authFacade, 'trySignIn');
    authFacade.trySignIn(userMock);
    expect(signInComp.authResults.authStatus).toEqual(true);
    expect(trySignInSpy).toHaveBeenCalledTimes(1);
    // try to re-uce your code as much as you can, you have this problem through all of yours code, in this case you can just use - userMock instead { login: 'John', password: 'test123'}
    expect(trySignInSpy).toHaveBeenCalledWith({ login: 'John', password: 'test123'});
  });

  // just for your information private logic should not be ever tested directly
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

  // you should cover functionality by tests node methods
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
