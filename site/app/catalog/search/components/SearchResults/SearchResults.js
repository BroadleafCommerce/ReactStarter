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
import map from 'lodash/map'
import isEqual from 'lodash/isEqual'
import ResultWrapper from 'catalog/search/components/ResultWrapper'
import ResultList from 'catalog/search/components/ResultList'
import ResultListFooter from 'catalog/search/components/ResultListFooter'
import FacetList from 'catalog/search/components/FacetList'

class SearchResults extends Component {
    static propTypes = {
        location : PropTypes.object,
        results : PropTypes.array,
        metadata : PropTypes.shape({
            page : PropTypes.number,
            pageSize : PropTypes.number,
            totalResults : PropTypes.number,
            totalPages : PropTypes.number,
            searchFacet : PropTypes.array,
        }),
        headerTitle : PropTypes.string,
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
