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
