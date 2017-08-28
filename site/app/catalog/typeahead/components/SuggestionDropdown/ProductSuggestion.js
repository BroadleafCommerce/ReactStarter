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
