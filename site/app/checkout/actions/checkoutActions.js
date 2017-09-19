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
