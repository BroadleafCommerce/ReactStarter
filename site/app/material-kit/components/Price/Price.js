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
