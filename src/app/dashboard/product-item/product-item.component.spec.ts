import { ProductCart } from 'src/app/shared/services/product-cart.service';
import { RouterTestingModule } from '@angular/router/testing';
import { async, TestBed } from '@angular/core/testing';
import { ProductItemComponent } from './product-item.component';

describe('ProductItemComponent', () => {
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        ProductItemComponent
      ],
      providers: [
        ProductCart
      ] 
    }).compileComponents();
  }));
});
