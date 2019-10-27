import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnDestroy {
  activeCategory: string = 'All';
  @Output() activeCategorySelected = new EventEmitter();
  activeFilter: [];
  activeFilterSubscription = new Subscription();
  filters =  {
    'pizza': ['All', 'Vegetarian', 'With Meat', 'With seafood', 'With Cheese'],
    'drinks': ['All', 'Alcoholic', 'Non alcoholic', 'Lemonades'],
    'salads': ['All', 'Vegetarian', 'Seafood', 'With Meat']
  };

  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.subscribeToActiveRoute();
  }

  subscribeToActiveRoute() {
    this.activeFilterSubscription = this.activeRoute.children[0].params
    .subscribe(
      res => {
        this.activeCategory = res["cat"];
        this.activeFilter = this.filters[this.activeCategory];
        this.activeCategory = 'All';
      }
    );
  }

  filterProductsByCategory(filter) {
    this.activeCategory = filter;
    this.activeCategorySelected.emit(filter);
  }

  ngOnDestroy() {
    this.activeFilterSubscription.unsubscribe();
  }

}
