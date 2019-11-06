import { Store } from '@ngrx/store';
import  * as fromApp from './../../store/app.reducers';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductsSelectors {
    constructor(private store: Store<fromApp.AppState>) {}

    public dashboardModule$ = this.store.select('dashboardModule');

}