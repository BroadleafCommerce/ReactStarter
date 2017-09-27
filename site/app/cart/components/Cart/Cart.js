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
import { withScroll } from 'core/components/ScrollToTop'
import { addPromo, fetchCart, removePromo, removeFromCart, toggleMiniCart, updateQuantity } from 'cart/actions'
import { fetchProductBatch } from 'catalog/product/actions'
import { isAnonymous } from 'auth/selectors'
import { getCart } from 'cart/selectors'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { CartContext } from 'cart/constants'
import Button from 'material-kit/components/Button'
import CartOrderItem from 'cart/components/CartOrderItem'
import CartPricingSummary from 'cart/components/CartPricingSummary'
import PromoCodes from 'cart/components/PromoCodes'
import isEmpty from 'lodash/isEmpty'
import './Cart.scss'

const Cart = ({
    addedOfferCodes = [],
    addPromo,
    anonymous,
    fulfillmentGroup,
    itemAdjustmentsValue,
    itemCount,
    orderItem,
    removePromo,
    removeFromCart,
    subTotal,
    totalAdjustmentsValue,
    totalTax,
    totalShipping,
    total,
    updateQuantity
}) => {

    const hasOrderItems = !isEmpty(orderItem)
    return (
        <div styleName='Cart'>
            <Helmet titleTemplate='Heat Clinic - %s'>
                <title>Cart</title>
                <meta name='description' content='Cart'/>
            </Helmet>

            <div className='container'>
                <div id='cart' className='row'>

                    {hasOrderItems ? (
                        <div className='col-lg-12'>
                            <h1>Shopping Cart</h1>
                        </div>
                    ) : (
                        <div className='col-lg-12'>
                            <div styleName='Cart__emptyMessage'>
                                <h1>Your cart is currently empty.</h1>
                                <Button component={Link} componentProps={{ to: '/' }} primary lg>Continue Shopping</Button>
                            </div>
                        </div>
                    )}

                    {/* <!-- Shopping Cart Items --> */}
                    {hasOrderItems && (
                        <div className='col-lg-8'>
                            <div className='card' styleName='Cart__itemSummary'>
                                <div styleName='Cart__itemSummary__title'>
                                    <h4>In Your Cart ({itemCount})</h4>
                                </div>
                                <div>
                                    {orderItem.filter(o => !o.parentOrderItemId).map(orderItem => (
                                        <CartOrderItem key={orderItem.id} removeFromCart={removeFromCart} updateQuantity={updateQuantity} {...orderItem}/>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* <!-- Cart Summary --> */}
                    {hasOrderItems && (
                        <div className='col-lg-4'>
                            <CartPricingSummary
                                anonymous={anonymous}
                                context={CartContext.Cart}
                                fulfillmentGroup={fulfillmentGroup}
                                itemAdjustmentsValue={itemAdjustmentsValue}
                                itemCount={itemCount}
                                orderItem={orderItem}
                                subTotal={subTotal}
                                totalAdjustmentsValue={totalAdjustmentsValue}
                                totalTax={totalTax}
                                totalShipping={totalShipping}
                                total={total}/>

                            {/* <!-- Promotion Codes --> */}
                            <PromoCodes
                                addedOfferCodes={addedOfferCodes}
                                addPromo={addPromo}
                                removePromo={removePromo}/>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

class CartContainer extends PureComponent {

    componentDidMount() {
        this.props.toggleMiniCart(false)
    }

    componentWillReceiveProps(nextProps) {
        const {anonymous: wasAnonymous} = this.props
        const {anonymous} = nextProps
        if (wasAnonymous !== anonymous && !nextProps.isFetching) {
            nextProps.fetchCart()
        }

        fetchMissingProductsIfNeeded(nextProps)
    }

    render() {
        return <Cart {...this.props}/>
    }
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
        ...getCart(state, props),
        anonymous: isAnonymous(state, props)
    }
}

const dispatchResolve = (resolver, props) => {
    if (!props.isFetching) {
        resolver.resolve(props.fetchCart)
    }

    resolver.resolve(fetchMissingProductsIfNeeded, props)
}

export default connect(mapStateToProps, { addPromo, fetchCart, fetchProductBatch, removeFromCart, removePromo, toggleMiniCart, updateQuantity })(
    resolve(dispatchResolve)(withScroll(CartContainer))
)
