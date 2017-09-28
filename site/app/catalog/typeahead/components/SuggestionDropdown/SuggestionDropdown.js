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
import KeywordSuggestion from './KeywordSuggestion'
import CategorySuggestion from './CategorySuggestion'
import ProductSuggestion from './ProductSuggestion'
import './SuggestionDropdown.scss'
import classNames from 'classnames'

class SuggestionDropdown extends PureComponent {
    static propTypes = {
        query: PropTypes.string,
        keywords: PropTypes.array,
        products: PropTypes.array,
        categories: PropTypes.array,
        selectedIndex: PropTypes.number,
        visible: PropTypes.bool,
    }

    static defaultProps = {
        ...PureComponent.defaultProps,
        query: '',
        keywords: [],
        products: [],
        categories: [],
        selectedIndex: undefined,
        visible: false
    }

    render() {
        const { categories, keywords, products, selectedIndex, visible, onMouseEnter, onMouseLeave, onSubmitSuggestion } = this.props
        const hasSuggestions = !!(keywords.length + products.length + categories.length)
        return (
            <ul className='nav navbar-nav' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                <li className={classNames({
                    dropdown: true,
                    open: visible && hasSuggestions
                })}>
                    <ul className='dropdown-menu' styleName='SuggestionDropdownMenu'>
                        <li className='col-sm-3'>
                            <ul styleName='SuggestionDropdownList'>
                                {keywords.map((props, index) => (
                                    <KeywordSuggestion
                                        key={index}
                                        active={selectedIndex === index}
                                        onSubmitSuggestion={onSubmitSuggestion}
                                        {...props}/>
                                ))}
                            </ul>
                        </li>
                        <li className='col-sm-4'>
                            <h4 className='title'>Categories</h4>
                            <ul styleName='SuggestionDropdownList'>
                                {categories.map((props, index) => (
                                    <CategorySuggestion
                                        key={index}
                                        active={selectedIndex === (keywords.length + index)}
                                        onSubmitSuggestion={onSubmitSuggestion}
                                        {...props}/>
                                ))}
                            </ul>
                        </li>
                        <li className='col-sm-5'>
                            <h4 className='title'>Products</h4>
                            <ul styleName='SuggestionDropdownList'>
                                {products.map((props, index) => (
                                    <ProductSuggestion
                                        key={index}
                                        active={selectedIndex === (keywords.length + categories.length + index)}
                                        onSubmitSuggestion={onSubmitSuggestion}
                                        {...props}/>
                                ))}
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        )
    }
}

export default SuggestionDropdown
