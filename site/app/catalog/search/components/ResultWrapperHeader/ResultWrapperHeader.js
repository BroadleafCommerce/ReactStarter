import React from 'react';
import {Link, Route} from 'react-router-dom'

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
    headerTitle : PropTypes.string,
    isLoading : PropTypes.bool,
    location : PropTypes.object,
    metadata : PropTypes.shape({
        page : PropTypes.number,
        pageSize : PropTypes.number,
        totalResults : PropTypes.number,
        totalPages : PropTypes.number,
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
