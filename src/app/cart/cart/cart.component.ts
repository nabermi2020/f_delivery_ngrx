import { ProductService } from 'src/app/shared/services/products.service';
import { Component, OnInit } from '@angular/core';
import { ProductCart } from 'src/app/shared/services/product-cart.service';
import { Product } from 'src/app/shared/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: Array<Product> = [];
  totalPrice: any;
 
  constructor(private productCart: ProductCart,
              private router: Router,
              private productService: ProductService) { }

  ngOnInit() {
    this.getCartInfo();
  }

  getCartInfo() {
    if (!navigator.onLine) {
      this.cart = this.productCart.getProducts();
      this.totalPrice = this.productCart.getTotalPrice();
    } else {
      this.cart = this.productCart.getCartFromLocalStorage();
      console.log(this.cart);
      this.totalPrice = this.productCart.getTotalPrice();
    }
  }

 /**
  * 
  * @param {Product} selected product 
  */ 
  deleteCurrentProduct(product: Product) {
    const productId = product.id;
    this.productCart.deleteProductById(productId);
    this.totalPrice = this.productCart.getTotalPrice();
  }

/**
 * Navigating to 'dashboard' after order is made
 */  
  makeAnOrder() {
    this.router.navigate(['/dashboard/order-confirmation']);
  }

/**
 * Add one product to cart, calling the bill for that service
 * @param {Product} product data
 */  
  addOneProduct(product: Product) {
    const productId = product.id;
    this.productCart.addOneProductToCart(productId);
    this.totalPrice = this.productCart.getTotalPrice();
  }

 /**
  * Delete one product from cart, calling the bill for that service
  * @param {Product} product data
  */   
  deleteOneProduct(product: Product) {
    const productId = product.id;
    this.productCart.deleteOneProductFromCart(productId);
    this.totalPrice = this.productCart.getTotalPrice();
  }

  navigateToProductDetailsPage(product) {
    this.productService.setSelectedProduct(product);
    this.router.navigate([`dashboard/product-details/${product.id}`]);
  }

}
