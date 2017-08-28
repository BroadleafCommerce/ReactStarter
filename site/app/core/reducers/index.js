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
