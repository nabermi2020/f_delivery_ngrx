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

  ngOnDestroy() {
    this.activeFilterSubscription.unsubscribe();
  }

  private subscribeToActiveRoute(): void {
    this.activeFilterSubscription = this.activeRoute.children[0].params
    .subscribe(
      res => {
        this.activeCategory = res["cat"];
        this.activeFilter = this.filters[this.activeCategory];
        this.activeCategory = 'All';
      }
    );
  }

  public filterProductsByCategory(filter): void {
    this.activeCategory = filter;
    this.activeCategorySelected.emit(filter);
  }
}
