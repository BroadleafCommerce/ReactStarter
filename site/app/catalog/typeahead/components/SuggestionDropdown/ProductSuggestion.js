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
import { NavLink } from 'react-router-dom'
import Price from 'material-kit/components/Price'
import classNames from 'classnames'
import './SuggestionDropdown.scss'

const ProductSuggestion = ({
    active,
    mediaUrl,
    retailPrice,
    salePrice,
    suggestion,
    url,
    onSubmitSuggestion
}) => {
    const onSale = salePrice !== retailPrice;
    return (
        <li styleName='Suggestion' className='card-product'>
            <NavLink
                styleName={active ? 'Suggestion__link--active' : 'Suggestion__link'}
                className={classNames({
                    'btn': true,
                    'btn-primary': true,
                    'btn-simple': !active
                })}
                onClick={e => {
                    e.preventDefault()
                    onSubmitSuggestion(url)
                    return false
                }}
                to={`/browse${url}`}>
                <img src={mediaUrl}/>
                <h5>{suggestion}</h5>
                <Price
                    styleName='Suggestion__link__prices'
                    retailPrice={retailPrice}
                    salePrice={salePrice}
                />
            </NavLink>
        </li>
    )
}
export default ProductSuggestion
