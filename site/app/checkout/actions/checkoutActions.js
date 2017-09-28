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

export const CheckoutActionTypes = {
    SaveBilling : {
        Request: '@Checkout.SaveBilling.Request',
        Success: '@Checkout.SaveBilling.Success',
        Failure: '@Checkout.SaveBilling.Failure',
    },
    SaveNewCustomerPayment : {
        Request: '@Checkout.SaveNewCustomerPayment.Request',
        Success: '@Checkout.SaveNewCustomerPayment.Success',
        Failure: '@Checkout.SaveNewCustomerPayment.Failure',
    },
    SelectExistingCustomerPayment : {
        Request: '@Checkout.SelectExistingCustomerPayment.Request',
        Success: '@Checkout.SelectExistingCustomerPayment.Success',
        Failure: '@Checkout.SelectExistingCustomerPayment.Failure',
    },
    RemovePayment : {
        Request: '@Checkout.RemovePayment.Request',
        Success: '@Checkout.RemovePayment.Success',
        Failure: '@Checkout.RemovePayment.Failure',
    },
    SaveFulfillment : {
        Request: '@Checkout.SaveFulfillment.Request',
        Success: '@Checkout.SaveFulfillment.Success',
        Failure: '@Checkout.SaveFulfillment.Failure',
    }
}

export const removeExistingPayment = paymentId => (dispatch, getState) => {
    const { cart } = getState()
    return dispatch({
        types : [CheckoutActionTypes.RemovePayment.Request, CheckoutActionTypes.RemovePayment.Success, CheckoutActionTypes.RemovePayment.Failure],
        payload : {},
        callAPI : () =>
            request.del(`/api/cart/checkout/payment/${paymentId}`)
                .query({ cartId: cart.id }),
        transform : response => {
            if (response.body) {
                return {
                    cart: response.body,
                    receivedAt: Date.now(),
                }
            }
        }
    })
}

export const saveBillingAddressForNewPayment = billingAddress => (dispatch, getState) => {
    return dispatch({
        types : [CheckoutActionTypes.SaveBilling.Request, CheckoutActionTypes.SaveBilling.Success, CheckoutActionTypes.SaveBilling.Failure],
        payload : {},
        callAPI : () =>
            request.post(`/api/cart/checkout/billing-address`)
                .send(billingAddress),
        transform : response => {
            if (response.body) {
                return {
                    cart: response.body,
                    receivedAt: Date.now(),
                }
            }
        }
    })
}

export const saveNewCustomerPaymentForOrder = (billingAddress, payment_method_nonce) => (dispatch, getState) => {
    const { cart } = getState()

    return dispatch({
        types : [CheckoutActionTypes.SaveNewCustomerPayment.Request, CheckoutActionTypes.SaveNewCustomerPayment.Success, CheckoutActionTypes.SaveNewCustomerPayment.Failure],
        payload : {},
        callAPI : () =>
            request.post(`/api/cart/checkout/customer-payment`)
                .send(billingAddress)
                .query({ payment_method_nonce }),
        transform : response => {
            if (response.body) {
                return {
                    cart: response.body,
                    receivedAt: Date.now(),
                }
            }
        }
    })
}

export const selectExistingCustomerPaymentForOrder = (customerPaymentId) => (dispatch, getState) => {
    const { cart } = getState()

    return dispatch({
        types : [CheckoutActionTypes.SelectExistingCustomerPayment.Request, CheckoutActionTypes.SelectExistingCustomerPayment.Success, CheckoutActionTypes.SelectExistingCustomerPayment.Failure],
        payload : {},
        callAPI : () =>
            request.put(`/api/cart/checkout/customer-payment/${customerPaymentId}`),
        transform : response => {
            if (response.body) {
                return {
                    cart: response.body,
                    receivedAt: Date.now(),
                }
            }
        }
    })
}

export const saveFulfillmentGroup = fulfillmentGroup => (dispatch, getState) => {
    const { cart } = getState()
    return dispatch({
        types : [CheckoutActionTypes.SaveFulfillment.Request, CheckoutActionTypes.SaveFulfillment.Success, CheckoutActionTypes.SaveFulfillment.Failure],
        payload : {},
        callAPI : () =>
            request.patch(`/api/shipping/${cart.id}/group/${fulfillmentGroup.id}`)
                .send(fulfillmentGroup)
                .query({ priceOrder: true }),
        transform : response => {
            if (response.body) {
                return {
                    cart: {
                        ...cart,
                        fulfillmentGroup: [response.body],
                    },
                    receivedAt: Date.now(),
                }
            }
        }
    })
}
