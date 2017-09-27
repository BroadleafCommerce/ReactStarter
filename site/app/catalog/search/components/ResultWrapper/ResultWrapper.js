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
import { withRouter } from 'react-router-dom'
import Breadcrumbs from 'catalog/breadcrumbs/components/Breadcrumbs'
import ResultWrapperHeader from 'catalog/search/components/ResultWrapperHeader'
import RightHandRelatedProductWidget from 'content/components/widgets/RightHandRelatedProductWidget'

export const ResultWrapper = ({
    children,
    isLoading,
    headerTitle,
    location,
    match,
    metadata,
}) => (
    <section id="result-wrapper" className='ecommerce-page'>

        {match && match.params.category && (
            <div className='row'>
                <div className='container'>
                    <Breadcrumbs entityType='CATEGORY' entityURI={`/${match.params.category}`}/>
                </div>
            </div>
        )}

        <ResultWrapperHeader
                isLoading={isLoading}
                headerTitle={headerTitle}
                location={location}
                metadata={metadata}/>
        {children}
        {!!match && !!match.params.category && (
            <div className='row'>
                <div className='container'>
                    <RightHandRelatedProductWidget
                        categoryKey={match.params.category}
                        sc={{
                            values: {
                                headerText: 'Featured Products',
                                relatedProductsMaxNum: 3,
                                relatedProductsType: 'FEATURED',
                            }
                        }}
                    />
                </div>
            </div>
        )}
    </section>
)

ResultWrapper.propTypes = {
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

export default withRouter(ResultWrapper)
