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
