import { LoadingService } from './../../shared/services/loading.service';
import { AuthService } from '../../auth/services/auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { EditModalService } from 'src/app/shared/services/edit-modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {
  editForm: FormGroup;
  id: any;
  currentUser: any;
  checkUserInfoSubscription = new Subscription();
  checkRouteParamsSub = new Subscription();

  constructor(private editProfile: EditModalService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private editModal: EditModalService,
              private loadingService: LoadingService) { }

  ngOnInit() {
    this.subscribeToRouteParams();
  }

  subscribeToRouteParams() {
    this.checkRouteParamsSub = this.route.params.subscribe( 
      (par: Params) => {
        this.id = par["id"];
        this.currentUser = this.authService.getCurrentUser();
        this.initForm();
    });
  }

/**
 * Init form on the component initialization
 */
  initForm() {
    this.editForm = new FormGroup({
      'firstName': new FormControl(this.currentUser["firstName"], [Validators.required, Validators.minLength(4)]),
      'lastName': new FormControl(this.currentUser["lastName"], [Validators.required, Validators.minLength(4)]),
      'phone': new FormControl(this.currentUser["phone"], [Validators.required, Validators.minLength(10)]),
      'address': new FormControl(this.currentUser["address"], [Validators.required, Validators.minLength(5)]),
      passwords: new FormGroup({
        "password": new FormControl('', [Validators.required, Validators.minLength(4) ]),
        "passwordRepeat": new FormControl('', [Validators.required, Validators.minLength(4) ]),
        }, {
          validators: this.validatePasswords.bind(this)
        }
      )
    });
  }

/**
 * Get data from appropriate input
 * @param {String} control's name 
 * @return {FormControl} return control's info
 */ 
  getDataByFieldName(data) {
    return this.editForm.get(data);
  }

 /**
  * Compare 2 passwords
  * @param {registrationFormGroup} password and repeated password which were entered in the edit form 
  * @return { Obj | null } passwords' comparison result
  */ 
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

/**
 * Close modal window
 */
  closeModal() {
    this.editProfile.toggleEditMode();
  }

/**
 * Save changes after editing user's profile info
 */
  saveChanges() {
    const formData = this.editForm.value;
    this.checkUserInfoSubscription = this.authService.checkUserInfo(formData)
      .subscribe(
        this.onSaveChangesSuccess.bind(this),
        this.onSaveChangesFailure.bind(this)
      );
  }

  onSaveChangesSuccess() {
    const formData = this.editForm.value;
    
    this.authService.updateUserInfo(formData)
      .subscribe(
        this.onUpdateUserInfoSuccess.bind(this),
        this.onUpdateUserInfoFailure.bind(this)
      );
  }

  onUpdateUserInfoSuccess() {
    this.closeModal();
    this.authService.updateUserData();
  }

  onUpdateUserInfoFailure() {
    this.closeModal();
    let activeCategory = JSON.parse(localStorage.getItem("productList")).category;
    this.router.navigate([`dashboard/products/${activeCategory}`]);
    console.log('something went wrong!');
  }

  onSaveChangesFailure() {
      this.closeModal();
      alert('offline mode');
      let activeCategory = JSON.parse(localStorage.getItem("productList")).category;
      this.router.navigate([`dashboard/products/${activeCategory}`]);
  }

  ngOnDestroy() {
    this.checkUserInfoSubscription.unsubscribe();
    this.checkRouteParamsSub.unsubscribe();
  }
}
