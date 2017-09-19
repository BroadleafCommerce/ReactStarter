/*
 * #%L
 * React Site Starter
 * %%
 * Copyright (C) 2009 - 2017 Broadleaf Commerce
 * %%
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *       http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
