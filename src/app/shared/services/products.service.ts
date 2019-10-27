import { ErrorService } from './error.service';
import { LoadingService } from './loading.service';
import { AppNotFoundErr } from './../app-not-found-err';
import { Product } from '../product.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';
import { Observable, Subscription, Subject, combineLatest, Observer } from 'rxjs';
import { mapTo, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { merge } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EditModalService } from './edit-modal.service';
import { throwError } from 'rxjs';


@Injectable()
export class ProductService {
    apiUrl: string = environment.apiUrl;
    selectedProduct;
    results = [];
    products = {};

    constructor(private http: HttpClient,
                private router: Router,
                private loadingService: LoadingService,
                private editModal: EditModalService,
                private errorService: ErrorService) { 
        
    }
 
 /**
  * Save products on the server
  */   
    saveProducts() {
        const headers = new HttpHeaders({'Content-type': 'application/json'});
        this.http.post(this.apiUrl, this.products, { headers})
            .subscribe();
    }

/**
 * Get all products from server
 * @return {Observable} return all products
 */    
    getProducts() {
        const headers = new HttpHeaders({'Content-type': 'application/json'});
        const productsObservable = Observable.create( (observer: Observer<any>) => {
        let onlineMode = navigator.onLine;
        
        if (onlineMode) {
            this.http.get(`${this.apiUrl}/pizza`, {headers})
            .subscribe(
                (productList: Array<any>) => {
                    observer.next(this.onProductGetSuccess(productList));
                    localStorage.setItem("productList", JSON.stringify({category: "pizza", products: productList}));
                },
                (err: Response) => {
                    observer.error('error while getting products! ' + err);
                }
            ); 
        } else {
            observer.error("Offline mode!");
        }
        });
        return productsObservable;
    }

    onProductGetSuccess(productList: Array<any>) { 
        let products;

        if (productList.length > 0) {
            products = productList;
            this.products = productList;
        }   

        return products;   
    }

/**
 * Get products according to selected category
 * @param {String} product's category
 * @return {Observable} products which are matched search query
 */    
    getProductsByCategory(category: string): Observable<any> {
      
        const productsObserver = Observable.create((observer: Observer<any>) => {
        const headers = new HttpHeaders({'Content-type': 'application/json'});
        let online = navigator.onLine;
        
        if (online) {     
            this.http.get(`${this.apiUrl}/${category}`, {headers})
                .subscribe(
                    (products: Array<any>) => {
                        if (products.length > 0) {
                            observer.next(products);
                            localStorage.setItem("productList", JSON.stringify({category: category, products: products}));
                        } else {
                            observer.error('No Products!');
                        }
                    },
                
                    (err: Response) => {
                        observer.error(err);
                    }
                );
        } else {
            let productList = JSON.parse(localStorage.getItem('productList'));
            if (productList.category == category) {
                observer.next(productList.products);
            } else {
                observer.error('Offline mode!');
            }
        }
     
        });
        
        return productsObserver;
    }

    setSelectedProduct(productInfo) {
        this.selectedProduct = productInfo;
    }

    getSelectedProduct() {
        return this.selectedProduct;
    }

    getResults() {
        return this.results;
    }
    
}
