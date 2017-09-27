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
import { SubmissionError } from 'redux-form'
import Accordion from 'material-kit/components/Accordion'
import PromoCodeForm from './PromoCodeForm'
import isEmpty from 'lodash/isEmpty'
import classNames from 'classnames'
import './PromoCodes.scss'

const PromoCodes = ({
    addedOfferCodes = [],
    collapsed,
    onSubmitPromo,
    removePromo,
    toggle
}) => (
    <div className='panel-group card' styleName='PromoCodes'>
        <div className='panel panel-border panel-default'>
            <div className='panel-heading' styleName='PromoCodes__heading' role='tab' id='headingOne'>
                <a  role='button'
                    href='#collapseOne'
                    onClick={e => {
                        e.preventDefault()
                        toggle()
                    }}
                    aria-expanded={!collapsed}
                    aria-controls='collapseOne'>
                    <h4 className='panel-title' styleName='PromoCodes__title'>
                        Have a Promo Code?
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
                <div className='panel-body' styleName='PromoCodes__body'>
                    <PromoCodeForm onSubmit={onSubmitPromo}/>

                    {/* <!-- Applied Promotion Codes --> */}
                    {addedOfferCodes && (
                        <div styleName='PromoCodes__applied'>
                            {addedOfferCodes.map(promo => (
                                <div className='label label-primary' styleName='PromoCodes__applied__code'>
                                    {promo.offerCode}
                                    <a href='#removePromo'
                                        onClick={e => {
                                            e.preventDefault()
                                            removePromo(promo.offerCode)
                                        }}>
                                        <i className='material-icons'>close</i>
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
)

class PromoCodesContainer extends PureComponent {

    _onSubmitPromo = form => {
        return this.props.addPromo(form.promoCode)
        .then(action => {
            if (action.payload.error) {
                const { message: errorMessages } = action.payload.error.response.body
                if (!isEmpty(errorMessages)) {
                    throw new SubmissionError({ _error: errorMessages[0].message })
                }
            }
        })
    }

    render() {
        const { addedOfferCodes = [] } = this.props
        return (
            <Accordion collapsed={isEmpty(addedOfferCodes)}>
                <PromoCodes onSubmitPromo={this._onSubmitPromo} {...this.props}/>
            </Accordion>
        )
    }
}

export default PromoCodesContainer
