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
