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
import { RelatedProductActionTypes } from 'catalog/relatedproduct/actions'

const relatedProducts = (state = {
    isFetching: false,
    productIds: [],
    lastFetched: undefined,
}, action) => {
    switch(action.type) {
        case RelatedProductActionTypes.Request:
        return {
            ...state,
            isFetching: true,
            quantity: action.payload.quantity,
            type: action.payload.type,
        }
        case RelatedProductActionTypes.Success:
        return {
            ...state,
            isFetching: false,
            lastFetched: action.payload.receivedAt,
            quantity: action.payload.quantity,
            type: action.payload.type,
            productIds: Array.isArray(action.payload.result) ? action.payload.result : action.payload.result,
        }
        case RelatedProductActionTypes.Failure:
        return {
            ...state,
            isFetching: false,
        }
        default:
        return state
    }
}

export const relatedProductsByCategory = (state = {}, action) => {
    switch(action.type) {
        case RelatedProductActionTypes.Request:
        case RelatedProductActionTypes.Success:
        case RelatedProductActionTypes.Failure:
        if (!action.payload.categoryKey) {
            return state
        }
        return {
            ...state,
            [action.payload.categoryKey]: relatedProducts(state[action.payload.categoryKey], action)
        }
        default:
        return state
    }
}

export const relatedProductsByProduct = (state = {}, action) => {
    switch(action.type) {
        case RelatedProductActionTypes.Request:
        case RelatedProductActionTypes.Success:
        case RelatedProductActionTypes.Failure:
        if (!action.payload.productKey) {
            return state
        }
        return {
            ...state,
            [action.payload.productKey]: relatedProducts(state[action.payload.productKey], action)
        }
        default:
        return state
    }
}
