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
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { resolve } from 'core/decorator/reduxResolve'
import { isAnonymous } from 'auth/selectors'
import { getWishlist } from 'account/selectors'
import { fetchWishlist, moveItemToCart, moveListToCart, removeItemFromWishlist, updateQuantityInWishlist } from 'account/actions'
import { fetchProductBatch } from 'catalog/product/actions'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import Button from 'material-kit/components/Button'
import Price from 'material-kit/components/Price'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'
import range from 'lodash/range'
import { format } from 'layout/util/moneyUtils'
import './ManageWishlist.scss'

class ManageWishlist extends PureComponent {

    componentWillReceiveProps(nextProps) {
        if (!nextProps.anonymous) {
            fetchMissingProductsIfNeeded(nextProps)
        }
    }

    render() {
        const { orderItem } = this.props
        return (
            <div>
                <h3>Manage Wishlist</h3>
                <hr/>

                {isEmpty(orderItem) ? (
                    <FormattedMessage
                        id='account.wishlist.noItems'
                        defaultMessage='You do not have any items in your wishlist.'
                        tagName='p'/>
                ) : (
                    <div className='col-sm-12'>

                        {orderItem.filter(o => !o.parentOrderItemId).map(orderItem => (
                            <WishlistItem
                                key={orderItem.id}
                                moveItemToCart={this.props.moveItemToCart}
                                removeItemFromWishlist={this.props.removeItemFromWishlist}
                                updateQuantityInWishlist={this.props.updateQuantityInWishlist}
                                {...orderItem}/>
                        ))}

                        <div className='pull-right'>
                            <Button onClick={e => this.props.moveListToCart()} primary type='button'>
                                <i className='material-icons'>add_shopping_cart</i>&nbsp;
                                <FormattedMessage
                                    id='account.wishlist.moveWishlist'
                                    defaultMessage='Move Wishlist to Cart'/>
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

const WishlistItem = ({
    moveItemToCart,
    removeItemFromWishlist,
    updateQuantityInWishlist,
    ...orderItem,
}) => {

    const {
        childOrderItems, hasValidationError, id, name, priceBeforeAdjustments,
        primaryMedia, productUrl, product, quantity, orderItemAttribute, totalPrice
    } = orderItem

    return (
        <div className='row' styleName='WishlistItem'>

            {/* Product Image */}
            <div className='col-lg-3 col-md-3 col-sm-5 col-xs-12'>
                <div className='img-container' styleName='WishlistItem__image'>
                    <img src={primaryMedia.url} alt={primaryMedia.altText} />
                </div>
            </div>

            <div className='col-lg-9 col-md-9 col-sm-7 col-xs-12'>
                <div className='row'>
                    {/* Product Name */}
                    <div className='col-lg-7'>
                        <div className='text-uppercase' styleName='WishlistItem__name'>
                            <Link to={`/browse${productUrl}`}>{name}</Link>
                        </div>
                    </div>

                    <div className='col-lg-5' styleName='WishlistItem__pricing'>
                        <div>
                            {/* Per Unit Price */}
                            <Price retailPrice={priceBeforeAdjustments}/>

                            <span styleName='WishlistItem__pricing__bold' > x </span>

                            {/* Item Quantity */}
                            <select
                                defaultValue={quantity}
                                name="quantity"
                                onChange={e => {
                                    updateQuantityInWishlist({ itemId: id, quantity: +e.target.value })
                                }}>
                                {range(1, 99).map(value => (
                                    <option key={value} value={value}>{value}</option>
                                ))}
                            </select>

                            {/* Line Item Total */}
                            <Price styleName='WishlistItem__pricing__bold' retailPrice={totalPrice}/>
                        </div>
                    </div>
                </div>

                {/* Item Details */}
                <div className='row'>
                    <div className='col-lg-12'>
                        {/* Product Options */}
                        {getProductOptionDisplayValues(product, orderItemAttribute).map(option => (
                            <div key={option.value}>
                                {`${option.label}: ${option.value}`}
                            </div>
                        ))}

                        {/* Bundled Products */}
                        {!isEmpty(childOrderItems) && (
                            <div>
                                Bundled Products:
                            </div>
                        )}
                        {!isEmpty(childOrderItems) && childOrderItems.map(child => (
                            <div key={child.id} styleName='WishlistItem__childItem'>
                                {`${child.quantity} x ${child.name} @ ${format(child.priceBeforeAdjustments)}`}
                            </div>
                        ))}

                        <div>
                            <Button
                                bordered
                                onClick={e => moveItemToCart({ itemId: id })}
                                simple
                                type='submit'
                                xs>
                                Add To Cart
                            </Button>

                            {/* TODO: Figure out way to allow editing */}

                            <Button
                                bordered
                                onClick={e => removeItemFromWishlist({ itemId: id})}
                                simple
                                xs>
                                Remove
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const getProductOptionDisplayValues = (product, orderItemAttribute) => {
    if (!product || !product.productOption) {
        return []
    }

    return orderItemAttribute.map(attr => {
        const option = find(product.productOption, { attributeName: `productOption.${attr.name}` })

        return option ? {
            label: option.label,
            value: attr.value
        } : undefined
    }).filter(val => !!val)
}

const fetchMissingProductsIfNeeded = props => {
    const { orderItem } = props
    if (orderItem) {
        const missingProducts = orderItem.filter(o => !o.parentOrderItemId && !o.product).map(o => o.productId)
        if (!isEmpty(missingProducts)) {
            props.fetchProductBatch(missingProducts)
        }
    }
}

const mapStateToProps = (state, props) => {
    return {
        ...getWishlist(state),
        anonymous: isAnonymous(state)
    }
}

const dispatchResolve = (resolver, props) => {
    if (!props.anonymous) {
        resolver.resolve(props.fetchWishlist, true)
        resolver.resolve(fetchMissingProductsIfNeeded, props)
    }
}

export default connect(mapStateToProps, { fetchProductBatch, fetchWishlist, moveItemToCart, moveListToCart, removeItemFromWishlist, updateQuantityInWishlist })(
    resolve(dispatchResolve)(ManageWishlist)
)
