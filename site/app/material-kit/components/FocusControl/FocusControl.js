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
