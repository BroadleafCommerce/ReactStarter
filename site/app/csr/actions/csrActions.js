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
import Cookies from 'js-cookie'
import request from 'core/util/superagent'
import { handleLogout } from 'auth/actions'
import { acceptCart, invalidateCart } from 'cart/actions'

export const CsrActionTypes = {
    ExitCsrMode: '@Csr.ExitCsrMode',
    LockCart: {
        Request: '@Csr.LockCart.Request',
        Success: '@Csr.LockCart.Success',
        Failure: '@Csr.LockCart.Failure',
    },
    UnlockCart: {
        Request: '@Csr.UnlockCart.Request',
        Success: '@Csr.UnlockCart.Success',
        Failure: '@Csr.UnlockCart.Failure',
    },
    TransferCart: {
        Request: '@Csr.TransferCart.Request',
        Success: '@Csr.TransferCart.Success',
        Failure: '@Csr.TransferCart.Failure',
    },
    FetchReasonCodes: {
        Request: '@Csr.FetchReasonCodes.Request',
        Success: '@Csr.FetchReasonCodes.Success',
        Failure: '@Csr.FetchReasonCodes.Failure',
    },
    OverrideItemPrice: {
        Request: '@Csr.OverrideItemPrice.Request',
        Success: '@Csr.OverrideItemPrice.Success',
        Failure: '@Csr.OverrideItemPrice.Failure',
    },
    ClearOverrideItemPrice: {
        Request: '@Csr.ClearOverrideItemPrice.Request',
        Success: '@Csr.ClearOverrideItemPrice.Success',
        Failure: '@Csr.ClearOverrideItemPrice.Failure',
    }
}

export const exitCsrMode = () => (dispatch, getState) => {
    Cookies.remove('csr_csrCustomerToken', {path: '/'})
    Cookies.remove('csr_csrCartId', {path: '/'})
    Cookies.remove('auth_isCrossApp', {path: '/'})
    dispatch(handleLogout())
    dispatch(invalidateCart())
    dispatch({ type: CsrActionTypes.ExitCsrMode })
    return Promise.resolve()
}

export const lockCart = csrCartId => dispatch => {
    const lockPromise = dispatch({
        types: [ CsrActionTypes.LockCart.Request, CsrActionTypes.LockCart.Success, CsrActionTypes.LockCart.Failure ],
        callAPI: () => request.get(`/api/csrtools/lock-cart/${csrCartId}`),
        transform: response => {
            if (response.body) {
                return {
                    cart: response.body,
                }
            }
        }
    })

    return lockPromise.then(action => {
        if (action.payload.cart) {
            dispatch(acceptCart(action.payload.cart))
        }
    })
}

export const unlockCart = csrCartId => dispatch => {
    const unlockPromise = dispatch({
        types: [ CsrActionTypes.UnlockCart.Request, CsrActionTypes.UnlockCart.Success, CsrActionTypes.UnlockCart.Failure ],
        callAPI: () => request.get(`/api/csrtools/unlock-cart/${csrCartId}`),
        transform: response => {
            if (response.body) {
                return {
                    cart: response.body,
                }
            }
        }
    })

    return unlockPromise.then(action => {
        if (action.payload.cart) {
            dispatch(acceptCart(action.payload.cart))
        }
        return action
    })
}

export const fetchReasonCodes = () => ({
    types: [ CsrActionTypes.FetchReasonCodes.Request, CsrActionTypes.FetchReasonCodes.Success, CsrActionTypes.FetchReasonCodes.Failure ],
    callAPI: () => request.post(`/api/csrtools/csr-override-reason-codes`),
    transform: response => {
        if (response.body) {
            return {
                reasonCodes: response.body,
            }
        }
    }
})

export const overrideItemPrice = (orderItemId, overridePrice, reasonCode, message) => dispatch => {
    const overrideItemPricePromise = dispatch({
        types: [ CsrActionTypes.OverrideItemPrice.Request, CsrActionTypes.OverrideItemPrice.Success, CsrActionTypes.OverrideItemPrice.Failure ],
        callAPI: () => request.post(`/api/csrtools/override-item-price/${orderItemId}`)
                              .query({ overridePrice, reasonCode, message }),
        transform: response => {
            if (response.body) {
                return {
                    cart: response.body,
                }
            }
        }
    })

    return overrideItemPricePromise.then(action => {
        if (action.payload.cart) {
            dispatch(acceptCart(action.payload.cart))
        }
        return action
    })
}

export const clearOverrideItemPrice = (orderItemId) => dispatch => {
    const clearOverrideItemPricePromise = dispatch({
        types: [ CsrActionTypes.ClearOverrideItemPrice.Request, CsrActionTypes.ClearOverrideItemPrice.Success, CsrActionTypes.ClearOverrideItemPrice.Failure ],
        callAPI: () => request.post(`/api/csrtools/clear-item-price-override/${orderItemId}`),
        transform: response => {
            if (response.body) {
                return {
                    cart: response.body,
                }
            }
        }
    })

    return clearOverrideItemPricePromise.then(action => {
        if (action.payload.cart) {
            dispatch(acceptCart(action.payload.cart))
        }
        return action
    })
}

export const transferCart = (csrCartId, emailAddress) => dispatch => {
    const transferCartPromise = dispatch({
        types: [ CsrActionTypes.TransferCart.Request, CsrActionTypes.TransferCart.Success, CsrActionTypes.TransferCart.Failure ],
        callAPI: () => request.post(`/api/csrtools/transfer-anonymous-cart/${csrCartId}`).query({ emailAddress }),
        transform: response => {
            if (response.body) {
                return {
                    cart: response.body,
                }
            }
        }
    })

    return transferCartPromise.then(action => {
        if (!action.payload.error && action.payload.cart.status === 'IN_PROCESS') {
            dispatch(exitCsrMode())
        } else {
            dispatch(acceptCart(action.payload.cart))
        }
        return action
    })
}
