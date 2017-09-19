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
