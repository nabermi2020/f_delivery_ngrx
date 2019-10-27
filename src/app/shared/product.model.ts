export class Product {
    public id: number;
    public imgPath: string;
    public productWeight: string;
    public productSize: string;
    public productDescription: string;
    public productTitle: string;
    public productPrice: number;
    public productQuantity: number;
    public productCategories: string[];

    constructor(title: string, imgSrc: string,
                productWeight: string, productSize: string,
                productDescription: string, price: number) {
        
        this.id = this.randomId(1000, 1);
        this.productTitle = title;
        this.imgPath = imgSrc;
        this.productWeight = productWeight;
        this.productSize = productSize;
        this.productDescription = productDescription;
        this.productPrice = price;
    }
    
    randomId(upperLimit: number, lowerLimit: number) {
        return Math.floor(Math.random() * (upperLimit - lowerLimit) + lowerLimit);
    }
}
