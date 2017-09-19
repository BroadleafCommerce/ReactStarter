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
import { normalize } from 'normalizr'
import request from 'core/util/superagent'
import { productSchema } from 'catalog/product/schema'
import find from 'lodash/find'

export const ProductActionTypes = {
    Get: {
        Request: '@Product.Request',
        Success: '@Product.Success',
        Failure: '@Product.Failure',
    },
    BatchGet: {
        Request: '@Product.Batch.Request',
        Success: '@Product.Batch.Success',
        Failure: '@Product.Batch.Failure',
    },
    ConfigureItem: {
        Request: '@ConfigureItem.Request',
        Success: '@ConfigureItem.Success',
        Failure: '@ConfigureItem.Failure',
        Clear: '@ConfigureItem.Clear'
    }
}

export const fetchProduct = key => (dispatch, getState) => {
    return dispatch({
        types : [ProductActionTypes.Get.Request, ProductActionTypes.Get.Success, ProductActionTypes.Get.Failure],
        payload : {
            key,
        },
        callAPI : () =>
            request.get(`/api/catalog/product/${key}`)
                .query({
                    includePromotionMessages: true,
                }),
        transform : (response) => {
            if (response.body) {
                const {entities, result} = normalize(response.body, productSchema)

                return {
                    entities,
                    result,
                    receivedAt: Date.now()
                }
            }
        },
    })
}

export const fetchProductBatch = ids => (dispatch, getState) => {
    const { entities } = getState()
    const fetchIds = ids  //TODO: Later uncomment when we decide if this optimization is needed and if summary wrapping is gone: .filter(id => !entities.products || !entities.products[id])
    return dispatch({
        types : [ProductActionTypes.BatchGet.Request, ProductActionTypes.BatchGet.Success, ProductActionTypes.BatchGet.Failure],
        payload: { fetchIds },
        callAPI : () =>
            request.get(`/api/catalog/product`)
                .query({
                    includePromotionMessages: false,
                    id: fetchIds,
                }),
        transform : (response) => {
            if (response.body) {
                const {entities, result} = normalize(response.body, [productSchema])

                return {
                    entities,
                    result,
                    receivedAt: Date.now()
                }
            }
        },
    })
}


export const fetchConfigureItem = (productId, orderItemId) => (dispatch, getState) => {
    const { cart } = getState()

    // first check if the order item is in cart, if it is, do a reconfigureItem
    if (isOrderItemInCart(cart, orderItemId)) {
        return dispatch(fetchReconfigureItem(productId, orderItemId))
    }

    return dispatch({
        types : [ ProductActionTypes.ConfigureItem.Request, ProductActionTypes.ConfigureItem.Success, ProductActionTypes.ConfigureItem.Failure ],
        payload: { productId },
        callAPI: () => request.get(`/api/cart/configure/${productId}`),
        transform: response => {
            if (response.body) {
                return {
                    productId,
                    configureItemRequest: response.body,
                    receivedAt: Date.now(),
                }
            }
        }
    })
}

export const fetchReconfigureItem = (productId, orderItemId) => ({
    types : [ ProductActionTypes.ConfigureItem.Request, ProductActionTypes.ConfigureItem.Success, ProductActionTypes.ConfigureItem.Failure ],
    payload: { productId },
    callAPI: () => request.get(`/api/cart/reconfigure/${orderItemId}`),
    transform: response => {
        if (response.body) {
            return {
                orderItemId,
                productId,
                configureItemRequest: response.body,
                receivedAt: Date.now(),
            }
        }
    }
})

const isOrderItemInCart = (cart, orderItemId) => {
    return cart && cart.orderItem && orderItemId && find(cart.orderItem, { id: orderItemId })
}

export const clearConfigureItem = productId => ({
    type: ProductActionTypes.ConfigureItem.Clear,
    payload: { productId }
})
