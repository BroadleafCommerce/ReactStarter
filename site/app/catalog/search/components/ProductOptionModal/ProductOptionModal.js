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
