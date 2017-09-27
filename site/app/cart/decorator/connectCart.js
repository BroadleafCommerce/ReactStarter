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
import PropTypes from 'prop-types';

import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import {connect} from 'react-redux'
import {resolve} from 'core/decorator/reduxResolve'
import { isAnonymous } from 'auth/selectors'
import {fetchExistingCart, addToCart, addPromo, invalidateCart, removePromo, removeFromCart, updateQuantity} from 'cart/actions'

/**
 * Connects the existing cart to the component and adds fetching the cart data
 * to the component lifecycle. This does not create a new cart if no customer exists.
 *
 * @param  {component} DecoratingComponent the component being decorated
 * @return {component}                     the decorated component
 */
export function connectExistingCart(DecoratingComponent) {

    @connect((state) => {
        return {
            cart : state.cart,
            isFetchingCart: state.cart.isFetching,
            anonymous: isAnonymous(state)
        }
    }, {fetchCart: fetchExistingCart, addToCart, addPromo, invalidateCart, removePromo, removeFromCart, updateQuantity})
    @resolve((resolver, props) => {
        if (!props.isFetchingCart) {
            resolver.resolve(() => props.fetchCart())
        }
    })
    class DecoratedComponent extends Component {
        static propTypes = {
            cart : PropTypes.shape({
                itemCount : PropTypes.number,
                id : PropTypes.number,
                orderNumber : PropTypes.string,
                orderItem : PropTypes.arrayOf(PropTypes.object)
            }),
            anonymous : PropTypes.bool,
            addToCart : PropTypes.func,
            addPromo : PropTypes.func,
            invalidateCart : PropTypes.func,
            removePromo : PropTypes.func,
            removeFromCart : PropTypes.func,
            updateQuantity : PropTypes.func,
        }

        componentWillReceiveProps(nextProps) {
            const {anonymous: wasAnonymous} = this.props
            const {anonymous} = nextProps
            if (wasAnonymous !== anonymous && !nextProps.isFetchingCart) {
                nextProps.fetchCart()
            }
        }

        render() {
            return <DecoratingComponent {...this.props}/>
        }
    }

    return DecoratedComponent
}

export function connectCartControls(mapStateToProps) {
    return function decorate(DecoratingComponent) {

        @connect(
            (state, ownProps) => {

                return {
                    ...mapStateToProps(state.cart, ownProps),
                    isFetchingCart: state.cart.isFetching,
                    anonymous: isAnonymous(state)
                }
            },
            {fetchCart: fetchExistingCart, addToCart, removeFromCart, updateQuantity}
        )
        class DecoratedComponent extends Component {
            static propTypes = {
                isFetchingCart : PropTypes.bool,
                anonymous : PropTypes.bool,
                addToCart : PropTypes.func,
                removeFromCart : PropTypes.func,
                updateQuantity : PropTypes.func,
            }

            render() {
                return <DecoratingComponent {...this.props}/>
            }
        }

        return DecoratedComponent
    };
}
