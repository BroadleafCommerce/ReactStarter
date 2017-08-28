import React, { PureComponent } from 'react'

class Checkbox extends PureComponent {
    _onClick = e => {
        this.checkbox.click()
    }

    render() {
        const { checked, children, name, onChange } = this.props
        return (
            <div className='checkbox' style={{ marginTop: 0}}>
                <input type='checkbox' ref={ref => this.checkbox = ref} name={name} onChange={onChange} checked={checked}/>
                <span className='checkbox-material'>
                    <span className='check' onClick={this._onClick}/>
                </span>
                {children}
            </div>
        )
    }
}

export default Checkbox
