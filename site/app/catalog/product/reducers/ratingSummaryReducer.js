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
import { RatingSummaryActionTypes } from 'catalog/product/actions'

const ratingSummary = (state = {
    isFetching: false,
    id: undefined,
    lastFetched: undefined
}, action) => {
    switch(action.type) {
        case RatingSummaryActionTypes.Request:
        return {
            ...state,
            isFetching: true
        }
        case RatingSummaryActionTypes.Success:
        return {
            ...state,
            isFetching: false,
            id: action.payload.result,
            lastFetched: action.payload.receivedAt
        }
        case RatingSummaryActionTypes.Failure:
        return {
            ...state,
            isFetching: false,
            error: action.payload.error
        }
        default:
        return state
    }
}

export const ratingSummaryByProduct = (state = {}, action) => {
    switch(action.type) {
        case RatingSummaryActionTypes.Request:
        case RatingSummaryActionTypes.Success:
        case RatingSummaryActionTypes.Failure:
        return {
            ...state,
            [action.payload.productId]: ratingSummary(state[action.payload.productId], action)
        }
        default:
        return state
    }
}
