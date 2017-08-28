import React, {Component} from 'react'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import queryString from 'query-string'
import {resolve} from 'core/decorator/reduxResolve'
import {fetchSearch} from 'catalog/search/actions'
import {buildKey} from 'catalog/search/reducers'

/**
 * This decorator enables a component to have search capabilities. This decorator
 * takes one parameter, a function {getSearchParams} which is used to get the
 * search parameters from the component's props. Typically this involved just
 * grabbing the query parameters from the location object, but for pages like
 * the Category page, this may involve adding the {:category} key to the filters.
 *
 * getSearchParams should return an object with four values:
 * {
 *     q : '*:*' // the query string,
 *     page : undefined // the current page number
 *     sort : undefined // the current sort
 *     ...filters // any additional filters or facets
 * }
 *
 * @param {function} getSearchParams [description]
 */
export function SearchCapable(uri, getSearchParams) {
    const fetchData = (props) => {
        const {fetchSearch} = props
        return fetchSearch(uri, getSearchParams(props))
    }

    return function decorate(DecoratingComponent) {

        @withRouter
        @connect(({
            search,
            entities,
        }, props) => {
            const searchKey = buildKey(getSearchParams(props))

            if (!search[searchKey]) {
                return {
                    isFetching : true,
                }
            }

            const {metadata, ids, isFetching} = search[searchKey]

            return {
                isFetching,
                metadata,
                results : !isEmpty(ids) ? ids.map(id => entities.products[id]) : []
            }
        }, {fetchSearch})
        @resolve((resolver, props) => {
            resolver.resolve(() => fetchData(props))
        })
        class DecoratedComponent extends Component {
            static propTypes = {
                isFetching : React.PropTypes.bool,
                location : React.PropTypes.object.isRequired,
                metadata : React.PropTypes.shape({
                    page : React.PropTypes.number,
                    pageSize : React.PropTypes.number,
                    totalResults : React.PropTypes.number,
                    totalPages : React.PropTypes.number,
                    searchFacet : React.PropTypes.array,
                }),
                results : React.PropTypes.array,
            }

            componentWillReceiveProps(nextProps) {
                if (!isEqual(
                    getSearchParams(this.props),
                    getSearchParams(nextProps))) {
                    fetchData(nextProps)
                }
            }

            shouldComponentUpdate(nextProps) {
                return !nextProps.isFetching && !isEmpty(nextProps.metadata)
            }

            render() {
                return <DecoratingComponent {...this.props} />;
            }
        }

        return DecoratedComponent;
    }
}
