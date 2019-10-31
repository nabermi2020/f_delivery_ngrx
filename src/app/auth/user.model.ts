import { Cart } from './../cart/cart/cart.model';

export class User {
    public userId: number;
    public firstName: string;
    public lastName: string;
    public login: string;
    public password: string;
    public phone: string;
    public email: string;
    public address: string;

    constructor(fName: string,  lName: string, login: string,
                password: string, phone: string,
                email: string, address: string) {
        this.firstName = fName;
        this.lastName = lName;
        this.login = login;
        this.password = password;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.userId = this.randomId(1000, 1);
    }

    private randomId(upperLimit: number, lowerLimit: number) {
        return Math.floor(Math.random() * (upperLimit - lowerLimit) + lowerLimit);
    }
}
