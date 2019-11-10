import { RouterTestingModule } from '@angular/router/testing';
import { async, TestBed } from '@angular/core/testing';

import { AuthenticationComponent } from './authentication.component';

describe('AuthenticationComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AuthenticationComponent
      ],
    }).compileComponents();
  }));

  // it('should create the app', () => {
  //   const fixture = TestBed.createComponent(AuthenticationComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app).toBeTruthy();
  // });

});
