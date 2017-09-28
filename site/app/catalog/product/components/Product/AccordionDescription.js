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
