import * as AuthActions from './auth.actions';

export interface State {
    authStatus: boolean
}

const initialState = {
    authStatus: false
}

export function authReducers(state = initialState, action: AuthActions.AuthActions) {
    switch(action.type) {
        case (AuthActions.SIGNIN):
            return {
                ...state,
                authStatus: true
            }
      
        default:
            return state
    }
}