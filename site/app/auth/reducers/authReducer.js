/*
 * #%L
 * React Site Starter
 * %%
 * Copyright (C) 2009 - 2017 Broadleaf Commerce
 * %%
 * Broadleaf Commerce React Starter
 * 
 * Written in 2017 by Broadleaf Commerce info@broadleafcommerce.com
 * 
 * To the extent possible under law, the author(s) have dedicated all copyright and related and neighboring rights to this software to the public domain worldwide. This software is distributed without any warranty.
 * You should have received a copy of the CC0 Public Domain Dedication along with this software. If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.
 * 
 * Please Note - The scope of CC0 Public Domain Dedication extends to Broadleaf Commerce React Starter demo application alone. Linked libraries (including all Broadleaf Commerce Framework libraries) are subject to their respective licenses, including the requirements and restrictions specified therein.
 * #L%
 */
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
