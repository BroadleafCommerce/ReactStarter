import React, {Component} from 'react'
import map from 'lodash/map'
import isEqual from 'lodash/isEqual'
import ResultWrapper from 'catalog/search/components/ResultWrapper'
import ResultList from 'catalog/search/components/ResultList'
import ResultListFooter from 'catalog/search/components/ResultListFooter'
import FacetList from 'catalog/search/components/FacetList'

class SearchResults extends Component {
    static propTypes = {
        location : React.PropTypes.object,
        results : React.PropTypes.array,
        metadata : React.PropTypes.shape({
            page : React.PropTypes.number,
            pageSize : React.PropTypes.number,
            totalResults : React.PropTypes.number,
            totalPages : React.PropTypes.number,
            searchFacet : React.PropTypes.array,
        }),
        headerTitle : React.PropTypes.string,
    }

    static defaultProps = {
        results : [],
        metadata : {},
    }

    render() {
        const {
            headerTitle,
            isLoading,
            location,
            match,
            metadata,
            results
        } = this.props
        return (
            <ResultWrapper
                isLoading={isLoading}
                location={location}
                headerTitle={headerTitle}
                match={match}
                metadata={metadata}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-3'>
                            {!isLoading && (
                                <FacetList searchFacet={metadata.searchFacet}/>
                            )}
                        </div>
                        <div className='col-md-9'>
                            {!isLoading && (
                                <ResultList results={results}/>
                            )}
                            {!isLoading && (
                                <ResultListFooter
                                    location={location}
                                    metadata={metadata}/>
                            )}
                        </div>
                    </div>
                </div>
            </ResultWrapper>
        )
    }
}

const NoResultsFound = ({
    classes,
    headerTitle,
}) => (
    <div className='container'>
        <p>No Results found for {headerTitle}</p>
    </div>
)

export default SearchResults
