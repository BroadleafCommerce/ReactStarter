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
import { connect } from 'react-redux'
import { clearOverrideItemPrice, overrideItemPrice } from 'csr/actions'
import { isCsrMode } from 'csr/selectors'
import OverrideItemPriceModal from 'csr/components/OverrideItemPriceModal'
import find from 'lodash/find'
import './CsrPriceOverrideControls.scss'

class CsrPriceOverrideControls extends PureComponent {
    state = {
        showPriceOverrideModal: false,
    }

    _togglePriceOverrideModal = showPriceOverrideModal => {
        this.setState({
            showPriceOverrideModal: showPriceOverrideModal !== undefined ? showPriceOverrideModal : !this.state.showPriceOverrideModal
        })
    }

    _handleSubmit = form => {
        const { id } = this.props
        this.props.overrideItemPrice(id, form.overridePrice, form.reasonCode, form.message)
        .then(() => {
            this._togglePriceOverrideModal(false)
        })
    }

    render() {
        const { clearOverrideItemPrice, csrMode, id, orderItem } = this.props
        if (!csrMode) {
            return false
        }

        return (
            <div styleName='CsrPriceOverrideControls'>
                <a href='#' className='csr-direct-edit-price' onClick={e => {
                    e.preventDefault()
                    this._togglePriceOverrideModal(true)
                }}>Edit</a>
                {orderItem && (
                    <OverrideItemPriceModal
                        isOpened={this.state.showPriceOverrideModal}
                        orderItem={orderItem}
                        onClose={() => this._togglePriceOverrideModal(false)}
                        onSubmit={this._handleSubmit}
                    />
                )}
                {orderItem && orderItem.csrOverrideDetails && (
                    <a href='#' className='csr-clear-override' onClick={e => {
                        e.preventDefault()
                        clearOverrideItemPrice(id)
                    }}>Clear</a>
                )}

            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    const { id } = props
    return {
        csrMode: isCsrMode(state),
        orderItem: find(state.cart.orderItem, { id })
    }
}

export default connect(mapStateToProps, { clearOverrideItemPrice, overrideItemPrice })(CsrPriceOverrideControls)
