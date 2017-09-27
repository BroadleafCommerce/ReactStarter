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
import React, {Component} from 'react'
import get from 'lodash/get'
import set from 'lodash/set'
import {reduxForm} from 'redux-form'
import FormModal from 'layout/components/FormModal'
import ProductOption from 'catalog/product/components/ProductOption'
import './ProductOptionModal.scss'

class ProductOptionModal extends Component {
    render() {
        const { isOpened, handleSubmit, onClose, name, productOption = [], reset } = this.props
        return (
            <FormModal
                isOpened={isOpened}
                onClose={() => {
                    reset()
                    onClose()
                }}
                handleSubmit={handleSubmit}>
                <div styleName='ProductOptionModal'>
                    <h2 styleName='ProductOptionModal__header'>
                        {name}
                    </h2>
                    {productOption.map(ProductOption)}
                    <button
                        styleName='ProductOptionModal__submit'
                        type='submit'>
                        Add To Cart
                    </button>
                </div>
            </FormModal>
        )
    }
}

ProductOptionModal = reduxForm({
    form: 'ProductOptionModal',
    validate: (form, {productOption}) => {
        const errors = {}
        productOption.forEach(({attributeName, required}) => {
            if (required && !get(form, attributeName)) {
                set(errors, attributeName, 'Required')
            }
        })
        return errors
    }
})(ProductOptionModal)

export default ProductOptionModal
