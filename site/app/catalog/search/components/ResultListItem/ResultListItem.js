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
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import BLCPropTypes from 'core/util/BLCPropTypes'
import { addToCart } from 'cart/actions'
import { inCart } from 'cart/selectors'
import { isPreviewing } from 'preview/selectors'
import Price from 'material-kit/components/Price'
import Button from 'material-kit/components/Button'
import WishlistButton from 'catalog/product/components/WishlistButton'
import ProductOptionModal from 'catalog/search/components/ProductOptionModal'
import classNames from 'classnames'
import { format } from 'layout/util/moneyUtils'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import truncate from 'lodash/truncate'
import union from 'lodash/union'
import './ResultListItem.scss'


class ResultListItem extends PureComponent {

    _renderAddToCartButton = () => {
        const { addToCart, defaultSku, hasChildProductAddOns, id, inCart, productOption } = this.props

        if (inCart) {
            return (
                <Button
                    component={Link}
                    componentProps={{
                        to: '/cart'
                    }}
                    round
                    success>
                    <i className='material-icons'>shopping_cart</i>
                </Button>
            )
        }

        if (!isEmpty(productOption) || hasChildProductAddOns || !defaultSku.available) {
            return false
        }

        return (
            <Button
                className='btn-rose'
                onClick={e => addToCart({ productId: id })}
                round>
                <i className='material-icons'>add_shopping_cart</i>
            </Button>
        )
    }

    _renderPromotionMessages = () => {
        const { promotionMessages } = this.props
        if (!promotionMessages) {
            return undefined
        }

        const { EVERYWHERE = [], BROWSE = [] } = promotionMessages

        return union(EVERYWHERE, BROWSE).map((promotionMessage, index) => (
            <div key={index}>{promotionMessage.message}</div>
        ))
    }

    render() {
        const {
            className,
            defaultSku,
            id,
            inCart,
            longDescription,
            name,
            primaryMedia,
            previewing,
            retailPrice,
            salePrice,
            showSearchScore,
            style,
            url,
        } = this.props

        return (
            <div
                className={classNames({
                    [className || '']: true,
                    'card card-product card-plain card-rotate no-shadow': true
                })}
                style={style}
                styleName='ResultListItem'>

                {previewing && showSearchScore && !!defaultSku.score && (
                    <div>{defaultSku.score.toFixed(3)}</div>
                )}
                <div className='rotating-card-container'>
                    <div className='card-image' styleName='ResultListItem__image-container'>
                        <div className='front'>
                            <img
                                className='img'
                                styleName={defaultSku.available ? '' : 'Image--is-out-of-stock'}
                                src={primaryMedia.url + '?browse'}
                                alt={primaryMedia.altText}
                            />
                            {!defaultSku.available && (
                                <h2 className='card-title' styleName='ResultListItem__out-of-stock'>
                                    <i className='material-icons'>info_outline</i>
                                    Out Of Stock
                                </h2>
                            )}
                            {!defaultSku.available && (
                                <div styleName='ResultListItem__out-of-stock-overlay'></div>
                            )}
                            <div className='colored-shadow' style={{
                                backgroundImage: `url(${primaryMedia.url}?browse)`,
                                opacity: 1
                            }}/>
                        </div>

                        <div className='back back-background' style={{
                            backgroundImage: `url(${primaryMedia.url}?browse)`,
                        }}>
                            <div className='card-content'>
                                <h5 className='card-title'>
                                    {name}
                                </h5>
                                <div className='footer text-center'>
                                    <Button
                                        className='btn-white'
                                        component={Link}
                                        componentProps={{
                                            to: `/browse${url}`
                                        }}
                                        round>
                                        <i className='material-icons'>info</i> Details
                                    </Button>
                                    {this._renderAddToCartButton()}
                                </div>
                                <hr/>
                                {/* <p className='card-description' dangerouslySetInnerHTML={{ __html: truncate(longDescription, { length: 69, separator: /,! \<\?+/ })}}/> */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='card-content'>
                    <h4 className='card-title' styleName='ResultListItem__product-title'>
                        {name}
                    </h4>
                    {this._renderPromotionMessages()}
                    <div styleName='ResultListItem__footer'>
                        <Price retailPrice={retailPrice} salePrice={salePrice}/>
                        <div className='text-right'>
                            {inCart && (
                                <Button component={Link} componentProps={{ to: '/cart' }} fab simple success sm>
                                    <i className='material-icons'>shopping_cart</i>
                                </Button>
                            )}
                            <WishlistButton id={id}/>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        inCart: inCart(state, props),
        previewing: isPreviewing(state),
        showSearchScore: state.preview.showSearchScore,
    }
}

export default connect(mapStateToProps, { addToCart })(ResultListItem)
