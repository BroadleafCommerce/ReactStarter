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
