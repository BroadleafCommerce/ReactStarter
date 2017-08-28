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
