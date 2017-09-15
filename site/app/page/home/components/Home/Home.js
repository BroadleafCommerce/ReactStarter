import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import connectPage from 'page/common/decorators/connectPage'
import { withScroll } from 'core/components/ScrollToTop'
import {SearchCapable} from 'catalog/search/decorator/searchCapable'
import { Helmet } from 'react-helmet'
import ResultList from 'catalog/search/components/ResultList'
import BannerAdCarouselWidget from 'content/components/widgets/BannerAdCarouselWidget'
import HomeMiddlePromoWidget from 'content/components/widgets/HomeMiddlePromoWidget'
import queryString from 'query-string'
import './Home.scss'

const Home = ({
    isFetching,
    results,
    seoProperties,
}) => {
    const resultList = (
        <ResultList
            numberPerRow={4}
            results={results}
        />
    )

    return (
        <div styleName='Home' className='container-fluid'>
            <Helmet titleTemplate='Heat Clinic - %s'>
                {seoProperties.title ? (
                    <title>{seoProperties.title}</title>
                ) : (
                    <title>Home</title>
                )}
                {seoProperties.description ? (
                    <meta name='description' content={seoProperties.description}/>
                ) : (
                    <meta name='description' content='Home'/>
                )}
            </Helmet>

            <BannerAdCarouselWidget
                mcs={[]}
                scs={[{
                    id: 0,
                    values: {
                        imageUrl: '/cmsstatic/img/banners/shirt-special.jpg',
                        targetUrl: '/browse/merchandise',
                    }
                }]}
            />

            <div className='container'>
                <HomeMiddlePromoWidget
                    sc={{
                        values: {
                            htmlContent: `
                                <div id="home_feature">
                                    <h2>HOT SAUCE AFICIONADO?</h2> Click to join our Heat Clinic Frequent Care Program. The place to get all the deals on burn treatment.
                                </div>
                            `
                        }
                    }}
                />

                <hr/>

                <div className='row'>
                    <h3 className='text-center'>
                        {`The Heat Clinic's Top Selling Sauces`}
                    </h3>
                    {resultList}
                </div>
            </div>
        </div>
    )
}

const getSearchParams = props => {
    const {q, page, sort, ...filters} = queryString.parse(props.location.search)
    return {q, page, sort, category: "", ...filters}
}

export default withScroll(
    connectPage(
        SearchCapable('/api/catalog/search', getSearchParams)(Home)
    )
)
