import { Store } from '@ngrx/store';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import  * as fromApp from './../../store/app.reducers';
import * as productListActions from './../store/products.actions';
import { Product } from 'src/app/shared/product.model';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss']
})

export class ProductGridComponent implements OnInit, OnDestroy {
  products: Array<Product>;
  isSearchFailure: boolean = true;
  activeCategory: string = "pizza";
  activeFilter: string = "All";
  onlineMode: boolean = true;
  searchAvailability: boolean = true;
  urlParSubscription = new Subscription();
  
  constructor(private route: ActivatedRoute,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscribeToProductList();
    this.getProducts();
    this.getProductByCategory();
  }

  ngOnDestroy() {
    this.urlParSubscription.unsubscribe();
  }

  private getProducts(): void {
    this.store.dispatch(new productListActions.GetDefaultProductList());
  }

  private subscribeToProductList(): void {
    this.store.select('dashboardModule')
      .subscribe( 
        this.onGetProductsSuccess.bind(this),       
        this.onGetProductError.bind(this)  
      );
  }

  private getProductByCategory(): void {
    this.urlParSubscription = this.route.firstChild.params
      .subscribe( 
        (activeCategory: Params) => {
          this.activeCategory = activeCategory["cat"];
          this.isSearchFailure = true;
          this.getProductByActiveCategory();
      });
  }

  private getProductByActiveCategory(): void {
    this.store.dispatch(new productListActions.GetProductListByCategory(this.activeCategory));
  }

  private onGetProductsSuccess(products): void {
    console.log(products)
    this.products = products.products;
    this.onlineMode = true;
  }

  private onGetProductError(err): void {
    this.onlineMode = false;
  }

  public setFilterCategory(productCategory): void {
    this.activeFilter = productCategory;
  }

}
