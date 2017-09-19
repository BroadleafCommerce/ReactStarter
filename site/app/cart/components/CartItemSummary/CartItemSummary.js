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
