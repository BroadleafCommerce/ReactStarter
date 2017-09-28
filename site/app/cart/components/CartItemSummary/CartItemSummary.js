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
import { Link } from 'react-router-dom'
import MiniCartItem from 'cart/components/MiniCartItem'
import Button from 'material-kit/components/Button'
import {CartContext} from 'cart/constants'
import '../Cart/Cart.scss'

class CartItemSummary extends PureComponent {
    static defaultProps = {
        context: CartContext.Checkout
    }

    render() {
        const { context, orderItem } = this.props
        return (
            <div className='card' styleName='Cart__itemSummary'>
                <div styleName='Cart__itemSummary__title'>
                    {context === CartContext.Checkout && (
                        <h4>In Your Cart</h4>
                    )}
                    {context === CartContext.Checkout && (
                        <Button className='pull-right' component={Link} componentProps={{ to: '/cart' }} lg primary simple>Edit</Button>
                    )}
                    {context === CartContext.Confirmation && (
                        <h4>In Your Order</h4>
                    )}
                </div>
                <ul>
                    {orderItem.filter(o => !o.parentOrderItemId).map(orderItem => <MiniCartItem key={orderItem.id} excludeActions {...orderItem}/>)}
                </ul>
            </div>
        )
    }
}

export default CartItemSummary
