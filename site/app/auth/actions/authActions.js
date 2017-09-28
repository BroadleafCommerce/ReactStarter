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
