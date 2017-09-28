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
import { combineReducers } from 'redux'
import merge from 'lodash/merge'
import auth from 'auth/reducers'
import { locale, messagePortal } from 'layout/reducers'
import preview from 'preview/reducers'
import csr from 'csr/reducers'
import { customer, customerAddresses, customerPayments, orderHistory, wishlist } from 'account/reducers'
import { cart, miniCart } from 'cart/reducers'
import { fulfillment, storedPayment } from 'checkout/reducers'
import menu from 'menu/reducers'
import search from 'catalog/search/reducers'
import typeAhead from 'catalog/typeahead/reducers'
import {productByKey as product, configureItem, ratingSummaryByProduct} from 'catalog/product/reducers'
import breadcrumbs from 'catalog/breadcrumbs/reducers'
import page from 'page/common/reducers'
import theme from 'theme/reducers'
import seo from 'seo/reducers'
import contentItemsByZone from 'content/reducers'
import { relatedProductsByCategory, relatedProductsByProduct } from 'catalog/relatedproduct/reducers'
import { reducer } from 'redux-form'

const entities = (state = {}, action) => {
    if (action.payload && action.payload.entities) {
        return merge({}, state, action.payload.entities)
    }

    return state
}

const rootReducer = combineReducers({
    auth,
    locale,
    preview,
    csr,
    cart,
    customer,
    customerAddresses,
    customerPayments,
    wishlist,
    miniCart,
    fulfillment,
    storedPayment,
    orderHistory,
    entities,
    menu,
    search,
    typeAhead,
    product,
    breadcrumbs,
    configureItem,
    page,
    theme,
    seo,
    contentItemsByZone,
    ratingSummaryByProduct,
    relatedProductsByCategory,
    relatedProductsByProduct,
    messagePortal,
    form: reducer,
})

export default rootReducer
