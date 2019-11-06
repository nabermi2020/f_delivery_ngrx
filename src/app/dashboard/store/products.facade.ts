import { Injectable } from '@angular/core';
import  * as fromApp from './../../store/app.reducers';
import * as productListActions from './../store/products.actions';
import { Store } from '@ngrx/store';

@Injectable({
    providedIn: 'root'
})
export class ProductsFacade {
    
    constructor(private store: Store<fromApp.AppState>) {}

    public getProducts(): void {
        return this.store.dispatch(new productListActions.GetDefaultProductList());
    }

    public getProductListByCategory(activeCategory: string) {
        return this.store.dispatch(new productListActions.GetProductListByCategory(activeCategory));   
    }
}