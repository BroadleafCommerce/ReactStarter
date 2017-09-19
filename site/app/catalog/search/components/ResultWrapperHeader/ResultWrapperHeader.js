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
