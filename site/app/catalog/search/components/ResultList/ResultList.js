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

import React from 'react';
import ResultListItem from 'catalog/search/components/ResultListItem'
import './ResultList.scss'

export const ResultList = ({
    numberPerRow = 3,
    results = [],
}) => (
    <div styleName='ResultList' className='row'>
        {results.map(result =>
            <div key={result.id} className={`col-md-${12/numberPerRow | 0}`}>
                <ResultListItem {...result}/>
            </div>
        )}
    </div>
)

ResultList.propTypes = {
    numberPerRow: PropTypes.number,
    results : PropTypes.arrayOf(PropTypes.object)
}

export default ResultList
