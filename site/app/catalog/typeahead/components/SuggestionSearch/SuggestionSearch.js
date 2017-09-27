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
import { parse } from 'query-string'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchSuggestions, clearCurrentSearch } from 'catalog/typeahead/actions'
import { getKeywords, getCategories, getProducts } from 'catalog/typeahead/selectors'
import Button from 'material-kit/components/Button'
import FocusControl from 'material-kit/components/FocusControl'
import SuggestionDropdown from 'catalog/typeahead/components/SuggestionDropdown'
import SuggestionInput from 'catalog/search/components/SearchInput'
import classNames from 'classnames'

class SuggestionSearch extends PureComponent {
    static propTypes = {
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        keywords: PropTypes.array,
        categories: PropTypes.array,
        products: PropTypes.array,
        name: PropTypes.string.isRequired,
    }

    static defaultProps = {
        keywords: [],
        categories: [],
        products: [],
        name: 'Demo Type Ahead'
    }

    constructor(props) {
        super(props)

        this.state = {
            value: getQueryValue(this.props.location),
            visible: false,
            selectedIndex: undefined,
            hoveringOnDropdown: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (getQueryValue(this.props.location) !== getQueryValue(nextProps.location)) {
            this.setState({
                value: getQueryValue(nextProps.location),
                visible: false,
                selectedIndex: undefined,
            })
        }
    }

    _onChange = (e) => {
        e.persist()
        this.setState({
            value: e.target.value,
            visible: !!e.target.value,
            selectedIndex: undefined,
        }, () => {
            if (this.state.value && this.state.value.length > 1) {
                this.props.fetchSuggestions('Demo Type Ahead', this.state.value, ['keywords', 'products', 'categories'])
            }
        })
    }

    _onFocus = (e) => {
        this.setState({
            visible: true,
            selectedIndex: undefined,
        })
    }

    _onBlur = (e) => {
        if (this.state.hoveringOnDropdown) {
            e.target.focus()
        } else {
            this.setState({
                visible: false,
                selectedIndex: undefined,
            })
        }
    }

    _onKeyDown = (e) => {
        const { selectedIndex } = this.state
        const { keywords, categories, products } = this.props
        const suggestions = [].concat(keywords, categories, products) // flatten suggestions into single array
        const length = suggestions.length

        // 1. check if key down or up and if suggestions (update selectedIndex)
        if (e.keyCode === 40) { // arrow down
            e.preventDefault()
            switch(selectedIndex) {
                case undefined:
                this.setState({
                    selectedIndex: 0
                })
                break;
                case length - 1:
                this.setState({
                    selectedIndex: undefined
                })
                break;
                default:
                this.setState({
                    selectedIndex: selectedIndex + 1
                })
            }
        }

        if (e.keyCode === 38) { // arrow up
            e.preventDefault()
            switch(selectedIndex) {
                case undefined:
                this.setState({
                    selectedIndex: length - 1
                })
                break;
                case 0:
                this.setState({
                    selectedIndex: undefined
                })
                break;
                default:
                this.setState({
                    selectedIndex: selectedIndex - 1
                })
            }
        }

        if (selectedIndex !== undefined) {
            if (e.keyCode === 37) { // arrow left
                e.preventDefault()
                this.setState({
                    selectedIndex: getPreviousColumn(selectedIndex, keywords.length, categories.length, products.length)
                })
            }

            if (e.keyCode === 39) { // arrow right
                e.preventDefault()
                this.setState({
                    selectedIndex: getNextColumn(selectedIndex, keywords.length, categories.length, products.length)
                })
            }
        }

        // 2. check if enter key is pressed (call onSubmit)
        if (e.keyCode === 13) {
            if (selectedIndex === undefined) {
                this._onSubmitSearch()
            } else {
                this._onSubmitSuggestion(suggestions[selectedIndex].url)
            }
        }
    }

    _onHoverDropdown = e => {
        e.stopPropagation();
        this.setState({
            hoveringOnDropdown: true,
        })
    }

    _onHoverLeaveDropdown = e => {
        e.stopPropagation();
        this.setState({
            hoveringOnDropdown: false
        })
    }

    _onSubmitSearch = () => {
        if (!this.state.value) {
            return false
        }
        this._onSubmitSuggestion(`/browse?q=${this.state.value}`)
    }

    _onSubmitSuggestion = url => {
        const { history } = this.props
        const comp = url.split('?')

        this.setState({
            hoveringOnDropdown: false
        }, () => {
            history.push({
                pathname : `/browse${comp[0]}`,
                search: `?${comp[1] || ''}`
            })
            this.props.clearCurrentSearch('Demo Type Ahead')
        })
    }

    render() {
        const { keywords, categories, products } = this.props
        const { value, visible, selectedIndex, hoveringOnDropdown } = this.state
        return (
            <div>
                <FocusControl>
                    <SuggestionInput
                        value={value}
                        onChange={this._onChange}
                        onFocus={this._onFocus}
                        onBlur={this._onBlur}
                        onKeyDown={this._onKeyDown}
                        onSubmit={this._onSubmitSearch}
                    />
                </FocusControl>
                <SuggestionDropdown
                    onMouseEnter={this._onHoverDropdown}
                    onMouseLeave={this._onHoverLeaveDropdown}
                    onSubmitSuggestion={this._onSubmitSuggestion}
                    query={value}
                    keywords={keywords}
                    categories={categories}
                    products={products}
                    selectedIndex={!hoveringOnDropdown ? selectedIndex : undefined}
                    visible={visible}
                />
            </div>
        )
    }
}

function getPreviousColumn(selectedIndex, keywordsLength, categoriesLength, productsLength) {
    if (selectedIndex < keywordsLength) {
        return keywordsLength + categoriesLength
    }

    if (selectedIndex < keywordsLength + categoriesLength) {
        return 0
    }

    return keywordsLength
}

function getNextColumn(selectedIndex, keywordsLength, categoriesLength, productsLength) {
    if (selectedIndex < keywordsLength) {
        return keywordsLength
    }

    if (selectedIndex < keywordsLength + categoriesLength) {
        return keywordsLength + categoriesLength
    }

    return 0
}

function getQueryValue(location) {
    return parse(location.search).q || ''
}

const mapStateToProps = (state, props) => {
    return {
        keywords: getKeywords(state, props),
        categories: getCategories(state, props),
        products: getProducts(state, props)
    }
}

export default withRouter(connect(mapStateToProps, { fetchSuggestions, clearCurrentSearch })(SuggestionSearch))
