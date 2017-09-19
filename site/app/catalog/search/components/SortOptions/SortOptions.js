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
import { parse, stringify } from 'query-string'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import Accordion from 'material-kit/components/Accordion'

const SortOptions = ({
    location
}) => {
    const sortOptions = getSortOptions(location)
    return (
        <div id='sort'>
            <span className='card-title'>
                <h4 className='title'>Sort by</h4>
            </span>
            <Accordion collapsed={true}>
                <SortOptionsDropdown sortOptions={sortOptions}/>
            </Accordion>
        </div>
    )
}

const SortOptionsDropdown = ({ collapsed, sortOptions, toggle }) => (
    <div className={classNames({
        'dropdown': true,
        'open': !collapsed
    })}>
        <a href='#' className='dropdown-toggle' onClick={e => {
            e.preventDefault()
            toggle()
        }}>
            {
                sortOptions.filter(option => option.status).map(option => (<span key={option.value || 'current'}>{option.label}</span>))
            }
            <b className='caret'></b>
        </a>
        <ul className='dropdown-menu'>
            {
                sortOptions.filter(option => !option.status).map(option => (
                    <li key={option.value || 'default'}>
                        <Link to={option.actionUrl}>
                            {option.label}
                        </Link>
                    </li>
                ))
            }
        </ul>
    </div>
)

const defaultSortOptions = [
    {
        value: undefined,
        label: 'Best Match',
    },
    {
        value: 'price asc',
        label: 'Price (Low to High)',
    },
    {
        value: 'price desc',
        label: 'Price (High to Low)',
    },
    {
        value: 'name asc',
        label: 'Name (A to Z)',
    },
    {
        value: 'name desc',
        label: 'Name (Z to A)',
    },
]

const getSortOptions = location => {
    const { page, ...searchParams} = parse(location.search)
    const currentSort = searchParams['sort']

    return defaultSortOptions.map(option => ({
        ...option,
        status : option.value === currentSort,
        actionUrl : {
            ...location,
            search : stringify({
                ...searchParams,
                sort : option.value,
            })
        }
    }))
}

export default SortOptions
