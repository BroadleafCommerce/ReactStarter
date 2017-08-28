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
