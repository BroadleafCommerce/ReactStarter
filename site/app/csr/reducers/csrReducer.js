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
import { CsrActionTypes } from 'csr/actions'

export const initialState = {
    clearingItemPriceOverride: false,
    csrCartId: undefined,
    csrCustomerToken: undefined,
    fetchingReasonCodes: false,
    lastFetchedReasonCodes: undefined,
    lockingCart: false,
    overridingItemPrice: false,
    reasonCodes: [],
    unlockingCart: false,
    transferingCart: false,
}

const csr = (state = initialState, action) => {
    switch(action.type) {
        case CsrActionTypes.ExitCsrMode:
        return initialState
        case CsrActionTypes.LockCart.Request:
        return {
            ...state,
            lockingCart: true,
        }
        case CsrActionTypes.LockCart.Success:
        return {
            ...state,
            lockingCart: false,
        }
        case CsrActionTypes.LockCart.Failure:
        return {
            ...state,
            error: action.payload.error,
            lockingCart: false,
        }
        case CsrActionTypes.UnlockCart.Request:
        return {
            ...state,
            unlockingCart: true,
        }
        case CsrActionTypes.UnlockCart.Success:
        return {
            ...state,
            unlockingCart: false,
        }
        case CsrActionTypes.UnlockCart.Failure:
        return {
            ...state,
            error: action.payload.error,
            unlockingCart: false,
        }
        case CsrActionTypes.TransferCart.Request:
        return {
            ...state,
            transferingCart: true,
        }
        case CsrActionTypes.TransferCart.Success:
        return {
            ...state,
            transferingCart: false,
        }
        case CsrActionTypes.TransferCart.Failure:
        return {
            ...state,
            error: action.payload.error,
            transferingCart: false,
        }
        case CsrActionTypes.FetchReasonCodes.Request:
        return {
            ...state,
            fetchingReasonCodes: true,
        }
        case CsrActionTypes.FetchReasonCodes.Success:
        return {
            ...state,
            fetchingReasonCodes: false,
            reasonCodes: action.payload.reasonCodes,
            lastFetchedReasonCodes: action.payload.receivedAt,
        }
        case CsrActionTypes.FetchReasonCodes.Failure:
        return {
            ...state,
            error: action.payload.error,
            fetchingReasonCodes: false,
        }
        case CsrActionTypes.OverrideItemPrice.Request:
        return {
            ...state,
            overridingItemPrice: true,
        }
        case CsrActionTypes.OverrideItemPrice.Success:
        return {
            ...state,
            overridingItemPrice: false,
        }
        case CsrActionTypes.OverrideItemPrice.Failure:
        return {
            ...state,
            error: action.payload.error,
            overridingItemPrice: false,
        }
        case CsrActionTypes.ClearOverrideItemPrice.Request:
        return {
            ...state,
            clearingItemPriceOverride: true,
        }
        case CsrActionTypes.ClearOverrideItemPrice.Success:
        return {
            ...state,
            clearingItemPriceOverride: false,
        }
        case CsrActionTypes.ClearOverrideItemPrice.Failure:
        return {
            ...state,
            error: action.payload.error,
            clearingItemPriceOverride: false,
        }
        default:
        if (action.payload && action.payload.csr) {
            return {
                ...state,
                ...action.payload.csr,
            }
        }
        return state
    }
}

export default csr
