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
