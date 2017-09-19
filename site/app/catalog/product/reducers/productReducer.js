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
