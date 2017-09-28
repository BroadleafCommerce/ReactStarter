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
import React, { Component } from 'react'
import { Field } from 'redux-form'
import ProductOption from 'catalog/product/components/ProductOption'
import classNames from 'classnames'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'
import range from 'lodash/range'
import { format } from 'layout/util/moneyUtils'
import './ProductAddOnFields.scss'

const ProductAddonFields = ({
    additionalAttributes,
    isMultiSelect,
    orderItemIndex,
    product,
    productChoices,
    ...rest,
}) => {
    const addOnLabel = !isEmpty(additionalAttributes) && find(additionalAttributes, { key: 'addOnLabel' })

    return (
        <div>
            {addOnLabel && (
                <div className='display-label row'>
                    <div className='col-sm-12'>
                        <label htmlFor={`childOrderItems[${orderItemIndex}].productId`}>
                            {addOnLabel.value}
                        </label>
                    </div>
                </div>
            )}
            {!isMultiSelect && (
                <Field
                    {...rest}
                    additionalAttributes={additionalAttributes}
                    component={isEmpty(product) ? ChooseOneDropdown : ChooseSpecified}
                    name={`childOrderItems[${orderItemIndex}].productId`}
                    orderItemIndex={orderItemIndex}
                    isMultiSelect={false}
                    product={product}
                    productChoices={productChoices}
                />
            )}
            {isMultiSelect && productChoices.map((productChoice, index) => {
                const itemIndex = orderItemIndex + index
                return (
                    <Field
                        {...productChoice}
                        key={itemIndex}
                        component={ChooseSpecified}
                        name={`childOrderItems[${itemIndex}].productId`}
                        orderItemIndex={itemIndex}
                    />
                )
            })}
        </div>
    )
}

class ChooseOneDropdown extends Component {

    _initDefaultValue = props => {
        const { additionalAttributes, input } = props
        const chooseOneDefaultProductIdAttr = find(additionalAttributes, { key: 'chooseOneDefaultProductId' })

        // set the default product id
        if (chooseOneDefaultProductIdAttr && !input.value) {
            input.onChange(+chooseOneDefaultProductIdAttr.value)
        }
    }

