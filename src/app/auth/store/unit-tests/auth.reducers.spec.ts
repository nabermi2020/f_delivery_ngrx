import { User } from './../../user.model';
import { Action } from '@ngrx/store';
import * as fromAuth from './../auth.reducers';
import * as fromAuthActions from './../auth.actions';
import { UserData } from '../../auth.interfaces';

describe('Auth Reducers', () => {
    const mockUserData: UserData = {
        firstName: "Michael",
        lastName: "Oherni",
        login: "John9992222",
        phone: "+380501865210",
        email: "naber2008@ukr.net",
        address: "LA, New Walley 145/85",
        password: "test123",
        userId: 33
    };
    
    it('undefined Action', () => {
        const initialState  = fromAuth.initialState;
        const action: Action = { type : '' };
        const state = fromAuth.authReducers(undefined, action);

        expect(state).toBe(initialState);
    });

    it('Sign In Action', () => {
        const { initialState } = fromAuth;
        const action: Action = fromAuthActions.SignIn();
        const state = fromAuth.authReducers(initialState, action);

        expect(state.authStatus).toEqual(true);
        expect(state.userData).toEqual([]);
    });

    it('Sign Up Action', () => {
        const { initialState } = fromAuth;
        const action: Action = fromAuthActions.SignUp();
        const state = fromAuth.authReducers(initialState, action);

        expect(state.userData).toEqual([]);
        expect(state.authStatus).toEqual(false);
    });

    it('Log Out Action', () => {
        const { initialState } = fromAuth;
        const action: Action = fromAuthActions.LogOut();
        const state = fromAuth.authReducers(initialState, action);

        expect(state.userData).toEqual([]);
        expect(state.authStatus).toEqual(false);
    });

    it('Set User Data Action', () => {
        const user = new User(mockUserData);
        let users: Array<User> = [];
        users.push(user);
        const { initialState } = fromAuth;
        initialState.authStatus = true;
        const action: Action = fromAuthActions.SetUserData(users);
        const state = fromAuth.authReducers(initialState, action);
        
        expect(state.authStatus).toEqual(true);
        expect(state.userData[0][0]).toEqual(users[0]);
    });

    it('Clean User Data Action', () => {
        const { initialState } = fromAuth;
        const action: Action = fromAuthActions.CleanUserData();
        const state = fromAuth.authReducers(initialState, action);
        
        expect(state.userData).toEqual([]);
    });
});