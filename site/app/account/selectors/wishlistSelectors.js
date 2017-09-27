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
