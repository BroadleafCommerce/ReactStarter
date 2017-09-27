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
import React from 'react'
import classNames from 'classnames'

const LoginRegisterField = ({
    addon, input, label, meta: { active, touched, error }, type
}) => (
    <div className='input-group'>

        <span className='input-group-addon'>
            {addon ? (
                <i className='material-icons'>{addon}</i>
            ) : (
                <i className='material-icons'  style={{ visibility: 'hidden' }}>person</i>
            )}
        </span>

        <div className={classNames({
                'form-group label-floating': true,
                'is-empty': !input.value,
                'is-focused': active,
                'has-error': touched && error
            })}>
                <label className='control-label'>{label}{touched && error && ` - ${error}`}</label>
                <input
                    type={type}
                    className='form-control'
                    {...input}
                />
        </div>
    </div>
)

export default LoginRegisterField
