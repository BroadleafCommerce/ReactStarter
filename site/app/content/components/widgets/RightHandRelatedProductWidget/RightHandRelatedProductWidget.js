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
