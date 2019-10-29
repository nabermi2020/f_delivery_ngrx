import { Product } from 'src/app/shared/product.model';

export interface AppState {
    productList: State
}

export interface State {
    products: Array<Product>
};

const initialState = {
    products: []
}

export function productReducer(state = initialState, action) {
    return state;  
}