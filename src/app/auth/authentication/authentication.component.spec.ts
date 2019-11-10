import { AuthFacade } from './../store/auth.facade';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { async, TestBed } from '@angular/core/testing';
import { Router } from "@angular/router";
import { AuthenticationComponent } from './authentication.component';
import { Store, select } from '@ngrx/store';
import * as fromAuth from './../store/auth.reducers';
import { Observable } from 'rxjs';

describe('AuthenticationComponent', () => {
  let store: MockStore<{ authStatus: boolean; userData: Array<any>;}>;
  const initialState = { authStatus: false, userData: [] };

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AuthenticationComponent
      ],
      providers: [
        provideMockStore(
          { initialState },
          
        ),
      ] 
    });
    store = TestBed.get(Store);
  });

  it ('should call ngOnInit', ()=> {
    const fixture = TestBed.createComponent(AuthenticationComponent);
    let authComponent = fixture.debugElement.componentInstance;
    spyOn(authComponent, 'ngOnInit').and.callThrough();
    spyOn(authComponent, 'checkAuthenticationStatus').and.callThrough();
  });

  it ('should call checkAuthenticationStatus', () => {
    const fixture = TestBed.createComponent(AuthenticationComponent);
    let authComponent = fixture.debugElement.componentInstance;
    //let authFacade = jasmine.createSpyObj('AuthFacade', 'authModule$');
    
  });

    // let authFacade = jasmine.createSpyObj('AuthFacade', ['']);
    // let router = fixture.debugElement.injector.get(Router);
    // let component = new AuthenticationComponent(router, authFacade);

});
