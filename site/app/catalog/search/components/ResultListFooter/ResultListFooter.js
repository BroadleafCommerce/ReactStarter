import React from 'react';
import range from 'lodash/range'
import {Link} from 'react-router-dom'

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
    isLoading : PropTypes.bool,
    location : PropTypes.object,
    metadata : PropTypes.shape({
        page : PropTypes.number,
        pageSize : PropTypes.number,
        totalResults : PropTypes.number,
        totalPages : PropTypes.number,
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
