import React from 'react'
import ProductAddonFields from 'catalog/product/components/ProductAddonFields'

const ProductChildAddons = ({ configureItemRequest }) => {
    if (!configureItemRequest) {
        return null
    }

    return (
        <div>
            {configureItemRequest.childOrderItems.map((item, orderItemIndex) => (
               <ProductAddonFields key={orderItemIndex} orderItemIndex={orderItemIndex} {...item}/>
            ))}
        </div>
    )
}

export default ProductChildAddons
