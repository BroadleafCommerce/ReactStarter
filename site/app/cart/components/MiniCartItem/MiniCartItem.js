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
