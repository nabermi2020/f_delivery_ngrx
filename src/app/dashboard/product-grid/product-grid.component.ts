import { ProductsFacade } from './../store/products.facade';
import { ProductsSelectors } from './../store/products.selectors';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
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
              private productsSelectors: ProductsSelectors,
              private productsFacade: ProductsFacade) { }

  ngOnInit() {
    this.subscribeToProductList();
    this.getProducts();
    this.getProductByCategory();
  }

  ngOnDestroy() {
    this.urlParSubscription.unsubscribe();
  }

  private getProducts(): void {
    this.productsFacade.getProducts();
  }

  private subscribeToProductList(): void {
    this.productsSelectors.dashboardModule$
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
          this.productsFacade.getProductListByCategory(this.activeCategory);
      });
  }

  private onGetProductsSuccess(products): void {
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
