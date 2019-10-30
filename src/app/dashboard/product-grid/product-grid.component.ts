import { Store } from '@ngrx/store';
import { LoadingService } from '../../shared/services/loading.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ProductService } from 'src/app/shared/services/products.service';
import { EditModalService } from 'src/app/shared/services/edit-modal.service';
import { Subscription, Observable } from 'rxjs';
import  * as fromApp from './../../store/app.reducers';
import * as productListActions from './../store/products.actions';
import { Product } from 'src/app/shared/product.model';
import { mergeMap, switchMap, map } from 'rxjs/operators';

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
              private loadingService: LoadingService,
              private editModal: EditModalService,
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
    // this.loadingService.toggleLoading();
    // this.editModal.toggleEditMode();  
  }

  private onGetProductError(err): void {
    this.onlineMode = false;
    // this.loadingService.toggleLoading();
    // this.editModal.toggleEditMode();
  }


  public setFilterCategory(productCategory): void {
    this.activeFilter = productCategory;
  }

  public setProducts(products): void {
    if (products.length > 0 && products != 'All') {
      this.products = products;
      this.isSearchFailure = true;
    } else if (products == "All") {
      if (!navigator.onLine) {
        this.getProducts();
      } else {
        this.loadingService.toggleLoading();
        this.editModal.toggleEditMode();
        this.getProductByActiveCategory();
      }
      this.isSearchFailure = true;
    } else {
      this.products = [];
      this.isSearchFailure = false;
    }
  }

}
