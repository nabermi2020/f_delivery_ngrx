import { Cart } from "../../cart/cart/cart.model";
import { AuthService } from "../../auth/services/auth.service";
import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Product } from "../product.model";
import { Subject, Subscription, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ErrorService } from "./error.service";

@Injectable()
export class ProductCart {
  cart = new Cart();
  onProductAdded = new Subject<any>();
  gettingProducts = new Subscription();
  apiUrl: any = environment.apiUrl;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private errorService: ErrorService
  ) {
    this.checkCartExistenseByUserId();
    this.getCartFromServer();
  }

  public checkCartExistenseByUserId(): void {
    if (!navigator.onLine) {
      this.cart.setUserId(this.authService.getCurrentUser());
      const userId = this.authService.getCurrentUser().id;
      const headers = new HttpHeaders({ "Content-type": "application/json" });
      this.http
        .get(`${this.apiUrl}/cart?id=${userId}`, { headers })
        .subscribe(
          this.onCheckCartExistenseSuccess.bind(this),
          this.onCheckCartExistenseFailure.bind(this)
        );
    }
  }

  public onCheckCartExistenseSuccess(response): void {
    if (response.length == 0) {
      const headers = new HttpHeaders({ "Content-type": "application/json" });
      this.http
        .post(`${this.apiUrl}/cart`, this.cart, { headers })
        .subscribe(
          this.onCreateCartSuccess.bind(this),
          this.onCreateCartFailure.bind(this)
        );
    }
  }

  private onCheckCartExistenseFailure(error: Response): void {
    this.errorService.handleError(error);
  }

  private onCreateCartSuccess(successRes): void {
    console.log("Cart is created!");
    console.log(successRes);
  }

  private onCreateCartFailure(error): void {
    console.log("Something went wrong while creating cart!");
  }

  public addProducts(product: Product): void {
    let onlineMode = navigator.onLine;
    this.cart.addProduct(product);
    this.onProductAdded.next(this.cart.getCart());

    if (!onlineMode) {
      this.synchCartWithServer();
      localStorage.setItem("productCart", JSON.stringify(this.cart));
    } else {
      localStorage.setItem("productCart", JSON.stringify(this.cart));
    }
  }

  private synchCartWithServer(): void {
    const headers = new HttpHeaders({ "Content-type": "application/json" });
    this.http
      .put(`${this.apiUrl}/cart/${this.cart.id}`, this.cart, { headers })
      .subscribe(
        this.onSynchCartWithServerSuccess.bind(this),
        this.onSynchCartWithServerFailure.bind(this)
      );
  }

  private onSynchCartWithServerSuccess(synchStatus) {
    console.log("Cart is successfully synchronized with server!");
    console.log(synchStatus);
  }

  private onSynchCartWithServerFailure(error) {
    console.log("Error while synchronizing product cart with server!");
    this.errorService.handleError(error);
  }

  /**
   * Get appropriate cart from server
   */

  public getCartFromServer() {
    if (!navigator.onLine) {
      const headers = new HttpHeaders({ "Content-type": "application/json" });
      const userId = this.authService.getCurrentUser().id;
      this.gettingProducts = this.http
        .get(`${this.apiUrl}/cart/${userId}`, { headers })
        .subscribe(
          this.onGetCartSuccess.bind(this),
          this.onGetCartFailure.bind(this)
        );
    }
  }

  private onGetCartSuccess(cart): void {
    let localCart = JSON.parse(localStorage.getItem("productCart"));
    let localCartInstanse = new Cart(localCart["products"]);
    this.setProductsToCartFromServerOrLocalSt(localCartInstanse ? localCart : cart);
    this.onProductAdded.next(this.cart.getCart());
    localStorage.setItem("productCart", JSON.stringify(this.cart));
  }

  private setProductsToCartFromServerOrLocalSt(cart): void {
    this.cart.setProducts(cart["products"]);
    this.cart.setCartId(cart["cartId"]);
  }

  private onGetCartFailure(error): void {
    console.log(error);
    alert("Error while getting cart from server!");
    this.errorService.handleError(error);
  }

  public getCartFromLocalStorage(): Array<Product> {
    let cart = JSON.parse(localStorage.getItem("productCart"));
    this.cart.setProducts(cart["products"]);
    this.cart.setCartId(cart["cartId"]);
    this.onProductAdded.next(this.cart);
    return this.cart.getCart();
  }

  public calculateProductsQuantity(): number {
    return this.cart.calculateProductsQuantity();
  }

  public getProducts(): Array<Product> {
    return this.cart.getCart();
  }

  public deleteProductById(id): void {
    this.cart.deleteProductById(id);
    this.onProductAdded.next(this.cart.getCart());
    this.syncCartWithServerAndLocalStorage();
  }

  private syncCartWithServerAndLocalStorage(): void {
    let onlineMode = navigator.onLine;

    if (!onlineMode) {
      this.synchCartWithServer();
    }
    localStorage.setItem("productCart", JSON.stringify(this.cart));
  }

  public addOneProductToCart(id): void {
    this.cart.addOneProductToCart(id);
    this.onProductAdded.next(this.cart.getCart());
    this.syncCartWithServerAndLocalStorage();
  }

  public deleteOneProductFromCart(id): void {
    this.cart.deleteOneProductFromCart(id);
    this.onProductAdded.next(this.cart.getCart());
    this.syncCartWithServerAndLocalStorage();
  }

  public getTotalPrice(): number {
    return this.cart.getTotalPrice();
  }

  public getProductCart(): Cart {
    return this.cart;
  }

  public cleanCart(): void {
    this.cart.cleanCart();
    this.syncCartWithServerAndLocalStorage();
    this.onProductAdded.next(this.cart);
  }
}
