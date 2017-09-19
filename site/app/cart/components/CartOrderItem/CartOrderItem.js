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
import CsrPriceOverrideControls from 'csr/components/CsrPriceOverrideControls'
import Button from 'material-kit/components/Button'
import Price from 'material-kit/components/Price'
import flatMap from 'lodash/flatMap'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'
import range from 'lodash/range'
import { format } from 'layout/util/moneyUtils'
import './CartOrderItem.scss'

class CartOrderItem extends PureComponent {

    _getProductOptionDisplayValues = () => {
        const { product, orderItemAttribute } = this.props
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

    _getAppliedPromotionMessages = () => {
        const { orderItemPriceDetails, totalAdjustmentValue } = this.props

        if (!totalAdjustmentValue || totalAdjustmentValue.amount === '0.00') {
            return []
        }

        return flatMap(orderItemPriceDetails, priceDetail => {
            if (!priceDetail.adjustment) {
                return []
            }

            return priceDetail.adjustment.map(adjustment => adjustment.marketingMessage).filter(a => a)
        })
    }

    _renderItemDetails = () => {
        const { cartMessages, childOrderItems, hasValidationError, id, product } = this.props
        const productOptionDisplayValues = this._getProductOptionDisplayValues()

        const shouldRenderEditAction = product && (product.hasChildProductAddOns || product.productOption)

        const appliedPromotionMessages = this._getAppliedPromotionMessages()
        return (
            <div className='row'>
                <div className='col-lg-12'>
                    {cartMessages && cartMessages.map(message => (<div key={message}>{message}</div>))}
                    <ul>
                        {productOptionDisplayValues.map(option => (
                            <li key={option.value}>
                                {`${option.label}: ${option.value}`}
                            </li>
                        ))}

                        {/* Bundled Products */}
                        {!isEmpty(childOrderItems) && (
                            <li>
                                Bundled Products:
                            </li>
                        )}
                        {!isEmpty(childOrderItems) && childOrderItems.map(child => (
                            <li styleName='CartOrderItem__childItem' key={child.id}>
                                {`${child.quantity} x ${child.name} @ ${format(child.priceBeforeAdjustments)}`}
                            </li>
                        ))}

                        {/* Item Actions */}
                        {shouldRenderEditAction && (
                            <Button
                                component={Link}
                                componentProps={{
                                    to: {
                                        pathname: `/browse${product.url}`,
                                        state: {
                                            orderItemId: id
                                        }
                                    },
                                }}
                                simple
                                xs>
                                {hasValidationError ? [
                                    <i class="fa fa-exclamation-circle"></i>,
                                    'Configuration required'
                                ] : 'Edit'}
                            </Button>
                        )}
                        <Button simple xs onClick={e => this.props.removeFromCart(id)}>Remove</Button>
                    </ul>

                    {/* Applied Promotions */}
                    {!!appliedPromotionMessages.length && (
                        <div styleName='CartOrderItem__promotionRow'>
                            <ul className="promotion">
                                {appliedPromotionMessages.map((message, index) => (
                                    <li key={index}>
                                        <span className="promotion-applied">{`Promotion Applied: ${message}`}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    render() {
        const {
            id, name, priceBeforeAdjustments, primaryMedia,
            productUrl, quantity, totalAdjustmentValue, totalPrice
        } = this.props

        const itemDetails = this._renderItemDetails()

        return (
            <div className='row' styleName='CartOrderItem'>
                {primaryMedia && (
                    <div className='col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                        <div styleName='CartOrderItem__image'>
                            <img src={primaryMedia.url} alt={primaryMedia.altText}/>
                        </div>
                    </div>
                )}

                {/* Description */}
                <div className='col-lg-9 col-md-9 col-sm-9 col-xs-12'>
                    <div className='row'>

                        {/* Product Name */}
                        <div className='col-lg-7'>
                            <div className='text-uppercase' styleName='CartOrderItem__name'>
                                {productUrl ? (
                                    <Link to={`/browse${productUrl}`}>{name}</Link>
                                ) : name}
                            </div>
                        </div>

                        {/* Product Pricing */}
                        <div className='col-lg-5' styleName='CartOrderItem__pricing'>
                            <div>
                                {/* Per Unit Price */}
                                <Price retailPrice={priceBeforeAdjustments}/>

                                <span styleName='CartOrderItem__pricing__bold' > x </span>

                                {/* Item Quantity */}
                                <select name="quantity" defaultValue={quantity} onChange={e => {
                                    this.props.updateQuantity(id, +e.target.value)
                                }}>
                                    {range(1, 99).map(value => (
                                        <option key={value} value={value}>{value}</option>
                                    ))}
                                </select>

                                {/* Line Item Total */}
                                <Price styleName='CartOrderItem__pricing__bold' retailPrice={totalPrice}/>
                            </div>

                            {/* <!-- Discount Savings --> */}
                            {totalAdjustmentValue && totalAdjustmentValue.amount !== '0.00' && (
                                <div styleName='CartOrderItem__pricing__discount'>Savings: <Price retailPrice={totalAdjustmentValue}/></div>
                            )}

                            {/* <!-- CSR Price Override --> */}
                            <CsrPriceOverrideControls id={id}/>
                        </div>
                    </div>

                    {/* Item Details */}
                    {itemDetails}
                </div>
            </div>
        )
    }
}

export default CartOrderItem
