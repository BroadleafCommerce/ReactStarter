import React, { PureComponent } from 'react'

class FocusControl extends PureComponent {
    state = {
        focused: false,
    }

    _onFocus = e => {
        this.setState({
            focused: true
        })

        const { children } = this.props
        if (children.props.onFocus) {
            children.props.onFocus(e)
        }
    }

    _onBlur = e => {
        this.setState({
            focused: false
        })

        const { children } = this.props
        if (children.props.onBlur) {
            children.props.onBlur(e)
        }
    }

    render() {
        const { children } = this.props
        return React.Children.only(
            React.cloneElement(children, {
                focused: this.state.focused,
                onFocus: this._onFocus,
                onBlur: this._onBlur
            })
        )
    }
}

export default FocusControl
