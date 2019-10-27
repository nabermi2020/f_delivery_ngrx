import { ProductService } from './../../shared/services/products.service';
import { AuthService } from '../../auth/services/auth.service';
import { ProductCart } from 'src/app/shared/services/product-cart.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Product } from 'src/app/shared/product.model';
import { Order } from '../order.model';
import { OrdersService } from 'src/app/shared/services/orders.service';
 
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EditModalService } from 'src/app/shared/services/edit-modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent implements OnInit, OnDestroy {
  cart: Array<Product> = [];
  formData: NgForm;
  userData: any;
  totalPrice: any;
  isConfirmationPopUpEnabled: boolean = false;
  @ViewChild('form') form: NgForm;
  editModalSubscription = new Subscription();

  constructor(private productCart: ProductCart,
              private ordersService: OrdersService,
              private authService: AuthService,
              private router: Router,
              private editModal: EditModalService,
              private productsService: ProductService) { }

  ngOnInit() {
    this.cart = this.productCart.getProducts();
    this.totalPrice = this.productCart.getTotalPrice();
    this.userData = this.authService.getCurrentUser();
    this.preFillForm();
    this.subscribeToModalToggling();
  }

  subscribeToModalToggling() {
    this.editModalSubscription = this.editModal.onEditChange.subscribe(
      (res: boolean) => {
        this.isConfirmationPopUpEnabled = res;
      }
    );
  }

/**
 * Prefill order confirmation screen
 */  
  preFillForm() {
    setTimeout( () => {
      this.form.setValue({
        address: this.userData.address,
        email: this.userData.email,
        firstName: this.userData.firstName,
        lastName: this.userData.lastName,
        phone: this.userData.phone,
        orderTime: ''
      });
    }, );
  }

/**
 * Order confirmation
 * @param {ngForm} form data
 */  
  onOrderSubmit(form) {
    // create interface
    const { firstName, lastName, email, phone, address, orderTime } = form.value
    const order = new Order(firstName, lastName,
                          email, phone,
                          address, orderTime,
                          this.productCart.getProductCart());
    if (!navigator.onLine) {
      this.ordersService.makeAnOrder(order);
    } else {
      let activeCategory = JSON.parse(localStorage.getItem("productList")).category;
      this.router.navigate([`dashboard/products/${activeCategory}`]);
      //alert('offline mode');
    }
  }

  showConfirmationPopUp(form) {
    this.formData = form;
    this.isConfirmationPopUpEnabled = !this.isConfirmationPopUpEnabled;
    this.editModal.toggleEditMode();
  }
  
 /**
  * Delete product by id
  * @param {Product} selected product 
  */ 
  deleteProductFromList(product: Product) {
    const productId = product.id;
    this.productCart.deleteProductById(productId);
    this.totalPrice = this.productCart.getTotalPrice();

    if (this.cart.length == 0 ) {
      this.router.navigate(['dashboard/products/pizza']);
    }
  }

  navigateToProductDetailPage(product) {
    this.productsService.setSelectedProduct(product);
    this.router.navigate([`dashboard/product-details/${product.id}`])
  }

  ngOnDestroy() {
    this.editModalSubscription.unsubscribe();
  }
}
