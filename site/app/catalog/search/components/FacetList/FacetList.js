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
import filter from 'lodash/filter'
import map from 'lodash/map'
import {NavLink, withRouter} from 'react-router-dom'
import queryString from 'query-string'
import Facet from 'catalog/search/components/Facet'
import SortOptions from 'catalog/search/components/SortOptions'
import RightHandBannerWidget from 'content/components/widgets/RightHandBannerWidget'
import './FacetList.scss'

export const FacetList = ({
    location,
    searchFacet = [],
}) => (
    <div className='ecommerce-page'>
        <div className='card card-refine card-plain'>
            <div className='card-content'>
                <SortOptions location={location}/>

                <h4 className='card-title'>Filter Your Results</h4>

                {
                    map(
                        searchFacet,
                        (facet, index) => <Facet
                                    key={facet.fieldName}
                                    index={index}
                                    location={location}
                                    {...facet}/>
                    )
                }
            </div>
        </div>

        <RightHandBannerWidget
            sc={{
                values: {
                    imageUrl: '/img/rhs-ad.jpg',
                    targetUrl: '/browse/hot-sauces',
                }
            }}
        />
    </div>
)

export default withRouter(FacetList)
