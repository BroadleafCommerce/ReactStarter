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
