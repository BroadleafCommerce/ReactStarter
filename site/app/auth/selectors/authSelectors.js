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
import { createSelector } from 'reselect'
import isEmpty from 'lodash/isEmpty'

export const isAuthenticated = createSelector(
    state => state.auth.authenticationToken,
    authenticationToken => {
        if (authenticationToken === null || authenticationToken === undefined) {
            return false
        }

        return true
    }
)

export const isCrossAppAuthenticated = createSelector(
    [
        isAuthenticated,
        state => state.auth.isCrossApp,
    ],
    (authenticated, isCrossApp) => {
        // first check if the user is authenticated, if not, we are not cross app authenticated
        if (!authenticated) {
            return false
        }

        return isCrossApp
    }
)

export const isAnonymous = createSelector(
    [
        state => state.cart.customer,
        state => state.auth.anonymousCustomerToken,
        state => state.auth.csrCartId,
        isCrossAppAuthenticated,
        isAuthenticated,
    ],
    (customer, anonymousCustomerToken, csrCartId, crossAppAuthenticated, authenticated) => {
        // if their is no customer, then check the authentication scenarios
        if (isEmpty(customer)) {
            return !(csrCartId || (authenticated && !anonymousCustomerToken && !crossAppAuthenticated))
        }

        // if the customer is not registered, the user must be anonymous
        return !customer.registered
    }
)
