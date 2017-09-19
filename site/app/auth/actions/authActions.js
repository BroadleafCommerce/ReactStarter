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
import request from 'core/util/superagent'
import Cookies from 'js-cookie'

export const AuthActionTypes = {
    Login : {
        Request : '@Auth.Login.Request',
        Success : '@Auth.Login.Success',
        Failure : '@Auth.Login.Failure',
    },
    Register : {
        Request : '@Auth.Register.Request',
        Success : '@Auth.Register.Success',
        Failure : '@Auth.Register.Failure',
    },
    Logout : '@Auth.Logout',
    AcceptToken: '@Auth.AcceptToken',
}

export const handleLogin = (username, password) => (dispatch, getState) => dispatch({
    types : [AuthActionTypes.Login.Request,AuthActionTypes.Login.Success,AuthActionTypes.Login.Failure],
    payload : {},
    options : { includeAuthentication: false, includeSandboxId: false },
    callAPI : () =>
        request.post('/api/login')
            .send({username, password}),
    transform : response => {
        if (response.headers.authorization) {
            Cookies.remove('preview_currentSandboxId', {path: '/'})
            Cookies.remove('auth_anonymousCustomerToken', {path: '/'})
            return {
                authenticationToken : response.headers.authorization,
                lastAuthenticated: Date.now(),
            }
        }
    }
})

export const handleLogout = () => dispatch => {
    Cookies.remove('auth_authenticationToken', {path: '/'})
    Cookies.remove('auth_anonymousCustomerToken', {path: '/'})
    dispatch(createLogoutAction())

    return Promise.resolve()
}

export const createLogoutAction = () => ({
    type : AuthActionTypes.Logout,
})

export const handleRegister = form => (dispatch, getState) => dispatch({
    types : [AuthActionTypes.Register.Request,AuthActionTypes.Register.Success,AuthActionTypes.Register.Failure],
    payload : {},
    options : { includeAuthentication: false, includeSandboxId: false },
    callAPI : () =>
        request.post('/api/register')
            .send(form),
    transform : response => {
        if (response.headers.authorization) {
            Cookies.remove('preview_currentSandboxId', {path: '/'})
            Cookies.remove('auth_anonymousCustomerToken', {path: '/'})
            return {
                authenticationToken : response.headers.authorization,
                lastAuthenticated: Date.now(),
            }
        }
    }
})

export const createAcceptTokenAction = authenticationToken => ({
    type: AuthActionTypes.AcceptToken,
    payload: {
        authenticationToken,
        lastAuthenticated: Date.now()
    }
})
