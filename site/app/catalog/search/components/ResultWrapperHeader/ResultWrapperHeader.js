import React from 'react'
import {Link, Route} from 'react-router-dom'
import queryString from 'query-string'
import classNames from 'classnames'
import './ResultWrapperHeader.scss'

export const ResultWrapperHeader = ({
    headerTitle,
    location,
    metadata,
}) => (
    <div className='row' styleName='ResultWrapperHeader'>
        <div className='container' styleName='ResultWrapperHeader__container'>
            <h2 className='ResultWrapperHeader__title'>
                {headerTitle}
            </h2>
            <span className='pull-right small-text' styleName='ResultWrapperHeader__results-counter'>
                {getResultStart(metadata)} - {getResultEnd(metadata)} of {metadata.totalResults}
            </span>
        </div>
    </div>
)

ResultWrapperHeader.propTypes = {
    headerTitle : React.PropTypes.string,
    isLoading : React.PropTypes.bool,
    location : React.PropTypes.object,
    metadata : React.PropTypes.shape({
        page : React.PropTypes.number,
        pageSize : React.PropTypes.number,
        totalResults : React.PropTypes.number,
        totalPages : React.PropTypes.number,
    }),
}

const getResultStart = ({page, pageSize}) => (page - 1) * pageSize + 1
const getResultEnd = ({page, pageSize, totalResults}) => Math.min(page * pageSize, totalResults)

const defaultSortOptions = [
    {
        fieldName : 'price',
        label : 'Price',
    },
    {
        fieldName : 'name',
        label : 'Name',
    }
]



export default ResultWrapperHeader
