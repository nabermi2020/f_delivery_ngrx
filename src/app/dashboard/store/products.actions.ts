import { Action } from "@ngrx/store";
import { Product } from "src/app/shared/product.model";

export const GET_DEFAULT_PRODUCT_LIST = "GET_DEFAULT_PRODUCT_LIST";
export const SAVE_PRODUCT_LIST = "SAVE_PRODUCT_LIST";
export const GET_PRODUCT_LIST_BY_CATEGORY = "GET_PRODUCT_LIST_BY_CATEGORY";

export class GetDefaultProductList implements Action {
  readonly type = GET_DEFAULT_PRODUCT_LIST;
}

export class SaveProductList implements Action {
  readonly type = SAVE_PRODUCT_LIST;

  constructor(public payload: Array<Product>) {}
}

export class GetProductListByCategory implements Action {
    readonly type = GET_PRODUCT_LIST_BY_CATEGORY;
  
    constructor(public payload: string) {}
  }

export type ProductsActions = 
    GetDefaultProductList |
    SaveProductList | 
    GetProductListByCategory;
