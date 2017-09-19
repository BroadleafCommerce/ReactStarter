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
import isEmpty from 'lodash/isEmpty'

export const getWishlist = createSelector(
    state => state.wishlist.wishlist,
    state => state.entities.products,
    (wishlist, products) => {
        if (!wishlist) {
            return {}
        }

        if (wishlist.orderItem && products) {
            return {
                ...wishlist,
                orderItem: wishlist.orderItem.map(orderItem => {
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

        return wishlist
    }
)

export const getWishlistItems = createSelector(
    state => state.wishlist.wishlist,
    wishlist => wishlist && wishlist.orderItem
)

export const itemInWishlist = createSelector(
    getWishlistItems,
    (_, props) => props.id,
    (wishlistItems, productId) => {
        if (isEmpty(wishlistItems) || !productId) {
            return false
        }

        return find(wishlistItems, { productId })
    }
)
