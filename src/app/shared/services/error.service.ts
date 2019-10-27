import { Subject } from 'rxjs';
import { LoadingService } from './loading.service';
import { Injectable, ErrorHandler, Injector} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { EditModalService } from './edit-modal.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService implements ErrorHandler {
  private errorStatus: number;
  private errorMsg: string;
  errorDetails = new Subject();
  constructor(private router: Router) { }

  handleError(error: Response) {
      this.errorStatus = error.status;
      this.errorMsg = error.statusText;
      this.errorDetails.next({
        errorCode: this.errorStatus,
        errorMsg: this.errorMsg
      });
      
      this.router.navigate(['dashboard/error']);
  }

  getErrorInfo() {
      return {
        errorCode: this.errorStatus,
        errorMsg: this.errorMsg
      }
  }

}
