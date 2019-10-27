import { LoadingService } from '../services/loading.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { EditModalService } from 'src/app/shared/services/edit-modal.service';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.scss']
})
export class ConfirmationPopupComponent implements OnInit {
  @Output() orderConfirmed = new EventEmitter();
  isOrderConfirmed: boolean = false;

  constructor(private editModal: EditModalService,
              private loadingService: LoadingService) { }

  ngOnInit() { }

  confirmAnOrder() {
    this.isOrderConfirmed = true; 
    this.orderConfirmed.emit(this.isOrderConfirmed);
    this.closePopUp();
  }

  closePopUp() {
    this.editModal.toggleEditMode();  
    this.isOrderConfirmed = false;
  }
}
