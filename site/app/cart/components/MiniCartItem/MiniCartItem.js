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
