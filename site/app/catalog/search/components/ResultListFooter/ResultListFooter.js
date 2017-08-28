import React from 'react'
import range from 'lodash/range'
import {Link} from 'react-router-dom'
import queryString from 'query-string'
import classNames from 'classnames'

export const ResultListFooter = ({
    location,
    metadata,
}) => (
    <div className='pager'>
        <ul className='pagination pagination-primary'>
            {getPageOptions(metadata, location).splice(0,12).map(option => (
                <PageLink
                    key={option.page}
                    {...option}/>
            ))}
        </ul>
    </div>
)

ResultListFooter.propTypes = {
    isLoading : React.PropTypes.bool,
    location : React.PropTypes.object,
    metadata : React.PropTypes.shape({
        page : React.PropTypes.number,
        pageSize : React.PropTypes.number,
        totalResults : React.PropTypes.number,
        totalPages : React.PropTypes.number,
    }),
}

export const PageLink = ({
    actionUrl,
    active,
    page,
}) => (
    <li className={classNames({
        'pagination-arrow': true,
        'active': active,
        'inactive': !active
    })}>
        <Link to={actionUrl}>
            {page}
        </Link>
    </li>
)

const getPageOptions = ({page, totalPages}, location) =>
    range(1, totalPages + 1)
    .map(page => ({
        page,
        active : isActive(page, location),
        actionUrl : getPageActionUrl(page, location),
    }))

const getPageActionUrl = (page, location) => ({
    ...location,
    search : queryString.stringify({
        ...queryString.parse(location.search),
        page,
    })
})

const isActive = (page, location) => {
    const searchParams = queryString.parse(location.search)
    return (searchParams
                && searchParams.page
                && +searchParams.page === +page)
        || (!searchParams.page && page === 1)
}
export default ResultListFooter
