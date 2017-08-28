import React, { PureComponent } from 'react'
import Ink from 'react-ink'

class Button extends PureComponent {
    _getClassName = () => {
        const styles = []

        const { className } = this.props
        if (className) {
            styles.push(className)
        }

        styles.push('btn')

        // Color
        const { danger, info, primary, success, warning } = this.props

        if (primary) {
            styles.push('btn-primary')
        } else if (danger) {
            styles.push('btn-danger')
        } else if (success) {
            styles.push('btn-success')
        } else if (warning) {
            styles.push('btn-warning')
        } else if (info) {
            styles.push('btn-info')
        } else {
            styles.push('btn-default')
        }

        // Size
        const { lg, sm, xs } = this.props

        if (lg) {
            styles.push('btn-lg')
        } else if (sm) {
            styles.push('btn-sm')
        } else if (xs) {
            styles.push('btn-xs')
        }

        // Style
        const { fab, bordered, icon, round, simple } = this.props

        if (bordered) {
            styles.push('btn-bordered')
        }

        if (fab) {
            styles.push('btn-fab')
            styles.push('btn-fab-mini')
        }

        if (icon) {
            styles.push('btn-just-icon')
        }

        if (round) {
            styles.push('btn-round')
        }

        if (simple) {
            styles.push('btn-simple')
        }

        return styles.join(' ')
    }

    render() {
        const { children, component:ButtonComponent = 'button', disabled, onClick, type = 'button', componentProps } = this.props

        const props = {
            ...componentProps,
            className: this._getClassName(),
            type,
            disabled,
            onClick
        }

        return (
            <ButtonComponent {...props}>
                { children }
                { !disabled && <Ink duration={500} opacity={0.05} radius={140}/> }
            </ButtonComponent>
        )
    }
}

export default Button
