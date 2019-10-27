import { LoadingService } from '../../shared/services/loading.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ProductService } from 'src/app/shared/services/products.service';
import { EditModalService } from 'src/app/shared/services/edit-modal.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss']
})

export class ProductGridComponent implements OnInit, OnDestroy {
  products: Array<any>;
  isSearchFailure: boolean = true;
  activeCategory: string = "pizza";
  activeFilter: string = "All";
  onlineMode: boolean = true;
  searchAvailability: boolean = true;
  urlParSubscription = new Subscription();
  productSubscription = new Subscription();
  productsByCategorySubscription = new Subscription();
  
  constructor(private productsService: ProductService,
              private route: ActivatedRoute,
              private editMode: EditModalService,
              private loadingService: LoadingService,
              private editModal: EditModalService) { }

  ngOnInit() {
    this.getProducts();
    this.checkSearchAvailability();
    this.getProductByCategory();        
  }

  private checkSearchAvailability() {
    let localProductList = localStorage.getItem('productList');
    if (localProductList) {
      this.searchAvailability = JSON.parse(localStorage.getItem('productList')).products.length > 0;
    }
  }

  getProductByCategory() {
    this.urlParSubscription = this.route.firstChild.params
      .subscribe( 
        (par: Params) => {
          this.activeCategory = par["cat"];
          this.isSearchFailure = true;
          this.loadingService.toggleLoading();
          this.editModal.toggleEditMode();
          this.getProductByActiveCategory();
      });
  }

  getProductByActiveCategory() {
    this.productsByCategorySubscription = this.productsService.getProductsByCategory(this.activeCategory)
      .subscribe(
        this.onGetProductByActiveCategorySuccess.bind(this),    
        this.onGetProductError.bind(this)
       );  
  }

  onGetProductByActiveCategorySuccess(productList) {
      this.onlineMode = productList.length > 0 ? true : false;
      this.products = productList;
      this.activeFilter = "All";
      this.loadingService.toggleLoading();
      this.editModal.toggleEditMode();
  }

/**
 * Get products using 'productService'
 */  
  getProducts() {
    this.loadingService.toggleLoading();
    this.editModal.toggleEditMode();
    this.productSubscription = this.productsService.getProducts()
      .subscribe(
        this.onGetProductsSuccess.bind(this),       
        this.onGetProductError.bind(this)
      );
  }

  onGetProductsSuccess(products: Array<any>) {
    this.products = products;
    this.onlineMode = true;
    this.loadingService.toggleLoading();
    this.editModal.toggleEditMode();  
  }

  onGetProductError(err) {
    this.onlineMode = false;
    this.loadingService.toggleLoading();
    this.editModal.toggleEditMode();
  }

 /**
  * Set filter category
  * @param {String} product category 
  */ 
  setFilterCategory(cat) {
    this.activeFilter = cat;
  }

  ngOnDestroy() {
    this.urlParSubscription.unsubscribe();
    this.productSubscription.unsubscribe();
    this.productsByCategorySubscription.unsubscribe();
  }

  setProducts(products) {
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
