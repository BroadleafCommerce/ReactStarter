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
