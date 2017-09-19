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
