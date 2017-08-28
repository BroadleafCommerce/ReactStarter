import React from 'react'
import RelatedProductList from 'catalog/relatedproduct/components/RelatedProductList'

const RightHandRelatedProductWidget = ({
    sc,
    categoryKey,
    productKey,
}) => (
    <RelatedProductList
        categoryKey={categoryKey}
        productKey={productKey}
        quantity={+sc.values.relatedProductsMaxNum}
        type={sc.values.relatedProductsType}
        headerText={sc.values.headerText}/>
)

RightHandRelatedProductWidget.propTypes = {
    sc: React.PropTypes.object,
    categoryKey: React.PropTypes.string,
    productKey: React.PropTypes.string,
}


export default RightHandRelatedProductWidget
