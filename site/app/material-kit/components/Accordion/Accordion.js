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
