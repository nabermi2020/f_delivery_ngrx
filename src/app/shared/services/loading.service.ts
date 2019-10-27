import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { EditModalService } from './edit-modal.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoadingEnabled: boolean = false;
  onLoadingChange = new Subject();

  constructor(private editModal: EditModalService) {
    this.onLoadingChange.next(this.isLoadingEnabled);
  }

  toggleLoading() {
    this.isLoadingEnabled = !this.isLoadingEnabled;
    this.onLoadingChange.next(this.isLoadingEnabled);
  }

}
