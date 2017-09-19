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
