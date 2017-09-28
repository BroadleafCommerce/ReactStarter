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
import isEmpty from 'lodash/isEmpty'
import debounce from 'lodash/debounce'
import { isCsrMode } from 'csr/selectors'

export const CartActionTypes = {
    Accept : '@Cart.Accept',
    Fetch : {
        Request : '@Cart.Fetch.Request',
        Success : '@Cart.Fetch.Success',
        Failure : '@Cart.Fetch.Failure',
    },
    Add : {
        Request : '@Cart.Add.Request',
        Success : '@Cart.Add.Success',
        Failure : '@Cart.Add.Failure',
    },
    Remove : {
        Request : '@Cart.Remove.Request',
        Success : '@Cart.Remove.Success',
        Failure : '@Cart.Remove.Failure',
    },
    Update : {
        Request : '@Cart.Update.Request',
        Success : '@Cart.Update.Success',
        Failure : '@Cart.Update.Failure',
    },
    SaveEmail : {
        Request : '@Cart.SaveEmail.Request',
        Success : '@Cart.SaveEmail.Success',
        Failure : '@Cart.SaveEmail.Failure',
    },
    Invalidate : '@Cart.Invalidate',
    AddPromo : {
        Request : '@Cart.AddPromo.Request',
        Success : '@Cart.AddPromo.Success',
        Failure : '@Cart.AddPromo.Failure',
    },
    RemovePromo : {
        Request : '@Cart.RemovePromo.Request',
        Success : '@Cart.RemovePromo.Success',
        Failure : '@Cart.RemovePromo.Failure',
    },
    MiniCart: {
        Show: '@MiniCart.Show',
        Hide: '@MiniCart.Hide',
    }
}

export const acceptCart = cart => ({
    type: CartActionTypes.Accept,
    payload: {
        cart,
        receivedAt: Date.now()
    }
})

const CACHE_EXPIRATION = 60*1000

export const fetchExistingCart = (ignoreCache = false) => fetchCart(ignoreCache, true)

export const fetchCart = (ignoreCache = false, onlyIfExists = false) => (dispatch, getState) => {
    const { auth, cart } = getState()

    if (auth.isFetching) {
        return Promise.resolve()
    }

    if (cart.isFetching) {
        return Promise.resolve()
    }

    if (!ignoreCache && !!cart && !!cart.id && cart.lastFetched > Date.now() - CACHE_EXPIRATION) {
        return Promise.resolve()
    }

    return dispatch({
        types : [CartActionTypes.Fetch.Request, CartActionTypes.Fetch.Success, CartActionTypes.Fetch.Failure],
        callAPI : () => request.get('/api/cart').query({ onlyIfExists }),
        transform : response => {
            let result = {}

            if (!isEmpty(response.body)) {
                result = {
                    cart: response.body,
                    receivedAt: Date.now(),
                }

                const xCustomerToken = response.headers['x-customer-token']
                const csrMode = isCsrMode(getState())
                if (csrMode) {
                    let csr = {
                        csrCartId: response.body.id,
                    }

                    if (xCustomerToken) {
                        csr.csrCustomerToken = xCustomerToken
                    }

                    result.csr = csr
                } else {
                    if (xCustomerToken) {
                        result.auth = {
                            anonymousCustomerToken : xCustomerToken
                        }
                    }
                }

            } else {
                return Promise.reject('No cart found')
            }

            return result
        }
    })
}

export const addToCart = (item, isUpdateRequest = false, isConfigurableItem = false) => (dispatch, getState) => {
    if (!getState().cart.id) {
        return dispatch(fetchCart())
        .then(() => dispatch(addToCartDirectly(item, isUpdateRequest, isConfigurableItem)))
    }

    return dispatch(addToCartDirectly(item, isUpdateRequest, isConfigurableItem))
}

const addToCartDirectly = (item, isUpdateRequest = false, isConfigurableItem = false) => (dispatch, getState) => {
    const { cart } = getState()
    const promise = dispatch({
        types : [CartActionTypes.Add.Request, CartActionTypes.Add.Success, CartActionTypes.Add.Failure],
        payload : {},
        callAPI : () =>
            request.post(`/api/cart/${cart.id}/${!isConfigurableItem ? 'item' : 'configure-item'}`)
                .query({ isUpdateRequest })
                .send(item),
        transform : response => {
            if (!isEmpty(response.body)) {
                return {
                    cart : response.body,
                    receivedAt: Date.now(),
                }
            }
        }
    })

    return promise.then(action => {
        if (action.type === CartActionTypes.Add.Success) {
            dispatch(flashMiniCart())
        }

        return promise
    })
}

