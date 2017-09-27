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
