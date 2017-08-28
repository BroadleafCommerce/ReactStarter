import React, { Component } from 'react'
import { connect } from 'react-redux'
import { resolve } from 'core/decorator/reduxResolve'
import { reset as resetReduxForm } from 'redux-form'
import { withScrollOnUpdate } from 'core/components/ScrollToTop'
import { addItemToWishlist } from 'account/actions'
import { fetchProduct, fetchConfigureItem, clearConfigureItem } from 'catalog/product/actions'
import { addToCart } from 'cart/actions'
import { fetchSeoProperties } from 'seo/actions'
import { inCart, isFetchingCart, getOrderItemFromLocationState } from 'cart/selectors'
import { getProductForView, getConfigureItemRequest, isConfiguringItem, isFetchingConfiguration } from 'catalog/product/selectors'
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
            nextProps.clearConfigureItem(this.props.id)
            fetchData(nextProps)
        }

        // fetch configuration data only when a product has addons and is not currently configuring, fetching configuration, or fetching the cart
        if (nextProps.hasChildProductAddOns
            && !nextProps.fetchingConfiguration
            && !nextProps.isFetchingCart
            && (!nextProps.configuringItem || this._getOrderItemId(this.props) !== this._getOrderItemId(nextProps))) {
            nextProps.fetchConfigureItem(nextProps.id, this._getOrderItemId(nextProps))
        }
    }

    componentWillUnmount() {
        if (this.props.configuringItem) {
            this.props.clearConfigureItem(this.props.id)
        }
    }

    _getOrderItemId = props => props.location && props.location.state && props.location.state.orderItemId || undefined

    _getInitialFormValues = () => {
        // only worry about initial form values if this is an update
        if (this.props.configuringItem) {
            // return the initial form values for a product with addons
            return this._getInitialFormValuesForConfigurableProduct()
        } else if (this._isUpdateRequest() && !this.props.hasChildProductAddOns){
            // return the initial form values for a product without addons
            return this._getInitialFormValuesForProduct()
        }
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

    _getInitialFormValuesForConfigurableProduct = () => {
        const { configureItemRequest } = this.props

        const flattenedProductChoices = flatMap(configureItemRequest.childOrderItems, child => {

            // handle 'Choose Multiple' scenario
            if (child.productChoices && child.isMultiSelect) {
                return child.productChoices
            }

            return child
        })

        // here we need to basically merge our product choices with any corresponding child order items on the update
        const childOrderItems = map(flattenedProductChoices, (productChoice) => {
            return {
                ...productChoice,
                itemAttributes: reduce(productChoice.itemAttributes, (result, attr) => {
                    return {
                        ...result,
                        [attr.name]: attr.value
                    }
                }, {})
            }
        })

        return {
            // remap the child order items to only select the important attributes
            childOrderItems
        }
    }

    _isUpdateRequest = () => {
        const { location, orderItemBeingUpdated } = this.props
        return !!location.state && !!location.state.orderItemId && !!orderItemBeingUpdated
    }

    _handleAddToCartSubmit = form => {
        if (this.props.configuringItem) {
            return this._handleConfigureItemSubmit(form)
        }

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

    _handleConfigureItemSubmit = form => {
        const { addItemToWishlist, addToCart, configureItemRequest } = this.props
        const isUpdateRequest = this._isUpdateRequest()
        const isWishlistAdd = form.isWishlistAdd

        const request = {
            ...configureItemRequest,
            quantity: form.quantity,
            originalOrderItemId: isUpdateRequest ? configureItemRequest.orderItemId : undefined, // set the originalOrderItemId if there is one
            isUpdateRequest: true, // always true for configured items
        }

        request.childOrderItems = merge(
            // don't mutate the original array
            [],

            // include the hidden values and attributes for the child order items
            flatMap(request.childOrderItems, child => {

                // handle 'Choose Multiple' scenario
                if (child.productChoices && child.isMultiSelect) {
                    return child.productChoices
                }

                return child
            }),

            // include the form values for the child order items
            map(form.childOrderItems, child => {
                return {
                    ...child,
                    itemAttributes: map(child.itemAttributes, (value, name) => ({ name, value }))
                }
            })
        )

        if (!isWishlistAdd) {
            addToCart(request, true, true).then(
                action => {
                    if (!action.payload.error) {
                        this.props.resetReduxForm('product')

                        if (isUpdateRequest) {
                            this.props.history.push(this.props.location.state.from || '/cart')
                        }
                        this.props.clearConfigureItem(this.props.id)
                    }
                }
            )
        } else {
            addItemToWishlist(request, true, true).then(
                action => {
                    if (!action.payload.error) {
                        this.props.resetReduxForm('product')

                        if (isUpdateRequest) {
                            this.props.history.push(this.props.location.state.from || '/account/wishlist')
                        }
                        this.props.clearConfigureItem(this.props.id)
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
                configureItemRequest={this.props.configureItemRequest}
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
        fetchingConfiguration: isFetchingConfiguration(state, product),
        configuringItem: isConfiguringItem(state, product),
        configureItemRequest: getConfigureItemRequest(state, product),
        orderItemBeingUpdated: getOrderItemFromLocationState(state, props),
        seoProperties: getProductSeoProperties(state, props)
    }
}

// action creators
const mapDispatchToProps = {
    addItemToWishlist,
    addToCart,
    clearConfigureItem,
    fetchConfigureItem,
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
