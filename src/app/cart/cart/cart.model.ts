import { Product } from 'src/app/shared/product.model';

export class Cart {
    public products: Array<Product>;
    public totalPrice: number;
    public id: number;
    public userId: number;
    public cartId: number;

    constructor(products?: Array<Product>) {
        this.products = products ? products : [];
        this.cartId = this.randomId(1, 10000);
        this.totalPrice = 0;
    }

    setUserId(userData) {
        this.id = userData.id;
        this.userId = userData.userId;
    }

    setCartId(id) {
        this.cartId = id;
    }

    getCart(): Array<Product> {
        return this.products;
    }

    setProducts(products) {
        this.products = products;
    }

    addProduct(product: Product) {
        const productId = product.id;
       
        if (!this.checkForDublicates(productId)) {
            product["productQuantity"] = product.productQuantity;
            this.products.push(product);
        } else {
            this.products.forEach( item => {
                if (item.id == productId ) {
                    item["productQuantity"] += product.productQuantity;
                }
            });
        }

        this.calculateTotalPrice();    
    }

    deleteProductById(id) {
        let deleteWithId;
        this.products.forEach( (item, index) => {
            if ( item.id == id ) {
                deleteWithId = index;
            }
        });

        this.products.splice(deleteWithId, 1);
    }

    addOneProductToCart(id) {
        this.products.forEach( product => {
            if (product.id == id) {
                ++product.productQuantity;
            }
        });  
    }

    deleteOneProductFromCart(id) {
        this.products.forEach( product => {
            if (product.id == id && product.productQuantity != 1) {
                --product.productQuantity;
            }
        });
    }

    checkForDublicates(id): boolean {
        let isDublicated = false;
        this.products.forEach( item => {
            if (item.id == id) {
                isDublicated = true;
            }
        });
    
        return isDublicated;
    }

    calculateTotalPrice() {
        let price = 0;
        this.products.forEach( item => {
            price += item.productPrice * item.productQuantity;
        });

        this.totalPrice = price;
    }

    getTotalPrice() {
        this.calculateTotalPrice();
        return this.totalPrice;
    }  

    calculateProductsQuantity(): number {
        let productQuantity = 0;

        this.products.forEach( item => {
            productQuantity += item.productQuantity;
        });

        return productQuantity;
    }

    cleanCart() {
        this.products = [];
    }

    randomId(upperLimit: number, lowerLimit: number) {
        return Math.floor(Math.random() * (upperLimit - lowerLimit) + lowerLimit);
    }
}
