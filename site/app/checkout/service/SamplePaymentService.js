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

const SamplePaymentService = {

    Type: {
        CreditCard: 'CreditCard',
        CollectOnDelivery: 'COD',
        PayPal: 'PayPal'
    },

    cardType: storedPayment => {
        return 'VISA'
    },

    lastFour: storedPayment => {
        return storedPayment.creditCardNumber.substr(storedPayment.creditCardNumber.length - 4)
    },

    expDate: storedPayment => {
        return storedPayment.creditCardExpDate
    },

    /**
     * This is where you would tokenize the card data gathered from the paymentForm.
     *
     * @param  {Object} paymentForm
     * @return {Promise}
     */
    tokenizeCard: (paymentForm) => {
        if (isEmpty(paymentForm)) {
            return Promise.resolve(null)
        }

        // Use constant value regardless of form data so that we do not potentially save a legitimate credit card
        const nonce = '4111111111111111|Hotsauce Connoisseur|01/99|123'
        return Promise.resolve(nonce)
    },

    /**
     * Submits payment form to payment gateway and then adds a transaction to the order.
     *
     * @param  {Object} order       the cart order
     * @param  {Object} paymentForm the payment form
     * @return {Promise}            a Promise
     */
    performCheckout: (orderId, payment_method_nonce, { authenticationToken, customerToken }) => {
        return new Promise((resolve, reject) => {
            request.post('/api/cart/checkout/complete')
                .query({ cartId: orderId, payment_method_nonce: payment_method_nonce || undefined })
                .set('Authorization', authenticationToken || null)
                .set('X-Customer-Token', customerToken || null)
                .end((err, response) => {
                    if (err) {
                        reject(err)
                    }

                    if (response.body) {
                        resolve(response.body)
                    }
                })
        })
    },

    performCodCheckout: (orderId, { authenticationToken, customerToken }) => {
        return new Promise((resolve, reject) => {
            request.post('/api/cart/checkout/cod/complete')
                .query({ cartId: orderId })
                .set('Authorization', authenticationToken || null)
                .set('X-Customer-Token', customerToken || null)
                .end((err, response) => {
                    if (err) {
                        reject(err)
                    }

                    if (response.body) {
                        resolve(response.body)
                    }
                })
        })
    },
}

export default SamplePaymentService
