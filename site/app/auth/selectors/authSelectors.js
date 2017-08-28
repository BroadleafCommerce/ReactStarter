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