    componentWillMount() {
        this._initDefaultValue(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this._initDefaultValue(nextProps)
    }

    _getSelectedChoice = () => {
        const { input, productChoices } = this.props
        if (input.value) {
            return find(productChoices, choice => choice.product.id === +input.value)
        }

        return undefined
    }

    _renderProductAddOnPricing = () => {
        const { displayPrice, maxQuantity, minQuantity, orderItemIndex, quantity } = this.props
        const selectedChoice = this._getSelectedChoice()

        const product = selectedChoice && selectedChoice.product
        const available = product ? product.defaultSku.available : true

        return (
            <Field
                available={available}
                component={AddOnPricingQuantity}
                name={`childOrderItems[${orderItemIndex}].quantity`}
                displayPrice={displayPrice}
                maxQuantity={maxQuantity}
                minQuantity={minQuantity}
                quantity={quantity}
            />
        )
    }

    render() {
        const { additionalAttributes, input, meta: { active, touched, error }, orderItemIndex, productChoices } = this.props

        // figure out currently selected product (if there is one)
        const selectedChoice = this._getSelectedChoice()
        const selectedProduct = selectedChoice && selectedChoice.product

        const chooseOneDefaultProductIdAttr = find(additionalAttributes, { key: 'chooseOneDefaultProductId' })

        const productOptionFields = !isEmpty(selectedProduct) && <ProductOptionFields product={selectedProduct} orderItemIndex={orderItemIndex}/>
        const productAddOnPricing = this._renderProductAddOnPricing()

        return (
            <div className='row configure-row'>
                <div className='col-sm-8'>
                    <div className='row'>
                        <div className='col-sm-3'>
                            {!isEmpty(selectedProduct) ? (
                                <img className='img-responsive img-raised' src={selectedProduct.primaryMedia.url} alt={selectedProduct.primaryMedia.altText}/>
                            ) : (
                                <img className='img-responsive img-raised' src='https://placehold.jp/28/bbafae/ffffff/60x60.png?text=%3F' alt='Choose One Product'/>
                            )}
                        </div>

                        <div className='col-sm-9'>
                            <div className={classNames({
                                    'form-group label-floating': true,
                                    'is-empty': !input.value,
                                    'is-focused': active,
                                    'has-error': touched && error
                                })}>
                                <select
                                    className='form-control'
                                    {...input}>
                                    {!chooseOneDefaultProductIdAttr && (<option value='' disabled></option>)}
                                    {productChoices.map((choice, index) => (
                                        <option key={index} value={choice.product.id} >
                                            {choice.product.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {productOptionFields}
                        </div>
                    </div>
                </div>

                <div className='col-sm-4'>
                    {productAddOnPricing}
                </div>
            </div>
        )
    }
}

class ChooseSpecified extends Component {

    _initDefaultValue = props => {
        const { input, product } = props
        // set the default product id
        if (!input.value) {
            input.onChange(+product.id)
        }
    }

    componentWillMount() {
        this._initDefaultValue(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this._initDefaultValue(nextProps)
    }

    _renderProductAddOnPricing = () => {
        const { displayPrice, maxQuantity, minQuantity, orderItemIndex, product, quantity } = this.props

        return (
            <Field
                available={product.defaultSku.available}
                component={AddOnPricingQuantity}
                name={`childOrderItems[${orderItemIndex}].quantity`}
                displayPrice={displayPrice}
                maxQuantity={maxQuantity}
                minQuantity={minQuantity}
                quantity={quantity}
            />
        )
    }

    render() {
        const { input, orderItemIndex, product } = this.props

        const productOptionFields = !isEmpty(product) && <ProductOptionFields product={product} orderItemIndex={orderItemIndex}/>
        const productAddOnPricing = this._renderProductAddOnPricing()
        return (
            <div className='row configure-row'>
                <div className='col-sm-8'>
                    {/* <!-- Product Specified --> */}
                    <div className='row'>
                        {/* <!-- Product Image--> */}
                        <div className='col-sm-3'>
                            {!isEmpty(product.primaryMedia) && (
                                <img className='img-responsive img-raised' src={product.primaryMedia.url + '?browse'} alt={product.primaryMedia.altText || 'Sauce Image'}/>
                            )}
                        </div>

                        {/* <!-- Product Name--> */}
                        <div className='col-sm-9 configure-title'>
                            <div>{product.name}</div>

                            {/* <!-- Product Options if any --> */}
                            {productOptionFields}
                        </div>

                        <input type='hidden' {...input}/>
                    </div>

                </div>
                <div className='col-sm-4'>
                    {productAddOnPricing}
                </div>
            </div>
        )
    }
}

class AddOnPricingQuantity extends Component {

    render() {
        const { available, displayPrice, input, isMultiSelect, minQuantity, maxQuantity } = this.props

        if (!available) {
            // if out of stock, render out of stock div
            return (
                <div className='out-of-stock'>Out of Stock</div>
            )
        }

        return (
            <div className='item-price'>
                <span className='item-price-span'>
                    {displayPrice && displayPrice.amount > 0 ? format(displayPrice) : 'Included'}
                </span>
                <span> x </span>

                {/* <!-- Item Quantity --> */}
                {(isMultiSelect || minQuantity !== maxQuantity) ? (
                    <select {...input}>
                        {range(minQuantity || 0, maxQuantity || 9).map(quantity => (
                            <option key={quantity} value={quantity}>{quantity}</option>
                        ))}
                    </select>
                ) : (
                    <span>
                        {input.value}
                        <input type='hidden' {...input}/>
                    </span>
                )}
            </div>
        )
    }
}

const ProductOptionFields = ({ product, orderItemIndex }) => {
    const { productOption } = product
    if (isEmpty(productOption)) {
        return false
    }

    return (
        <div>
            {productOption.map(productOption => (
                <ProductOption
                    key={productOption.attributeName}
                    propertyPrefix={`childOrderItems[${orderItemIndex}].itemAttributes`}
                    {...productOption}/>
            ))}
        </div>
    )
}

export default ProductAddonFields
