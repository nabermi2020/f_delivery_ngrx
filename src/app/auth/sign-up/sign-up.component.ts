import { User } from './../user.model';
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromAuth from './../store/auth.reducers';
import * as authListActions from './../store/auth.actions';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  registrationForm: FormGroup;
  userPassword: string;
  userRepeatedPassword: string;
  onlineMode: boolean;

  constructor(private authService: AuthService,
              private store: Store<fromAuth.State>) { }

  ngOnInit() {
    this.initForm();
    this.onlineMode = navigator.onLine;
  }

  private initForm() {
    this.registrationForm = new FormGroup({
      "firstName": new FormControl('', [Validators.required, Validators.minLength(4)]),
      "lastName": new FormControl('', [Validators.required, Validators.minLength(4)]),
      "login": new FormControl('', [Validators.required, Validators.minLength(4)], this.checkDataUniquenessByField.bind(this)),
      passwords: new FormGroup({
        "password": new FormControl('', [Validators.required, Validators.minLength(4), ]),
        "passwordRepeat": new FormControl('', [Validators.required, Validators.minLength(4)]),
        }, {
          validators: this.validatePasswords.bind(this) 
        }  
    ),
      "phone": new FormControl('', [Validators.required, Validators.minLength(10)]),
      "email": new FormControl('', [Validators.required, Validators.email, Validators.minLength(4)], this.checkDataUniquenessByField.bind(this)),
      "address": new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  get formField() {
    return this.registrationForm;
  }

  checkDataUniquenessByField(control: FormControl): Observable<any> {      
    const onlineMode = navigator.onLine;
    const maxFieldLength = 4;

    const forbiddenField = Observable.create( (forbiddenObserver: Observer<any>) => {
      const keyField = control.value;
      console.log(this.registrationForm);
      const fieldName = this.searchKeyField(control, keyField);

      if (onlineMode && keyField.length >= maxFieldLength) {
          this.authService.checkFieldExistense(fieldName, keyField).subscribe(
            
            (fieldCheckingRes: Response) => {
              if (fieldCheckingRes[0]) {
                if (fieldCheckingRes[0][fieldName] == keyField) {
                  forbiddenObserver.next({'fieldIsForbidden': true, 'isNetworkEnabled': false});
                  forbiddenObserver.complete();          
                }
              } else {
                forbiddenObserver.next(null);
                forbiddenObserver.complete();
              }
            },
  
            (error: Response) => {
              forbiddenObserver.error(error);
              forbiddenObserver.complete();
            }
          );
      } 
  });

    return forbiddenField;
  }

  searchKeyField(control: FormControl, keyField) {
    const field = control.value;
    let searchedField;
    let formFields = Object.entries(this.registrationForm.controls);
    
    for(let key of formFields) {
      if (key[1].value == field) {
        searchedField = key[0];
      }
    }
    return searchedField; 
  }
  
  validatePasswords(registrationFormGroup: FormGroup) {
    const password = registrationFormGroup.controls.password.value;
    const repeatPassword = registrationFormGroup.controls.passwordRepeat.value;

    if (repeatPassword.length <= 0) {
        return null;
    }

    if (repeatPassword !== password) {
        return {
            doesMatchPassword: true
        };
    }
    return null;
}

  onSignUp() {
    this.store.select('auth')
    .subscribe(res => {
      console.log(res);
    });
    this.onlineMode = navigator.onLine;
    const userInfo = this.registrationForm.value;
    const newUser = new User(userInfo.firstName, userInfo.lastName,
                           userInfo.login, userInfo.passwords.password,
                           userInfo.phone, userInfo.email,
                           userInfo.address);
    
    if (this.registrationForm.valid && this.onlineMode) {
      this.store.dispatch(new authListActions.TrySignUp(newUser));
    } else if (!this.onlineMode && !this.registrationForm.valid) {
      this.registrationForm.patchValue({login: "", email: ""});
    }                  
  }
}
