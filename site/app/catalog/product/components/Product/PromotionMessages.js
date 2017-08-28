import React from 'react'
import union from 'lodash/union'

const PromotionMessages = ({ promotionMessages }) => {
    if (!promotionMessages) {
        return false
    }

    const { EVERYWHERE = [], PRODUCT_DETAIL = [] } = promotionMessages

    const consolidatedMessages = union(EVERYWHERE, PRODUCT_DETAIL)

    return (
        <div>
            {consolidatedMessages.map((promotionMessage, index) => (
                <PromotionMessage key={index} {...promotionMessage}/>
            ))}
        </div>
    )
}

const PromotionMessage = ({ message }) => (
    <div className='promotion-message'>{message}</div>
)

export default PromotionMessages
