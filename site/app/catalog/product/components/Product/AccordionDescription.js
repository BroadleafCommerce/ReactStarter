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
import Accordion from 'material-kit/components/Accordion'

const AccordionDescriptionInner = ({
    collapsed,
    longDescription,
    toggle,
}) => (
    <div className='panel-group' role='tablist' aria-multiselectable='true'>
        <div className='panel panel-border panel-default'>
            <div className='panel-heading' role='tab' id='headingOne'>
                <a  role='button'
                    href='#collapseOne'
                    onClick={e => {
                        e.preventDefault()
                        toggle()
                    }}
                    aria-expanded={!collapsed}
                    aria-controls='collapseOne'>
                    <h4 className='panel-title'>
                        <span>Description</span>
                        <i className='material-icons'>keyboard_arrow_down</i>
                    </h4>
                </a>
            </div>
            <div id='collapseOne'
                role='tabpanel'
                className={classNames({
                    'panel-collapse': true,
                    'collapse in': !collapsed,
                    'collapse': collapsed
                })}
                aria-labelledby='headingOne'>
                <div className='panel-body'>
                    <p>{longDescription}</p>
                </div>
            </div>
        </div>
    </div>
)

const AccordionDescription = props => (
    <Accordion collapsed={true}>
        <AccordionDescriptionInner {...props}/>
    </Accordion>
)

export default AccordionDescription
