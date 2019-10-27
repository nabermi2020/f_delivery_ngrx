import { ActivatedRoute, Params } from '@angular/router';
import { LoadingService } from './../services/loading.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { EditModalService } from '../services/edit-modal.service';
import { ErrorService } from '../services/error.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  errorCode: number = 404;
  errorMsg = "Something Went Wrong(";
  
  constructor(private loadingService: LoadingService,
              private editModal: EditModalService,
              private route: ActivatedRoute,
              private errorService: ErrorService) { }

  ngOnInit() {
    this.bindErrorDetails();
  }  

  bindErrorDetails() {
    const errorDetails = this.errorService.getErrorInfo();
    this.errorMsg = errorDetails.errorMsg;
    this.errorCode = errorDetails.errorCode;
  }
}
