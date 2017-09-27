import React, { Component } from 'react';

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
        isFetching : PropTypes.bool,
        location : PropTypes.object.isRequired,
        metadata : PropTypes.object,
        results : PropTypes.array,
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
