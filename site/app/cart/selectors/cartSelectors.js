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
import find from 'lodash/find'

export const getCustomer = createSelector(
    state => state.cart,
    cart => {
        if (!cart || !cart.customer) {
            return undefined
        }

        return cart.customer
    }
)

export const getItemCount = createSelector(
    state => state.cart,
    cart => {
        if (!cart) {
            return 0
        }

        return cart.itemCount
    }
)

export const isFetchingCart = createSelector(
    state => state.cart.isFetching,
    result => result
)

export const getCart = createSelector(
    state => state.cart,
    state => state.entities.products,
    (cart, products) => {
        if (!cart) {
            return undefined
        }

        if (cart.orderItem && products) {
            return {
                ...cart,
                orderItem: cart.orderItem.map(orderItem => {
                    if (orderItem.parentOrderItemId) {
                        return orderItem
                    }

                    return {
                        ...orderItem,
                        product: products[orderItem.productId]
                    }
                })
            }
        }

        return cart
    }
)

export const inCart = createSelector(
    state => state.cart && state.cart.orderItem,
    (_, props) => props.id,
    (orderItem, productId) => {
        if (!orderItem || !productId) {
            return undefined
        }

        return !!find(orderItem.filter(o => !o.parentOrderItemId), { productId, orderItemAttribute: null })
    }
)

export const getOrderItemFromLocationState = createSelector(
    state => state.cart && state.cart.orderItem,
    (_, props) => props.location && props.location.state && props.location.state.orderItemId,
    (orderItem, orderItemId) => {
        if (!orderItemId || !orderItem) {
            return undefined
        }

        return find(orderItem.filter(o => !o.parentOrderItemId), { id: orderItemId })
    }
)
