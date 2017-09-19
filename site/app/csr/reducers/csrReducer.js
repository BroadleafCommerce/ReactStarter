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
