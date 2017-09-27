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
