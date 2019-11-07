export interface UserData {
    // it is common best practise, first - required params, next - optionals, please take a look more attentively at TypeScript best practices
    userId?: number;
    firstName: string;
    lastName: string;
    login: string;
    password: string;
    phone: string;
    email: string;
    address: string;
}

export interface Credentials {
    login: string;
    password: string;
}
