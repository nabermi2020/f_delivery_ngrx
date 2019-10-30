import * as ProductsActions from "./products.actions";
import { Product } from "src/app/shared/product.model";

export interface AppState {
  productList: State;
}

export interface State {
  products: Array<Product>;
}

const initialState = {
  products: []
};

export function productReducer(state = initialState, action: ProductsActions.ProductsActions) {
  switch (action.type) {
    case ProductsActions.SAVE_PRODUCT_LIST:
      return {
        ...state,
        products: action.payload
      }

      

    default:
      return {
        ...state
      };
  }
}
