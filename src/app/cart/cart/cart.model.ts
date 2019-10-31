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

    public setUserId(userData): void {
        this.id = userData.id;
        this.userId = userData.userId;
    }

    public setCartId(id): void {
        this.cartId = id;
    }

    public getCart(): Array<Product> {
        return this.products;
    }

    public setProducts(products): void {
        this.products = products;
    }

    public addProduct(product: Product): void {
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

    public deleteProductById(id): void {
        let deleteWithId;
        this.products.forEach( (item, index) => {
            if ( item.id == id ) {
                deleteWithId = index;
            }
        });

        this.products.splice(deleteWithId, 1);
    }

    public addOneProductToCart(id): void {
        this.products.forEach( product => {
            if (product.id == id) {
                ++product.productQuantity;
            }
        });  
    }

    public deleteOneProductFromCart(id): void {
        this.products.forEach( product => {
            if (product.id == id && product.productQuantity != 1) {
                --product.productQuantity;
            }
        });
    }

    private checkForDublicates(id): boolean {
        let isDublicated = false;
        this.products.forEach( item => {
            if (item.id == id) {
                isDublicated = true;
            }
        });
    
        return isDublicated;
    }

    private calculateTotalPrice(): void {
        let price = 0;
        this.products.forEach( item => {
            price += item.productPrice * item.productQuantity;
        });

        this.totalPrice = price;
    }

    public getTotalPrice(): number {
        this.calculateTotalPrice();
        return this.totalPrice;
    }  

    public calculateProductsQuantity(): number {
        let productQuantity = 0;

        this.products.forEach( item => {
            productQuantity += item.productQuantity;
        });

        return productQuantity;
    }

    public cleanCart(): void {
        this.products = [];
    }

    private randomId(upperLimit: number, lowerLimit: number): number {
        return Math.floor(Math.random() * (upperLimit - lowerLimit) + lowerLimit);
    }
}
