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
