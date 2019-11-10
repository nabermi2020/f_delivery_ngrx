export interface UserData {
    firstName: string;
    lastName: string;
    login: string;
    password: string;
    phone: string;
    email: string;
    address: string;
    userId?: number;
}

export interface Credentials {
    login: string;
    password: string;
}
