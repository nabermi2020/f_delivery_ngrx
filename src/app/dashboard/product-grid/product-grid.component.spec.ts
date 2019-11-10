import { ProductsFacade } from './../store/products.facade';
import { ProductsSelectors } from './../store/products.selectors';
import { RouterTestingModule } from '@angular/router/testing';
import { async, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { ProductGridComponent } from './product-grid.component';

describe('ProductGridComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        ProductGridComponent
      ],
      providers: [
        ActivatedRoute,
        ProductsSelectors,
        ProductsFacade
      ] 
    }).compileComponents();
  }));
});
