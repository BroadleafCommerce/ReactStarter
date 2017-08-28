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
