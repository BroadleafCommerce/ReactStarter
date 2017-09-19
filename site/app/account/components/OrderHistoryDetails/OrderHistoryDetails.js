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
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import Price from 'material-kit/components/Price'
import flatMap from 'lodash/flatMap'
import isEmpty from 'lodash/isEmpty'
import './OrderHistoryDetails.scss'


class OrderHistoryDetails extends PureComponent {
    static propTypes = {
        orderNumber: PropTypes.string,
    }

    render() {
        const { fulfillmentGroup } = this.props
        return (
            <div styleName='OrderHistoryDetails'>
                <ul>
                    <OrderHistoryDetails.Summary {...this.props}/>
                    {!isEmpty(fulfillmentGroup) && fulfillmentGroup.map(fulfillmentGroup => (
                        <OrderHistoryDetails.FulfillmentGroup key={fulfillmentGroup.id} {...fulfillmentGroup}/>
                    ))}
                    {/* TODO: <OrderHistoryDetails.Payment {...this.props}/> */}
                </ul>
            </div>
        )
    }
}

OrderHistoryDetails.Summary = ({
    orderItem,
    subTotal,
    totalShipping,
    totalTax,
    total
}) => {
    return (
        <li>
            <FormattedMessage
                id='account.orders.orderSummary'
                defaultMessage='Order Summary'
                tagName='h5'/>
            <div className='row'>
                <div className='col-sm-12'>
                    <FormattedMessage
                        id='account.orders.items'
                        defaultMessage='Items'
                        tagName='h6'/>
                    <table styleName='OrderHistoryDetails__items'>
                        <tbody>
                            {!isEmpty(orderItem) && orderItem.map(orderItem => {
                                const itemRow = (
                                    <tr>
                                        <FormattedMessage
                                            id='account.orders.of'>
                                            {formattedMessage => (
                                                <td>{`${orderItem.quantity} ${formattedMessage} ${orderItem.name}`}</td>
                                            )}
                                        </FormattedMessage>
                                        <td><Price price={orderItem.totalPrice}/></td>
                                    </tr>
                                )

                                const appliedPromotionMessages = getAppliedPromotionMessages(orderItem)
                                const promotionRow = !isEmpty(appliedPromotionMessages) && (
                                    <tr>
                                        <td>
                                            <div styleName='OrderHistoryDetails__promotionRow'>
                                                <ul className="promotion">
                                                    {appliedPromotionMessages.map((message, index) => (
                                                        <li key={index}>
                                                            <span className="promotion-applied">{`Promotion Applied: ${message}`}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </td>
                                        <td></td>
                                    </tr>
                                )

                                return [itemRow, promotionRow]
                            })}
                            <tr className='shipment-summary merchandise-total'>
                                <FormattedMessage
                                    id='account.orders.merchandiseTotal'
                                    defaultMessage='Merchandise Total:'
                                    tagName='td'/>
                                <Price className='price' component='td' price={subTotal}/>
                            </tr>
                            <tr className='shipment-summary'>
                                <FormattedMessage
                                    id='account.orders.shippingTotal'
                                    defaultMessage='Shipping Total:'
                                    tagName='td'/>
                                <Price className='price' component='td' price={totalShipping}/>
                            </tr>
                            <tr className='shipment-summary taxes'>
                                <FormattedMessage
                                    id='account.orders.taxes'
                                    defaultMessage='Taxes:'
                                    tagName='td'/>
                                <Price className='price' component='td' price={totalTax}/>
                            </tr>
                            <tr className='grand-total'>
                                <FormattedMessage
                                    id='account.orders.grandTotal'
                                    defaultMessage='Grand Total:'
                                    tagName='td'/>
                                <Price className='price' component='td' price={total}/>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </li>
    )
}

function getAppliedPromotionMessages(orderItem) {
    const { orderItemPriceDetails, totalAdjustmentValue } = orderItem

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

OrderHistoryDetails.FulfillmentGroup = ({
    address,
    fulfillmentOption,
    fulfillmentGroupItem,
    fulfillmentPrice,
    status,
    type
}) => (
    <li>
        {!['GIFT_CARD', 'DIGITAL', 'PHYSICAL_PICKUP'].includes(type) && (
            <div>
                <h5>
                    Shipment{status && ` : ${status}`}
                </h5>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="shipping-information">
                            <div className="fulfillment-group-address">
                                <h6>Shipping Address</h6>
                                {address && (
                                    <address>
                                        {address.firstName}&nbsp;{address.lastName}<br/>
                                        {address.phonePrimary && [address.phonePrimary.phoneNumber, <br key={0}/>]}
                                        {address.addressLine1}<br/>
                                        {address.addressLine2 && [address.addressLine2, <br/>]}
                                        {address.city},&nbsp;{address.stateProvinceRegion}&nbsp;{address.postalCode}<br/>
                                    </address>
                                )}
                            </div>
                            <div className="shipping-type">
                                <h6>Shipping Speed</h6>
                                {fulfillmentOption && (
                                    <div>{`${fulfillmentOption.name}: ${fulfillmentOption.description}`}</div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-8 details-row">
                        <h6>Items</h6>
                        <table styleName='OrderHistoryDetails__items'>
                            <tbody>
                                {!isEmpty(fulfillmentGroupItem) && fulfillmentGroupItem.map(fgItem => (
                                    <tr key={fgItem.id}>
                                        <FormattedMessage
                                            id='account.orders.of'>
                                            {formattedMessage => (
                                                <td>{`${fgItem.quantity} ${formattedMessage} ${fgItem.orderItem.name}`}</td>
                                            )}
                                        </FormattedMessage>
                                        <td></td>
                                    </tr>
                                ))}

                                <tr styleName='OrderHistoryDetails__merchandiseTotal'>
                                    <FormattedMessage
                                        id='account.orders.shippingSubtotal'
                                        defaultMessage='Shipping Subtotal:'
                                        tagName='td'/>
                                    <Price className='price' component='td' price={fulfillmentPrice}/>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )}
    </li>
)

export default OrderHistoryDetails
