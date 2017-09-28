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
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import Button from 'material-kit/components/Button'
import Price from 'material-kit/components/Price'
import {CartContext} from 'cart/constants'
import reduce from 'lodash/reduce'
import { add } from 'layout/util/moneyUtils'
import './CartPricingSummary.scss'

const CartPricingSummary = ({
    anonymous,
    context = CartContext.Cart,
    fulfillmentGroup,
    itemAdjustmentsValue,
    itemCount,
    onPerformCheckout,
    orderItem,
    subTotal,
    totalAdjustmentsValue,
    totalTax,
    totalShipping,
    total
}) => {

    return (
        <div className='card' styleName='CartPricingSummary'>
            <div styleName='CartPricingSummary__title'>
                <h4>Summary</h4>
            </div>
            <div styleName='CartPricingSummary__breakdown'>
                {/* <!-- Subtotal --> */}
                <div>
                    <span>SubTotal</span>
                    <Price className='pull-right' price={itemAdjustmentsValue ? add(subTotal, itemAdjustmentsValue) : subTotal}/>
                </div>

                {/* <!-- Total Savings --> */}
                <div>
                    <span>Total Savings</span>
                    <Price className='pull-right' price={totalAdjustmentsValue}/>
                </div>

                {/* <!-- Taxes --> */}
                {context !== CartContext.Cart && (
                    <div>
                        <span>Taxes</span>
                        <Price className='pull-right' price={totalTax}/>
                    </div>
                )}

                {/* <!-- Total Shipping --> */}
                {context !== CartContext.Cart && (
                    <div>
                        <span>Shipping</span>
                        <Price className='pull-right' price={totalShipping}/>
                    </div>
                )}

                {/* <!-- Estimated Total --> */}
                {context === CartContext.Cart && (
                    <div styleName='CartPricingSummary__estimatedTotal'>
                        <span>Estimated Total</span>
                        <Price className='pull-right' price={total}/>
                        <FormattedMessage
                            tagName='p'
                            id='cart.subtotalDisclaimer'
                            description='Disclaimer detailing the total is estimated and not final'/>
                    </div>
                )}

                {/* <!-- Total --> */}
                {context !== CartContext.Cart && (
                    <div styleName='CartPricingSummary__total'>
                        <span>Total</span>
                        <Price className='pull-right' price={total}/>
                    </div>
                )}

                {/* <!-- Cart related actions --> */}
                {itemCount > 0 && context === CartContext.Cart && (
                    <div styleName='CartPricingSummary__actions'>
                        <div>
                            <Button
                                primary
                                component={Link}
                                componentProps={{
                                    to: {
                                        pathname: anonymous ? '/checkout/login' : '/checkout',
                                        state: {
                                            from: '/checkout'
                                        }
                                    }
                                }}>
                                Checkout <i className='material-icons'>keyboard_arrow_right</i>
                            </Button>
                        </div>
                        <div styleName='Divider'>or</div>
                        <div>
                            <input type="image" src="https://www.paypal.com/en_US/i/btn/btn_xpressCheckout.gif" alt="Submit Form" />
                        </div>
                    </div>
                )}
                {context === CartContext.Checkout && (
                    <div styleName='CartPricingSummary__actions'>
                        <Button primary className='pull-right' onClick={e => onPerformCheckout()}>
                            Place Your Order <i className='material-icons'>keyboard_arrow_right</i>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CartPricingSummary
