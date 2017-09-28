import React, { Component } from 'react';
import { connect } from 'react-redux'
import { resolve } from 'core/decorator/reduxResolve'

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
import { Helmet } from 'react-helmet'
import SearchResults from 'catalog/search/components/SearchResults'
import {SearchCapable} from 'catalog/search/decorator/searchCapable'
import {withScrollOnUpdate} from 'core/components/ScrollToTop'
import {fetchSeoProperties} from 'seo/actions'
import {getCategorySeoProperties} from 'seo/selectors'

const getSearchParams = props => {
    const {match : {params : {category}}} = props
    const {q, page, sort, ...filters} = queryString.parse(props.location.search)
    return {q, page, sort, category, ...filters}
}

@withScrollOnUpdate
@SearchCapable('/api/catalog/search', getSearchParams)
export class Category extends Component {
    static propTypes = {
        isFetching : PropTypes.bool, // is currently fetching search data
        location : PropTypes.object.isRequired,
        match : PropTypes.object,
        metadata : PropTypes.object, // search metadata
        results : PropTypes.array, // search result list
    }

    componentWillReceiveProps(nextProps) {
        const { match: oldMatch } = this.props
        const { match: newMatch } = nextProps

        if (oldMatch.url !== newMatch.url) {
            nextProps.fetchSeoProperties({ entityType: 'CATEGORY', entityURI: `/${newMatch.params.category}` })
        }
    }

    render() {
        const { isFetching, location, match, metadata, results, seoProperties } = this.props
        return (
            <div>
                <Helmet titleTemplate='Heat Clinic - %s'>
                    {seoProperties.title && (
                        <title>{seoProperties.title}</title>
                    )}
                    {seoProperties.description && (
                        <meta name="description" content={seoProperties.description} />
                    )}
                </Helmet>
                <SearchResults
                            key="search"
                            headerTitle={seoProperties.title}
                            isLoading={isFetching}
                            match={match}
                            location={location}
                            metadata={metadata}
                            results={results}/>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        seoProperties: getCategorySeoProperties(state, props)
    }
}

const dispatchResolve = (resolver, props) => {
    const params = props.match.params
    resolver.resolve(props.fetchSeoProperties, { entityType: 'CATEGORY', entityURI: `/${params.category}` })
}

export default connect(mapStateToProps, { fetchSeoProperties })(
    resolve(dispatchResolve)(Category)
)
