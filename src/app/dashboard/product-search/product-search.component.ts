import { ProductService } from 'src/app/shared/services/products.service';
import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {
  @Output() searchDone = new EventEmitter();
  minQueryLength: number = 3;
  results: Array<any>;

  constructor(private productService: ProductService) { }
  
  ngOnInit() {}

  searchProducts(requestedQuery) {
    const query = (requestedQuery.value).trim().replace(/(\s\s\s*)/g, ' ');
    this.results = [];
    
    if (query.length >= this.minQueryLength) {
      this.productService.searchProducts(query)
        .subscribe( 
          this.onGetSearchResultsSuccess.bind(this),
          this.onGetSearchResultsFailure.bind(this)
        );
    } else if (query.length == 0) {     
      this.searchDone.emit('All');
    }
  }

  onGetSearchResultsSuccess(searchResults) {
    this.results = searchResults;
    this.searchDone.emit(this.results);
  }

  onGetSearchResultsFailure(searchError) {
    console.log(searchError);
    this.searchDone.emit(searchError);  
  }

  getFormattedResults(searchResults) {
    const results = [];
    searchResults.forEach(searchResByProdCategory => {
      searchResByProdCategory.forEach(item => {
        results.push(item);
      });
    });

    return results;
  }
}


