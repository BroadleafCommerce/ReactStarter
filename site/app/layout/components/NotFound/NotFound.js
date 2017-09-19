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
import Button from 'material-kit/components/Button'

const NotFound = ({
    history
}) => (
    <div className='page-header header-small header-filter'>
        <div className='container'>
            <div className='text-center text-uppercase'>
                <h1 className='title'>404</h1>
                <h4>Page Not Found</h4>
                <Button className='btn-white' onClick={e => history.go(-1)} sm simple>
                    <i className='material-icons'>keyboard_arrow_left</i> Back to Civilization
                </Button>
            </div>
        </div>
    </div>
)

export default NotFound
