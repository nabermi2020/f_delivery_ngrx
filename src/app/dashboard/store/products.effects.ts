import { ProductService } from "./../../shared/services/products.service";
import { map, mergeMap, switchMap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import * as ProductsActions from "./products.actions";
import { Product } from "src/app/shared/product.model";

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  @Effect()
  getDefaultProductList = this.actions$.pipe(
    ofType(ProductsActions.GET_DEFAULT_PRODUCT_LIST),
    switchMap(() => {
      return this.productService.getProducts();
    }),

    mergeMap((productList: Array<Product>) => {
      return [
        {
          type: ProductsActions.SAVE_PRODUCT_LIST,
          payload: productList
        }
      ];
    })
  );

  @Effect()
  getProductListByCategory = this.actions$.pipe(
    ofType(ProductsActions.GET_PRODUCT_LIST_BY_CATEGORY),
    map((action: ProductsActions.GetProductListByCategory) => {
      console.log(action.payload);
      return action.payload;
    }),
    switchMap((activeProductCategory: string) => {
      return this.productService.getProductsByCategory(activeProductCategory);
    }),
    mergeMap((productList: Array<Product>) => {
      return [
        {
          type: ProductsActions.SAVE_PRODUCT_LIST,
          payload: productList
        }
      ];
    })
  );
}
