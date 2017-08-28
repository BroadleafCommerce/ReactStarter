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
