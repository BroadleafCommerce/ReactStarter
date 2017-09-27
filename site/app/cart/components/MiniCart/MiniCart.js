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
import { resolve } from 'core/decorator/reduxResolve'
import { Link, withRouter } from 'react-router-dom'
import { fetchExistingCart, removeFromCart, toggleMiniCart } from 'cart/actions'
import { isAnonymous } from 'auth/selectors'
import { getCart, getItemCount } from 'cart/selectors'
import classNames from 'classnames'
import MiniCartItem from 'cart/components/MiniCartItem'
import Button from 'material-kit/components/Button'
import { format } from 'layout/util/moneyUtils'
import map from 'lodash/map'
import filter from 'lodash/filter'
import './MiniCart.scss'

class MiniCart extends PureComponent {
    static propTypes = {
        isOpened: PropTypes.bool,
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.anonymous !== nextProps.anonymous) {
            nextProps.fetchExistingCart()
        }
    }

    _handleClick = e => {
        if (this.props.location.pathname === '/cart') {
            e.preventDefault()
            e.stopPropagation()
            this.props.toggleMiniCart(false)
            return false
        }

        this.props.toggleMiniCart(!this.props.isOpened)
    }

    _onClose = () => {
        this.props.toggleMiniCart(false)
    }

    _getDropdownStyle = () => {
        if (!this.openMiniCartLink) {
            return {}
        }

        const bodyRect = document.body.getBoundingClientRect();
        const targetRect = this.openMiniCartLink.getBoundingClientRect();
        return {
            top: targetRect.bottom - 5,
            right: bodyRect.right - targetRect.right
        }
    }

    _renderItem = orderItem => (
        <MiniCartItem key={orderItem.id} {...orderItem} location={this.props.location} removeFromCart={this.props.removeFromCart}/>
    )

    render() {
        const { cart, itemCount } = this.props

        const isOpened = this.props.isOpened && this.props.location.pathname !== '/cart'

        return (
            <div className={'dropdown' + (isOpened ? ' open' : '')}>
                <a
                    ref={ref => this.openMiniCartLink = ref}
                    className='dropdown-toggle'
                    styleName={`MiniCart__toggle${isOpened ? '--active' : ''}`}
                    onClick={this._handleClick}>
                    <i className='material-icons'>shopping_cart</i>
                    {itemCount ? <span>{itemCount}</span> : ''}
                </a>
                {isOpened && (
                    <div styleName='MiniCart__overlay' onClick={this._onClose}>
                        <ul className='dropdown-menu card'
                            onClick={e => e.stopPropagation()}
                            styleName='MiniCart__dropdown'
                            style={this._getDropdownStyle()}>
                            {map(filter(cart.orderItem, o => !o.parentOrderItemId), this._renderItem)}
                            {!!itemCount && (
                                <li styleName="MiniCart__dropdown__subTotal">
                                    <div>
                                        <span>Subtotal</span>:&nbsp;
                                        <span>
                                            {format(cart.subTotal.amount, cart.subTotal.currency)}
                                        </span>
                                    </div>
                                </li>
                            )}
                            {!!itemCount && (
                                <li styleName="MiniCart__dropdown__action">
                                    <Link className='btn btn-primary' to="/cart">View your cart</Link>
                                </li>
                            )}
                            {!itemCount && (
                                <li styleName='MiniCart__dropdown__empty'>
                                    <div>
                                        Your cart is empty
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        anonymous: isAnonymous(state),
        cart: getCart(state),
        itemCount: getItemCount(state),
        isOpened: state.miniCart.isOpened
    }
}

const dispatchResolve = (resolver, props) => {
    resolver.resolve(props.fetchExistingCart)
}

export default withRouter(connect(mapStateToProps, { fetchExistingCart, removeFromCart, toggleMiniCart })(resolve(dispatchResolve)(MiniCart)))
