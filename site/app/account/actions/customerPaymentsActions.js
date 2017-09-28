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
import { createFetchAction } from 'core/util/refetch'
import request from 'core/util/superagent'
import findIndex from 'lodash/findIndex'

export const fetchCustomerPayments = createFetchAction('customerPayments', () => request.get('/api/customer/payments'))

export const addCustomerPayment = createFetchAction(
    'customerPayments',
    ({customerPayment, nonce}) => request.post('/api/customer/customer-payment').send(customerPayment).query({ payment_method_nonce: nonce })
)

export const updateCustomerPayment = createFetchAction(
    'customerPayments',
    ({customerPayment, nonce}) => request.put(`/api/customer/customer-payment/${customerPayment.id}`).send(customerPayment).query({ payment_method_nonce: nonce })
)

export const removeCustomerPayment = createFetchAction(
    'customerPayments',
    id => request.del(`/api/customer/payment/${id}`)
)

export const makePaymentDefault = createFetchAction(
    'customerPayments',
    id => request.post(`/api/customer/customer-payment/${id}/default`)
)
