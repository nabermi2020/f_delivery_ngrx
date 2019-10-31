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

  private getCartInfo(): void {
    if (!navigator.onLine) {
      this.cart = this.productCart.getProducts();
      this.totalPrice = this.productCart.getTotalPrice();
    } else {
      this.cart = this.productCart.getCartFromLocalStorage();
      this.totalPrice = this.productCart.getTotalPrice();
    }
  }

  public deleteCurrentProduct(product: Product): void {
    const productId = product.id;
    this.productCart.deleteProductById(productId);
    this.totalPrice = this.productCart.getTotalPrice();
  }


  public makeAnOrder():void {
    this.router.navigate(['/dashboard/order-confirmation']);
  }

 
  public addOneProduct(product: Product): void {
    const productId = product.id;
    this.productCart.addOneProductToCart(productId);
    this.totalPrice = this.productCart.getTotalPrice();
  }
 
  public deleteOneProduct(product: Product): void {
    const productId = product.id;
    this.productCart.deleteOneProductFromCart(productId);
    this.totalPrice = this.productCart.getTotalPrice();
  }

  public navigateToProductDetailsPage(product): void {
    this.productService.setSelectedProduct(product);
    this.router.navigate([`dashboard/product-details/${product.id}`]);
  }

}
