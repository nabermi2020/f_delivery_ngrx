import { AuthFacade } from './../../auth/store/auth.facade';
import { AuthService } from './../../auth/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { async, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { ProductCart } from '../services/product-cart.service';

describe('HeaderComponent', () => {
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        HeaderComponent
      ],
      providers: [
        AuthService,
        AuthFacade,
        ProductCart
      ] 
    }).compileComponents();
  }));
});
