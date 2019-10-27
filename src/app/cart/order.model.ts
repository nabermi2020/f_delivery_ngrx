import { Cart } from './cart/cart.model';
import { Product } from '../shared/product.model';

export class Order {
    public userId: any;
    public orderId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public phone: string;
    public address: string;
    public deliveryTime: string;
    public orderTime: Date;
    public cart: Cart;
    public totalPrice: any;
    public products: Array<Product>;

    constructor(firstName, lastName,
                email, phone,
                address, deliveryTime, cart: Cart) {

        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.deliveryTime = deliveryTime;
        this.orderTime = new Date();
        this.orderId = this.generateOrderId(1, 1000);
        this.totalPrice = cart.getTotalPrice();
        this.products = cart.getCart();
    }

    setUserId(id) {
        this.userId = id;   
    }

    generateOrderId(upperLimit: number, lowerLimit: number) {
        return Math.floor(Math.random() * (upperLimit - lowerLimit) + lowerLimit);
    }
}
