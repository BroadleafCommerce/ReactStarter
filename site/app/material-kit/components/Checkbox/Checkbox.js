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
