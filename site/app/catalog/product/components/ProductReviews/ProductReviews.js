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
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchRatingSummaryForProduct, addReviewForProduct } from 'catalog/product/actions'
import { getRatingSummaryForProduct } from 'catalog/product/selectors'
import { isAnonymous } from 'auth/selectors'
import formatDate from 'date-fns/format'
import range from 'lodash/range'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import Button from 'material-kit/components/Button'
import ReviewForm from './ReviewForm'
import './ProductReviews.scss'

class ProductReviews extends PureComponent {
    static propTypes = {
        anonymous: PropTypes.bool,
        averageRating: PropTypes.number,
        currentCustomerReview: PropTypes.object,
        id: PropTypes.number,
        isFetching: PropTypes.bool,
        numberOfReviews: PropTypes.number,
        productId: PropTypes.number,
        review: PropTypes.array,
    }

    static defaultProps = {
        review: []
    }

    state = {
        reviewFormVisible: false
    }

    componentWillMount() {
        this.props.fetchRatingSummaryForProduct(this.props.productId)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.productId !== nextProps.productId) {
            this.props.fetchRatingSummaryForProduct(nextProps.productId)
        }
    }

    _toggleReviewForm = reviewFormVisible => this.setState({ reviewFormVisible })

    _handleReviewSubmit = form => {
        this.props.addReviewForProduct(this.props.productId, form)
    }

    render() {
        const { anonymous, averageRating, currentCustomerReview, id, isFetching, numberOfReviews, review } = this.props

        return (
            <div className='row'>
                {id && (
                    <div id='community-review-section'>
                        <h3>Community Rating</h3>
                        <div id='community-rating-container'>
                            <StarRating rating={averageRating}/>
                            <span className='total-reviews'>
                                &nbsp;&nbsp;&nbsp;( <span>{numberOfReviews}</span> {numberOfReviews === 1 ? 'review' : 'reviews'} )
                            </span>
                        </div>

                        {currentCustomerReview && (
                            <div>
                                <h4>Your Review</h4>
                                <Review className='your-review-body' {...currentCustomerReview}/>
                            </div>
                        )}

                        <div className='helpful-reviews'>
                            <h4>Customer Reviews</h4>
                            <ul className='customer-reviews'>
                                {review.slice(0, 5).map(review => <Review wrapper='li' key={review.id} {...review}/>)}
                            </ul>
                        </div>

                    </div>
                )}

                {!anonymous ? (
                    <div className='text-center-mobile margin-top-mobile'>
                        {!currentCustomerReview && (
                            <Button sm onClick={e => this._toggleReviewForm(true)}>
                                {id ? 'Create a review' : 'Be the first to write a review!'}
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className='text-center-mobile margin-top-mobile'>
                        <Button sm component={Link} componentProps={{ to: '/login' }}>
                            {id ? 'Login to create a review' : 'Login and be the first to write a review!'}
                        </Button>
                    </div>
                )}

                {this.state.reviewFormVisible && !anonymous && !currentCustomerReview && (
                    <ReviewForm onSubmit={this._handleReviewSubmit}/>
                )}

            </div>
        )
    }
}

const Review = ({ author, className, helpfulCount, notHelpfulCount, ratingDetail, reviewSubmittedDate, reviewText, wrapper: Wrapper = 'div' }) => (
    <Wrapper className={className}>
        {(notHelpfulCount + helpfulCount) > 0 && (
            <p className='voting-summary'>
                <FormattedMessage
                    id='product.reviewHelpful'
                    description='Was this review helpful or not?'
                    defaultMessage='{0} of {1} found the following review helpful'
                    values={{
                        '0': helpfulCount,
                        '1': helpfulCount + notHelpfulCount
                    }}/>
            </p>
        )}
        <StarRating rating={ratingDetail.rating}/>
        <br />
        <blockquote className='reviewer-info'>
            {reviewText && (<p>{reviewText}</p>)}
            <small>
                &nbsp;<span>by</span>&nbsp;<span className="penname">{author}</span>
                <span>&nbsp;on&nbsp;</span>
                <span >{formatDate(reviewSubmittedDate, 'MMMM DD, YYYY')}</span>
            </small>
        </blockquote>
    </Wrapper>
)

const [EMPTY, HALF, FULL] = ['star_border', 'star_half', 'star']
const StarRating = ({ rating }) => {
    const trueCount = Math.round(rating*2)/2
    const fullCount = Math.floor(rating)
    const emptyCount = Math.floor(5 - trueCount)
    const fullRange = range(0, fullCount) || []
    const emptyRange = range(0, emptyCount) || []
    const isHalf = (fullCount + emptyCount) !== 5
    return (
        <span>
            {fullRange.map(num => (<i key={num + FULL} className='material-icons'>{FULL}</i>))}
            {isHalf && (<i className='material-icons'>{HALF}</i>)}
            {emptyRange.map(num => (<i key={num + EMPTY} className='material-icons'>{EMPTY}</i>))}
        </span>
    )
}

const mapStateToProps = (state, props) => {
    const ratingSummary = getRatingSummaryForProduct(state, props)
    const anonymous = isAnonymous(state)

    return {
        ...ratingSummary,
        anonymous,
    }
}

export default connect(mapStateToProps, { addReviewForProduct, fetchRatingSummaryForProduct })(ProductReviews)
