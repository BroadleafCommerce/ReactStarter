import {AuthActionTypes} from 'auth/actions'

const initialState = {
    authenticationToken : undefined,
    lastAuthenticated: undefined,
    isCrossApp : false,
    anonymousCustomerToken : undefined,
    error : undefined,
    isAuthenticating : false,
}

const auth = (state = initialState, action) => {
    switch(action.type) {
        case AuthActionTypes.Logout:
        return initialState
        case AuthActionTypes.Login.Request:
        case AuthActionTypes.Register.Request:
        return {
            ...state,
            isAuthenticating: true,
        }
        case AuthActionTypes.Login.Success:
        case AuthActionTypes.Register.Success:
        return {
            ...state,
            authenticationToken: action.payload.authenticationToken,
            lastAuthenticated: action.payload.lastAuthenticated,
            anonymousCustomerToken: undefined,
            isCrossApp: false,
            isAuthenticating: false,
            error: undefined,
        }
        case AuthActionTypes.Login.Failure:
        case AuthActionTypes.Register.Failure:
        return {
            ...state,
            error: action.payload.error,
            isAuthenticating: false,
            authenticationToken: undefined,
            isCrossApp: false,
        }
        case AuthActionTypes.AcceptToken:
        return {
            ...state,
            authenticationToken: action.payload.authenticationToken,
            lastAuthenticated: action.payload.lastAuthenticated,
            isAuthenticating: false,
        }
        default:
        if (action.payload && action.payload.auth) {
            return {
                ...state,
                ...action.payload.auth,
            }
        }
        return state
    }
}

export default auth
