import { EditModalService } from '../../shared/services/edit-modal.service';
import { AuthService } from '../../auth/services/auth.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/auth/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit, OnDestroy {
  id: number;
  editMode: any;
  userData: User;
  editSubscription: Subscription;
  objectKeys = Object.keys;
  userViewTemplate = {
    'First Name': '',
    'Last Name': '',
    'Login': '',
    'Phone': '',
    'Email': '',
    'Address': ''
  };

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private editModal: EditModalService) { }

  ngOnInit() {
    this.userData = this.authService.getCurrentUser();
    this.userDataMap();
    this.subscribeToModalToggling();
  }

  subscribeToModalToggling() {
    this.editSubscription = this.editModal.onEditChange.subscribe(
      res => {
        this.editMode = res;
      }
    );
  }

 /**
  * Map appropriate values getted from 'authService' with values from viewModel
  */
  userDataMap() {
     this.userViewTemplate['First Name'] = this.userData.firstName;
     this.userViewTemplate['Last Name'] = this.userData.lastName;
     this.userViewTemplate['Login'] = this.userData.login;
     this.userViewTemplate['Phone'] = this.userData.phone;
     this.userViewTemplate['Email'] = this.userData.email;
     this.userViewTemplate['Address'] = this.userData.address;
  }

/**
 *  Show modal window for editting user data
 */
  editProfile() {
    this.editModal.toggleEditMode();
  }

/**
 * Destroy subsription
 */
  ngOnDestroy() {
    this.editSubscription.unsubscribe();
  }

}
