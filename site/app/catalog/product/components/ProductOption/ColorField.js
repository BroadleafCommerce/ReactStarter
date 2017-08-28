import React, { Component } from 'react'
import classNames from 'classnames'
import './ColorField.scss'

class ColorField extends Component {

    _renderColor = optionValue => {
        const { input: { value, onChange } } = this.props
        const { attributeValue } = optionValue
        const active = value === attributeValue

        return (
            <a  key={attributeValue}
                href='#'
                onClick={e => {
                    e.preventDefault()
                    onChange(attributeValue)
                }}
                ref='tooltip'
                styleName={`ColorField__option${active ? '--active' : ''}`}
                style={{
                    borderColor: active ? attributeValue.toLowerCase() : 'none'
                }}>
                <div styleName='ColorField__option__inner' style={{ background: attributeValue.toLowerCase() }}>{attributeValue}</div>
            </a>
        )
    }

    render() {
        const { allowedValue, label, meta: { touched, error } } = this.props

        return (
            <div styleName='ColorField'>
                {allowedValue.map(this._renderColor)}
                {touched && error && (<span className='text-danger text-right'>{error}</span>)}
            </div>
        )
    }
}

export default ColorField
