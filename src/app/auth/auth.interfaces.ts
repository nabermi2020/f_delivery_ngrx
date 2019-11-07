export interface UserData {
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