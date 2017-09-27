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
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import FocusControl from 'material-kit/components/FocusControl'
import SearchInput from 'catalog/search/components/SearchInput'
import { parse } from 'query-string'

class HeaderSearchInput extends Component {

    constructor(props) {
        super(props)

        this.state = {
            value: getQueryValue(props.location)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (getQueryValue(this.props.location) !== getQueryValue(nextProps.location)) {
            this.setState({
                value: getQueryValue(nextProps.location)
            })
        }
    }

    _onChange = e => {
        this.setState({
            value: e.target.value
        })
    }

    _onKeyDown = e => {
        if (e.keyCode === 13) {
            this._onSubmit()
        }
    }

    _onSubmit = () => {
        if (!this.state.value) {
            return false
        }
        this.props.history.push(`/browse?q=${this.state.value}`)
    }

    render() {
        return (
            <FocusControl>
                <SearchInput
                    onChange={this._onChange}
                    onKeyDown={this._onKeyDown}
                    onSubmit={this._onSubmit}
                    value={this.state.value}
                />
            </FocusControl>
        )
    }
}

function getQueryValue(location) {
    return parse(location.search).q || ''
}


export default withRouter(HeaderSearchInput)
