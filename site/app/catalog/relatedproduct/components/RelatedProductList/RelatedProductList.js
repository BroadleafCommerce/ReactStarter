import React, {Component} from 'react'
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
        headerText: React.PropTypes.string,
        relatedProducts: React.PropTypes.array,
        categoryKey: React.PropTypes.string,
        productKey: React.PropTypes.string,
        quantity: React.PropTypes.number,
        type: React.PropTypes.string,
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
