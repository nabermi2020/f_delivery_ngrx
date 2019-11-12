import { User } from './../../user.model';
import { AuthFacade } from './../auth.facade';
import { Store } from '@ngrx/store';
import * as fromApp from './../../../store/app.reducers';
import * as authListActions from './../../store/auth.actions';

describe("Auth Facade", () => {

  it('Dispatch TrySignIn', () => {
    let cred = {login: 'John', password: 'test123'};
    const trySignInAction = authListActions.TrySignIn(cred);
    const store = jasmine.createSpyObj<Store<fromApp.AppState>>('store', ['dispatch', 'select', 'pipe']);
    let authFacade = new AuthFacade(store);
    authFacade.trySignIn(cred);
 
    expect(store.dispatch).toHaveBeenCalledWith(trySignInAction);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  it('Dispatch TrySignUp', () => {
    let userMock = new User({
      firstName: "johnny",
      lastName: "sidness",
      login: "John999",
      password: "test123",
      phone: "0501865210",
      email: "nab@op.op",
      address: "LA, New Walley 145/85",
      userId: 988
  });

    const trySignUpAction = authListActions.TrySignUp(userMock);
    const store = jasmine.createSpyObj<Store<fromApp.AppState>>('store', ['dispatch', 'select', 'pipe']);
    let authFacade = new AuthFacade(store);
    authFacade.trySignUp(userMock);
    
    expect(store.dispatch).toHaveBeenCalledWith(trySignUpAction);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  it('Dispatch Log Out', () => {
    const logOutAction = authListActions.LogOut();
    const clearUserData = authListActions.CleanUserData();
    const store = jasmine.createSpyObj<Store<fromApp.AppState>>('store', ['dispatch', 'select', 'pipe']);
    let authFacade = new AuthFacade(store);
    authFacade.logOut();

    expect(store.dispatch).toHaveBeenCalledWith(logOutAction);
    expect(store.dispatch).toHaveBeenCalledWith(clearUserData);
    expect(store.dispatch).toHaveBeenCalledTimes(2);
  });
});
