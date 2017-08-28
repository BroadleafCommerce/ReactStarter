import React, {Component} from 'react'
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
            cart : React.PropTypes.shape({
                itemCount : React.PropTypes.number,
                id : React.PropTypes.number,
                orderNumber : React.PropTypes.string,
                orderItem : React.PropTypes.arrayOf(React.PropTypes.object)
            }),
            anonymous : React.PropTypes.bool,
            addToCart : React.PropTypes.func,
            addPromo : React.PropTypes.func,
            invalidateCart : React.PropTypes.func,
            removePromo : React.PropTypes.func,
            removeFromCart : React.PropTypes.func,
            updateQuantity : React.PropTypes.func,
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
                isFetchingCart : React.PropTypes.bool,
                anonymous : React.PropTypes.bool,
                addToCart : React.PropTypes.func,
                removeFromCart : React.PropTypes.func,
                updateQuantity : React.PropTypes.func,
            }

            render() {
                return <DecoratingComponent {...this.props}/>
            }
        }

        return DecoratedComponent
    }
}
