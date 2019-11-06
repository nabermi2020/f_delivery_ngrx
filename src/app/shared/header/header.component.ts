import { AuthFacade } from './../../auth/store/auth.facade';
import { ProductCart } from '../services/product-cart.service';
import { User } from '../../auth/user.model';
import { AuthService } from '../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  
})
export class HeaderComponent implements OnInit {
  activeUser: User;
  id: number;
  productsQuantity: any;  
  totalPrice: any;
  activeCategory: any;
  userDataSubscription = new Subscription();
  checkProdutsSubscription = new Subscription();

  constructor(private authService: AuthService,
              private authFacade: AuthFacade,
              private productCartService: ProductCart) {             
    this.productsQuantity = this.productCartService.calculateProductsQuantity();
  }

  ngOnInit() {}

  public getUserData(): void {
    this.userDataSubscription = this.authService.userData
    .subscribe(
      this.onGetUserDataSuccess.bind(this),
      this.onGetUserDataFailure.bind(this)
    ); 
  }

  private onGetUserDataSuccess(userData: User): void {
    this.activeUser =  this.authService.getCurrentUser();
    this.productsQuantity = this.productCartService.calculateProductsQuantity();
  }

  private onGetUserDataFailure(error): void {
    alert('Something went wrong!');
    console.log(error);
  }

  public onProdAdded(): void {
    this.checkProdutsSubscription = this.productCartService.onProductAdded  
      .subscribe( 
        this.onProdAddedSuccess.bind(this),
        this.onProdAddedFailure.bind(this)
      );
  }
    
  private onProdAddedSuccess(prodAddStatus): void {
    this.productsQuantity = this.productCartService.calculateProductsQuantity();
    this.totalPrice = this.productCartService.getTotalPrice(); 
  }

  private onProdAddedFailure(error): void {
    alert('something went wrong!');
  }
 
  public logOut(): void {
    this.authFacade.logOut();
    localStorage.removeItem('userInfo'); 
  }

}
