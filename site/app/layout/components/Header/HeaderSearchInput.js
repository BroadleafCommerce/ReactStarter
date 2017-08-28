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
