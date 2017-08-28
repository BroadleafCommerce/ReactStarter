import { createFetchAction } from 'core/util/refetch'
import request from 'core/util/superagent'
import findIndex from 'lodash/findIndex'

export const fetchCustomerAddresses = createFetchAction('customerAddresses', () => request.get('/api/customer/addresses'))

export const addCustomerAddress = createFetchAction(
    'customerAddresses',
    customerAddress => request.put('/api/customer/address').send(customerAddress),
    (customerAddress, state) =>
        // add this address to the existing set of addresses
        state.customerAddresses.concat(customerAddress)
)

export const updateCustomerAddress = createFetchAction(
    'customerAddresses',
    customerAddress => request.put(`/api/customer/address/${customerAddress.id}`).send(customerAddress),
    (customerAddress, state) =>
        // replace this address in the existing set of addresses
        state.customerAddresses.map(a => a.id === customerAddress.id ? customerAddress : a)
)

export const removeCustomerAddress = createFetchAction(
    'customerAddresses',
    customerAddressId => request.del(`/api/customer/remove-address/${customerAddressId}`)
)
