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
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { resolve } from 'core/decorator/reduxResolve'
import { reset as resetReduxForm } from 'redux-form'
import { withScrollOnUpdate } from 'core/components/ScrollToTop'
import { addItemToWishlist } from 'account/actions'
import { fetchProduct } from 'catalog/product/actions'
import { addToCart } from 'cart/actions'
import { fetchSeoProperties } from 'seo/actions'
import { inCart, isFetchingCart, getOrderItemFromLocationState } from 'cart/selectors'
import { getProductForView } from 'catalog/product/selectors'
import { getProductSeoProperties } from 'seo/selectors'
import { Redirect } from 'react-router-dom'
import ProductView from './ProductView'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import map from 'lodash/map'
import merge from 'lodash/merge'
import flatMap from 'lodash/flatMap'
import reduce from 'lodash/reduce'
import set from 'lodash/set'
import union from 'lodash/union'
import classNames from 'classnames'

@withScrollOnUpdate
class Product extends Component {

    componentWillReceiveProps(nextProps) {
        const { match: oldMatch, location: oldLocation } = this.props
        const { match: newMatch, location: newLocation } = nextProps

        // if the url has changed, we are viewing a new product and should fetch the data
        if (oldMatch.url !== newMatch.url) {
            fetchData(nextProps)
        }
    }

    _isUpdateRequest = () => {
        const { location, orderItemBeingUpdated } = this.props
        return !!location.state && !!location.state.orderItemId && !!orderItemBeingUpdated
    }

    _getOrderItemId = props => props.location && props.location.state && props.location.state.orderItemId || undefined

    _getInitialFormValues = () => {
        // only worry about initial form values if this is an update
        if (this._isUpdateRequest()){
            return this._getInitialFormValuesForProduct()
        }

        return undefined
    }

    _getInitialFormValuesForProduct = () => {
        const { orderItemBeingUpdated } = this.props

        return {
            id: orderItemBeingUpdated.id,
            quantity: orderItemBeingUpdated.quantity,
            itemAttributes: reduce(orderItemBeingUpdated.orderItemAttribute, (result, attr) => {
                return {
                    ...result,
                    [attr.name]: attr.value
                }
            }, {})
        }
    }

    _handleAddToCartSubmit = form => {
        const { addItemToWishlist, addToCart, id } = this.props
        const isUpdateRequest = this._isUpdateRequest()
        const isWishlistAdd = form.isWishlistAdd
        const request = {
            productId: id,
            id: form.id,
            quantity: form.quantity,
            orderItemAttribute: map(form.itemAttributes, (value, name) => ({ name, value }))
        }

        if (!isWishlistAdd) {
            addToCart(request, isUpdateRequest)
            .then(
                action => {
                    if (!action.payload.error) {
                        this.props.resetReduxForm('product')

                        if (isUpdateRequest) {
                            this.props.history.push(this.props.location.state.from || '/cart')
                        }
                    }
                }
            )
        } else {
            addItemToWishlist(request, isUpdateRequest)
            .then(
                action => {
                    if (!action.payload.error) {
                        this.props.resetReduxForm('product')

                        if (isUpdateRequest) {
                            this.props.history.push(this.props.location.state.from || '/account/wishlist')
                        }
                    }
                }
            )
        }
    }

    _getAddToCartButtonText = () => {
        const { defaultSku, inCart } = this.props
        const disabled = !defaultSku.available || (inCart && !this._isUpdateRequest())

        let message = 'Add To Cart'
        if (this._isUpdateRequest()) {
            message = 'Update'
        } else if (inCart) {
            message = 'In Cart'
        } else if (!defaultSku.available) {
            message = 'Out of Stock'
        }

        return message
    }

    render() {
        const { active, defaultSku, id, inCart, isFetching } = this.props

        // if the Product is inactive and we are not currently fetching, redirect to home page
        if (!active && !isFetching) {
            return (<Redirect push to='/'/>)
        } else if (id === undefined && isFetching) {
            //TODO: this is where we would render a placeholder page
            return (<div>Placeholder Product Page</div>)
        }

        const disabled = !defaultSku.available || (inCart && !this._isUpdateRequest())

        return (
            <ProductView
                addToCartText={this._getAddToCartButtonText()}
                disabled={disabled}
                handleAddToCartSubmit={this._handleAddToCartSubmit}
                id={this.props.id}
                initialFormValues={this._getInitialFormValues()}
                longDescription={this.props.longDescription}
                manufacturer={this.props.manufacturer}
                match={this.props.match}
                media={this.props.media}
                name={this.props.name}
                primaryMedia={this.props.primaryMedia}
                productOption={this.props.productOption}
                promotionMessages={this.props.promotionMessages}
                retailPrice={this.props.retailPrice}
                salePrice={this.props.salePrice}
                seoProperties={this.props.seoProperties}
            />
        )
    }
}

const mapStateToProps = (state, props) => {
    const product = getProductForView(state, props)

    return {
        ...product,
        inCart: inCart(state, product),
        fetchingCart: isFetchingCart(state),
        orderItemBeingUpdated: getOrderItemFromLocationState(state, props),
        seoProperties: getProductSeoProperties(state, props)
    }
}

// action creators
const mapDispatchToProps = {
    addItemToWishlist,
    addToCart,
    fetchProduct,
    fetchSeoProperties,
    resetReduxForm
}

const fetchData = props => {
    const params = props.match.params
    return Promise.all([
        props.fetchProduct(`${params.category}/${params.product}`),
        props.fetchSeoProperties({ entityType: 'PRODUCT', entityURI: `/${params.category}/${params.product}` })
    ])
}

const resolveData = (resolver, props) => {
    resolver.resolve(() => fetchData(props))
}

export default connect(mapStateToProps, mapDispatchToProps)(resolve(resolveData)(Product))
