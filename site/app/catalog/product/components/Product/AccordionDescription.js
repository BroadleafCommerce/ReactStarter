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
