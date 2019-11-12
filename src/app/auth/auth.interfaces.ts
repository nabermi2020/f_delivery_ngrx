import { User } from './user.model';

export interface UserData {
    firstName: string;
    lastName: string;
    login: string;
    password: string;
    phone: string;
    email: string;
    address: string;
    userId?: number;
    type?: string;
}

export interface Credentials {
    login: string;
    password: string;
}

export interface AuthStatus {
    authStatus: boolean;
    onlineMode: boolean;
    userData: Array<User>;
}
