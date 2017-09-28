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
