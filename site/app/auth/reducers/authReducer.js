/*
 * #%L
 * React Site Starter
 * %%
 * Copyright (C) 2009 - 2017 Broadleaf Commerce
 * %%
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *       http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
