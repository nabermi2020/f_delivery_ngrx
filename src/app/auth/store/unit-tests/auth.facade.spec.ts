import { User } from './../../user.model';
import { AuthFacade } from './../auth.facade';
import { Store } from '@ngrx/store';
import * as fromApp from './../../../store/app.reducers';
import * as authListActions from './../../store/auth.actions';

// also spec files should be near to source files not in the separate folder, please take a look at Angular common guide - https://angular.io/guide/styleguide
// also it is good practice always before you start writing something check documentation and common practices, like - https://angular.io/guide/testing
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

  // subject for tests should consists of - #nameOFMethod - some description, like #trySignIn - user should be signed in
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

  // if you have multiple tests better to combine them to single describe
  it('Dispatch Log Out', () => {
    const logOutAction = authListActions.LogOut();
    const clearUserData = authListActions.CleanUserData();
    // duplicate
    const store = jasmine.createSpyObj<Store<fromApp.AppState>>('store', ['dispatch', 'select', 'pipe']);
    let authFacade = new AuthFacade(store);
    authFacade.logOut();

    // if you can , better to follow single responsibility principe - one it one expect
    expect(store.dispatch).toHaveBeenCalledWith(logOutAction);
    expect(store.dispatch).toHaveBeenCalledWith(clearUserData);
    expect(store.dispatch).toHaveBeenCalledTimes(2);
  });
});
