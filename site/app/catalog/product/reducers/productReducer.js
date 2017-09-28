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
import {ProductActionTypes} from 'catalog/product/actions'
import reduce from 'lodash/reduce'
import map from 'lodash/map'

const product = (state = {
    isFetching : false,
    id : undefined,
    lastFetched : undefined,
}, action) => {
    switch(action.type) {
        case ProductActionTypes.Get.Request:
        return {
            ...state,
            isFetching : true,
        }
        case ProductActionTypes.Get.Success:
        return {
            ...state,
            id : action.payload.result,
            isFetching : false,
            lastFetched : action.payload.receivedAt,
        }
        case ProductActionTypes.Get.Failure:
        return {
            ...state,
            isFetching : false,
        }
        default:
        return state
    }
}

export const productByKey = (state = {}, action) => {
    switch(action.type) {
        case ProductActionTypes.Get.Request:
        case ProductActionTypes.Get.Success:
        case ProductActionTypes.Get.Failure:
        return {
            ...state,
            [action.payload.key] : product(state[action.payload.key], action)
        }
        case ProductActionTypes.BatchGet.Success:
        const { products } = action.payload.entities
        const actions = map(products, product => ({
            type: ProductActionTypes.Get.Success,
            payload: {
                key: product.url.slice(1),
                result: product.id,
                lastFetched: action.payload.receivedAt
            }
        }))

        return reduce(actions, productByKey, state)
        default:
        return state
    }
}

const initialConfigureItemState = {
    configureItemRequest: undefined,
    isFetchingItem: false,
    productId: undefined,
    orderItemId: undefined,
}

const configureItemById = (state = initialConfigureItemState, action) => {
    switch(action.type) {
        case ProductActionTypes.ConfigureItem.Request:
        return {
            ...state,
            isFetchingItem : true,
        }
        case ProductActionTypes.ConfigureItem.Success:
        return {
            ...state,
            productId: action.payload.productId,
            orderItemId: action.payload.orderItemId,
            configureItemRequest : action.payload.configureItemRequest,
            isFetchingItem : false,
            lastFetched : action.payload.receivedAt,
        }
        case ProductActionTypes.ConfigureItem.Failure:
        return {
            ...state,
            isFetchingItem : false,
        }
        default:
        return state
    }
}

export const configureItem = (state = {}, action) => {
    switch(action.type) {
        case ProductActionTypes.ConfigureItem.Request:
        case ProductActionTypes.ConfigureItem.Success:
        case ProductActionTypes.ConfigureItem.Failure:
        return {
            ...state,
            [action.payload.productId] : configureItemById(state[action.payload.productId], action)
        }
        case ProductActionTypes.ConfigureItem.Clear:
        return {
            ...state,
            [action.payload.productId]: undefined
        }
        default:
        return state
    }
}
