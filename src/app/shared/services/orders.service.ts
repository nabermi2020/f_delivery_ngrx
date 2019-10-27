import { LoadingService } from './loading.service';
import { ProductCart } from './product-cart.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/services/auth.service';
import { Injectable } from '@angular/core';
import { Order } from 'src/app/cart/order.model';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { EditModalService } from './edit-modal.service';
import { environment } from 'src/environments/environment';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  apiUrl: any = environment.apiUrl;

  constructor(private authService: AuthService,
              private http: HttpClient,
              private productCart: ProductCart,
              private router: Router,
              private loadingService: LoadingService,
              private editModal: EditModalService,
              private errorService: ErrorService) {
  }

/**
 * Make an order and send it on server in case of success clean order cart
 * @param { Order} order 
 */  
  makeAnOrder(order: Order) {
    const headers = new HttpHeaders({'Content-type': 'application/json'});
    const id = this.authService.getCurrentUser().id;
    order.setUserId(id);
  
    this.http.post(`${this.apiUrl}/orders`, order, { headers })
        .subscribe(
            this.onMakeOrderSuccess.bind(this),
            this.onMakeOrderError.bind(this)
        );
  }

  onMakeOrderSuccess(orderStatus) {
    this.productCart.cleanCart(); 
    this.router.navigate(['dashboard/products/pizza']);
  }

  onMakeOrderError(error) {
    console.log(error);
    this.errorService.handleError(error);
  }

/**
 * Get order history for appropriate user
 * @return {Observable} user's orders
 */  
  getOrders(): Observable<any> {
    const ordersObservable = Observable.create( (observer: Observer<any>) => {
      let onlineMode = navigator.onLine;

      if (!onlineMode) {
        this.getOrdersFromServer(observer);  
      } else {
        this.getOrdersFromLocalStorage(observer);
      }  
    });

     return ordersObservable;
  }

  getOrdersFromServer(observer: Observer<any>) {
    const headers = new HttpHeaders({'Content-type': 'application/json'});
    const id = this.authService.getCurrentUser().id;
    this.http.get(`${this.apiUrl}/orders?userId=${id}`, { headers })
    .subscribe(
      (orders: Array<any>) => {
        localStorage.setItem('orderHistory', JSON.stringify(orders));
        observer.next(orders);
      },

      (error: Response) => {
        observer.error(error);
        this.errorService.handleError(error);
      }
    );
  }

  getOrdersFromLocalStorage(observer: Observer<any>) {
    let localOrderHistory = JSON.parse(localStorage.getItem("orderHistory"));
    if (localOrderHistory.length > 0) {
      observer.next(localOrderHistory);
    } else {
      observer.error("offline mode");
    }
  }
}
