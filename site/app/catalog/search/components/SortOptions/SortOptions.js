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
