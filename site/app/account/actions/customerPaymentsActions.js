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
