import { UserData } from './auth.interfaces';

export class User {
    public data: UserData;

    constructor(data) {
        this.data = data;
        this.data.userId = this.randomId(1000, 1);
    }

    private randomId(upperLimit: number, lowerLimit: number) {
        return Math.floor(Math.random() * (upperLimit - lowerLimit) + lowerLimit);
    }

    public getUserData(): UserData {
        return this.data;
    }
}
