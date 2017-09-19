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