export const removeFromCart = id => (dispatch, getState) => {
    if (!getState().cart.id) {
        return dispatch(fetchCart())
        .then(() => dispatch(removeFromCartDirectly(id)))
    }

    return dispatch(removeFromCartDirectly(id))
}

const removeFromCartDirectly = id => (dispatch, getState) => {
    const { cart } = getState()
    return dispatch({
        types : [CartActionTypes.Remove.Request, CartActionTypes.Remove.Success, CartActionTypes.Remove.Failure],
        payload : {},
        callAPI : () =>
            request.del(`/api/cart/${cart.id}/items/${id}`),
        transform : response => {
            if (!isEmpty(response.body)) {
                return {
                    cart : response.body,
                    receivedAt: Date.now(),
                }
            }
        }
    })
}

export const updateQuantity = (id, quantity) => (dispatch, getState) => {
    if (!getState().cart.id) {
        return dispatch(fetchCart())
        .then(() => dispatch(updateQuantityDirectly(id, quantity)))
    }

    return dispatch(updateQuantityDirectly(id, quantity))
}

const updateQuantityDirectly = (id, quantity) => (dispatch, getState) => {
    const { cart } = getState()
    return dispatch({
        types : [CartActionTypes.Update.Request, CartActionTypes.Update.Success, CartActionTypes.Update.Failure],
        payload : {},
        callAPI : () =>
            request.put(`/api/cart/${cart.id}/items/${id}`)
                .query({ quantity }),
        transform : response => {
            if (!isEmpty(response.body)) {
                return {
                    cart : response.body,
                    receivedAt: Date.now(),
                }
            }
        }
    })
}

export const addPromo = promoCode => (dispatch, getState) => {
    const { cart } = getState()
    return dispatch({
        types : [CartActionTypes.AddPromo.Request, CartActionTypes.AddPromo.Success, CartActionTypes.AddPromo.Failure],
        payload : { promoCode },
        callAPI : () =>
            request.post(`/api/cart/${cart.id}/offer/${promoCode}`),
        transform : response => {
            if (!isEmpty(response.body)) {
                return {
                    cart : response.body,
                    receivedAt: Date.now(),
                }
            }
        }
    })
}

export const removePromo = promoCode => (dispatch, getState) => {
    const { cart } = getState()
    return dispatch({
        types : [CartActionTypes.RemovePromo.Request, CartActionTypes.RemovePromo.Success, CartActionTypes.RemovePromo.Failure],
        payload : { promoCode },
        callAPI : () =>
            request.del(`/api/cart/${cart.id}/offer/${promoCode}`),
        transform : response => {
            if (!isEmpty(response.body)) {
                return {
                    cart : response.body,
                    receivedAt: Date.now(),
                }
            }
        }
    })
}

export const saveEmailForCart = (emailAddress) => (dispatch, getState) => {
    if (!getState().cart.id) {
        return dispatch(fetchCart())
        .then(() => dispatch(saveEmailForCartDirectly(emailAddress)))
    }

    return dispatch(saveEmailForCartDirectly(emailAddress))
}

const saveEmailForCartDirectly = (emailAddress) => (dispatch, getState) => {
    const { cart } = getState()
    return dispatch({
        types : [CartActionTypes.SaveEmail.Request, CartActionTypes.SaveEmail.Success, CartActionTypes.SaveEmail.Failure],
        payload : {},
        callAPI : () =>
            request.post(`/api/cart/${cart.id}/email`)
                .query({ emailAddress }),
        transform : response => {
            if (!isEmpty(response.body)) {
                return {
                    cart : response.body,
                    receivedAt: Date.now(),
                }
            }
        }
    })
}

export const invalidateCart = () => dispatch => {
    dispatch({
        type : CartActionTypes.Invalidate,
    })
    return Promise.resolve()
}

export const toggleMiniCart = visible => {
    // cancel any hiding that is supposed to be triggered
    debounceHide.cancel()
    return {
        type: visible ? CartActionTypes.MiniCart.Show : CartActionTypes.MiniCart.Hide
    }
}

const debounceHide = debounce(dispatch => dispatch(toggleMiniCart(false)), 3000)

export const flashMiniCart = () => dispatch => {
    dispatch(toggleMiniCart(true))
    debounceHide(dispatch)
}
