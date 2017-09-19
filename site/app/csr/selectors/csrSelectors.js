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
