import React, {Component} from 'react'
import queryString from 'query-string'
import SearchResults from 'catalog/search/components/SearchResults'
import {SearchCapable} from 'catalog/search/decorator/searchCapable'
import {withScrollOnUpdate} from 'core/components/ScrollToTop'

const getSearchParams = props => {
    return queryString.parse(props.location.search)
}

@SearchCapable('/api/catalog/search', getSearchParams)
export class Search extends Component {
    static propTypes = {
        isFetching : React.PropTypes.bool,
        location : React.PropTypes.object.isRequired,
        metadata : React.PropTypes.object,
        results : React.PropTypes.array,
    }

    render() {
        const {isFetching} = this.props
        const {q} = getSearchParams(this.props)
        return <SearchResults
                        key="search"
                        headerTitle={`Search Results for "${q}"`}
                        isLoading={isFetching}
                        {...this.props}/>
    }
}

export default withScrollOnUpdate(Search)
