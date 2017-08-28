import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Button from 'material-kit/components/Button'
import Price from 'material-kit/components/Price'
import './MiniCartItem.scss'

class MiniCartItem extends PureComponent {
    static defaultProps = {
        excludeActions: false
    }

    render() {
        const { excludeActions, hasValidationError, id, name, primaryMedia, productUrl, quantity, salePrice } = this.props
        return (
            <li key={id} styleName='MiniCartItem'>
                <div styleName='MiniCartItem__image'>
                    <img src={primaryMedia.url}/>
                </div>
                <div styleName='MiniCartItem__content'>
                    <div styleName='name'>
                        {name}
                    </div>
                    <div>
                        <Price price={salePrice}/>
                        {quantity > 1 ? ` x ${quantity}` : ''}
                    </div>
                    {!excludeActions && (
                        <Button
                            component={Link}
                            componentProps={{
                                to: {
                                    pathname: `/browse${productUrl}`,
                                    state: {
                                        orderItemId: id,
                                        from: this.props.location,
                                    }
                                },
                                style: {
                                    marginRight: 5
                                }
                            }}
                            simple
                            xs>
                            {hasValidationError ? [
                                <i class="fa fa-exclamation-circle"></i>,
                                'Configuration required'
                            ] : 'Edit'}
                        </Button>
                    )}
                    {!excludeActions && (
                        <Button simple xs onClick={e => this.props.removeFromCart(id)}>Remove</Button>
                    )}
                </div>
            </li>
        )
    }
}

export default MiniCartItem
