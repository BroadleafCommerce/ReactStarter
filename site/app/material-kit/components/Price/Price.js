import React from 'react'
import { format } from 'layout/util/moneyUtils'
import classNames from 'classnames'

const Price = ({
    className,
    component: PriceComponent = 'span',
    price,
    retailPrice,
    salePrice,
}) => {
    let originalPrice = retailPrice || price
    const onSale = salePrice && salePrice !== originalPrice;
    const classes = {
        price: true
    }

    if (className) {
        classes[className] = true
    }

    return (
        <PriceComponent className={classNames(classes)}>
            {onSale ? <span className='price-old'>{format(originalPrice)}</span> : ''}
            <span className={classNames({ 'price-new': onSale })}>{format(salePrice || originalPrice)}</span>
        </PriceComponent>
    )
}

export default Price
