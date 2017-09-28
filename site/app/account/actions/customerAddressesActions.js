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
