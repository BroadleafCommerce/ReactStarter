import { createSelector } from 'reselect'
import { isCrossAppAuthenticated } from 'auth/selectors'

export const isCsrMode = createSelector(
    [
        isCrossAppAuthenticated,
        state => state.csr.csrCustomerToken,
    ],
    (crossAppAuthenticated, csrCustomerToken) => {
        if (!crossAppAuthenticated) {
            return false
        }

        return !!csrCustomerToken
    }
)

export const getCsrCartId = createSelector(
    [
        isCsrMode,
        state => state.csr.csrCartId
    ],
    (csrMode, csrCartId) => {
        if (!csrMode) {
            return undefined
        }

        return csrCartId
    }
)

export const isCartLocked = createSelector(
    [
        state => state.csr.isLockingCart,
        state => state.cart.status,
    ],
    (isLockingCart, status) => {
        if (isLockingCart) {
            return false
        }

        return status === 'CSR_OWNED'
    }
)
