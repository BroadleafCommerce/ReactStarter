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
