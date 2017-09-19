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

class Accordion extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            collapsed: this.props.collapsed
        }
    }

    _toggle = flag => {
        if (flag !== undefined) {
            this.setState({
                collapsed: flag
            })
        } else {
            this.setState({
                collapsed: !this.state.collapsed
            })
        }
    }

    render() {
        return React.Children.only(
            React.cloneElement(this.props.children, {
                toggle: this._toggle,
                collapsed: this.state.collapsed
            })
        )
    }
}

export const withToggleControls = DecoratingComponent => {
    return class DecoratedComponent extends PureComponent {
        static defaultProps = {
            collapsed: true
        }

        constructor(props) {
            super(props)

            this.state = {
                collapsed: this.props.collapsed
            }
        }

        _toggle = flag => {
            if (flag !== undefined) {
                this.setState({
                    collapsed: flag
                })
            } else {
                this.setState({
                    collapsed: !this.state.collapsed
                })
            }
        }

        render() {
            return (<DecoratingComponent {...this.props} collapsed={this.state.collapsed} toggle={this._toggle}/>)
        }
    }
}

export default Accordion
