import { RouterTestingModule } from '@angular/router/testing';
import { async, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';
import { ProductDashboardComponent } from './product-dashboard.component';
import { EditModalService } from 'src/app/shared/services/edit-modal.service';
import { ProductCart } from 'src/app/shared/services/product-cart.service';

describe('ProductDashboardComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        ProductDashboardComponent
      ],
      providers: [
        EditModalService,
        ChangeDetectorRef,
        ProductCart
      ] 
    }).compileComponents();
  }));
});
