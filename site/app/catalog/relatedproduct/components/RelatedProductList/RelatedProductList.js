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
import PropTypes from 'prop-types';

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { resolve } from 'core/decorator/reduxResolve'
import { fetchRelatedProducts } from 'catalog/relatedproduct/actions'
import ResultList from 'catalog/search/components/ResultList'

const RelatedProductList = ({
    headerText,
    relatedProducts = []
}) => (
    <div className='related-products show-top-border'>
        <h3 className='title text-center'>
            {headerText}
        </h3>
        <ResultList results={relatedProducts} numberPerRow={4}/>
    </div>
)

class RelatedProductListContainer extends Component {
    static propTypes = {
        headerText: PropTypes.string,
        relatedProducts: PropTypes.array,
        categoryKey: PropTypes.string,
        productKey: PropTypes.string,
        quantity: PropTypes.number,
        type: PropTypes.string,
    }

    componentWillReceiveProps(nextProps) {
        const { categoryKey: oldCategoryKey, productKey: oldProductKey } = this.props
        const { categoryKey, productKey, quantity, type } = nextProps
        if (oldCategoryKey !== categoryKey || oldProductKey !== productKey) {
            nextProps.fetchRelatedProducts({ categoryKey, productKey, quantity, type })
        }
    }

    render() {
        const { headerText, relatedProducts = [] } = this.props
        if (!relatedProducts.length) {
            return <div/>
        }
        return <RelatedProductList headerText={headerText} relatedProducts={relatedProducts}/>
    }
}

const mapStateToProps = (state, { productKey, categoryKey, ...rest}) => {
    if (productKey) {
        return mapProductStateToProps(state, { productKey, ...rest })
    } else {
        return mapCategoryStateToProps(state, { categoryKey, ...rest })
    }
}

const mapCategoryStateToProps = ({ entities, relatedProductsByCategory }, { categoryKey }) => {
    if (!relatedProductsByCategory[categoryKey]) {
        return { isFetching: true }
    }

    const { isFetching, productIds } = relatedProductsByCategory[categoryKey]

    if (!productIds) {
        return { isFetching }
    }

    return {
        isFetching,
        relatedProducts: productIds.map(productId => entities.products[productId]) || [],
    }
}

const mapProductStateToProps = ({ entities, relatedProductsByProduct }, { productKey }) => {
    if (!relatedProductsByProduct[productKey]) {
        return { isFetching: true }
    }

    const { isFetching, productIds } = relatedProductsByProduct[productKey]

    if (!productIds) {
        return { isFetching }
    }

    return {
        isFetching,
        relatedProducts: productIds.map(productId => entities.products[productId]) || [],
    }
}

const resolveData = (resolver, props) => {
    const { categoryKey, productKey, quantity, type, fetchRelatedProducts } = props
    return resolver.resolve(() => fetchRelatedProducts({ categoryKey, productKey, quantity, type }))
}

export default connect(mapStateToProps, { fetchRelatedProducts })(resolve(resolveData)(RelatedProductListContainer))
