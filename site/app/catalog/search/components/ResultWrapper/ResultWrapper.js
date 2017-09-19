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

export default withRouter(ResultWrapper)
