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
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchOrderHistory } from 'account/actions'
import { getOrders } from 'account/selectors'
import { resolve } from 'core/decorator/reduxResolve'
import { Route, NavLink } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import Price from 'material-kit/components/Price'
import OrderHistoryDetails from 'account/components/OrderHistoryDetails'
import formatDate from 'date-fns/format'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'
import './ViewOrders.scss'

class ViewOrders extends PureComponent {
    static propTypes = {
        orders: PropTypes.array,
        fetchOrderHistory: PropTypes.func,
    }

    componentWillReceiveProps(nextProps) {
        const { authenticationToken, customerToken } = this.props
        const { authenticationToken: newAuthenticationToken, customerToken: newCustomerToken } = nextProps
        if (authenticationToken !== newAuthenticationToken || customerToken !== newCustomerToken) {
            nextProps.fetchOrderHistory()
        }
    }

    render() {
        const { orders } = this.props
        return (
            <div>
                <h3>Order History</h3>
                <hr />
                {!isEmpty(orders) ? (
                    <div styleName='ViewOrders'>
                        <div styleName='ViewOrders__rowHeader'>
                            <FormattedMessage
                                id='account.orders.orderNumber'
                                defaultMessage='Order Number'>
                                {formattedMessage => (
                                    <span styleName='ViewOrders__orderNumber'>{formattedMessage}</span>
                                )}
                            </FormattedMessage>
                            <FormattedMessage
                                id='account.orders.date'
                                defaultMessage='Date'>
                                {formattedMessage => (
                                    <span styleName='ViewOrders__submitDate'>{formattedMessage}</span>
                                )}
                            </FormattedMessage>
                            <FormattedMessage
                                id='account.orders.status'
                                defaultMessage='Status'>
                                {formattedMessage => (
                                    <span styleName='ViewOrders__status'>{formattedMessage}</span>
                                )}
                            </FormattedMessage>
                            <FormattedMessage
                                id='account.orders.total'
                                defaultMessage='Total'>
                                {formattedMessage => (
                                    <span styleName='ViewOrders__total'>{formattedMessage}</span>
                                )}
                            </FormattedMessage>
                        </div>

                        {orders.map((order, index) => (
                            <div styleName='ViewOrders__row' key={index}>
                                <span styleName='ViewOrders__orderNumber'>
                                    <NavLink to={`/account/orders/${order.orderNumber}`}>{order.orderNumber || 'NONE'}</NavLink>
                                </span>
                                <span styleName='ViewOrders__submitDate'>{formatDate(order.submitDate || Date.now(), 'MM-DD-YYYY')}</span>
                                <span styleName='ViewOrders__status'>{order.status}</span>
                                <Price styleName='ViewOrders__total' price={order.total}/>
                            </div>
                        ))}

                        <Route
                            path='/account/orders/:orderNumber'
                            exact
                            render={props => (
                                <OrderHistoryDetails  {...find(orders, { orderNumber: props.match.params.orderNumber })}/>
                            )}
                        />
                    </div>
                ) : (
                    <FormattedMessage
                        id='account.orders.noOrders'
                        description='This message shows when no orders have been placed'
                        defaultMessage='You have not placed any orders.'
                        tagName='p'/>
                )}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        authenticationToken: state.auth.authenticationToken,
        customerToken: state.auth.anonymousCustomerToken || state.csr.csrCustomerToken,
        isFetching: state.orderHistory.isFetching,
        orders: getOrders(state)
    }
}

const dispatchResolve = (resolver, props) => {
    if (!props.isFetching) {
        resolver.resolve(props.fetchOrderHistory)
    }
}

export default connect(mapStateToProps, { fetchOrderHistory })(resolve(dispatchResolve)(ViewOrders))
