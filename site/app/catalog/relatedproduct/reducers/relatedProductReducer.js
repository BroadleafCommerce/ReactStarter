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
