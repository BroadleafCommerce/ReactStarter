import React from 'react'
import isEmpty from 'lodash/isEmpty'
import ProductOption from 'catalog/product/components/ProductOption'

const ProductOptions = ({ productOption }) => {
    if (isEmpty(productOption)) {
        return false
    }

    return (
        <div>
            {productOption.map(productOption => (
                <ProductOption
                    key={productOption.attributeName}
                    {...productOption}/>
            ))}
        </div>
    )
}

export default ProductOptions
