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
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { resolve } from 'core/decorator/reduxResolve'
import { isAnonymous } from 'auth/selectors'
import { isCsrMode, getCsrCartId, isCartLocked } from 'csr/selectors'
import { exitCsrMode, fetchReasonCodes, lockCart, transferCart, unlockCart } from 'csr/actions'
import { getCustomer } from 'cart/selectors'
import TransferCartModal from 'csr/components/TransferCartModal'
import './CsrRibbon.scss'

export const CsrRibbon = ({
    anonymous,
    cartLocked = false,
    csrMode,
    csrCartId,
    customer,
    exitCsrMode,
    lockCart,
    onClickTransferCartButton,
    onCloseTransferCartModal,
    onSubmitTransferCartModal,
    showTransferCartModal,
    unlockCart,
}) => {
    if (!csrMode) {
        return null
    }

    const csrCustomerTitle = (<span>CSR Mode: { customer.registered ? `${customer.firstName} ${customer.lastName}, ${customer.emailAddress}` : `Guest${!!customer.id ? `#${customer.id}` : ''}` }</span>)

    const lockCartButton = !anonymous && !!csrCartId && (
        <div>
            <button
                styleName={cartLocked ? 'CsrRibbon__unlockCartButton' : 'CsrRibbon__lockCartButton'}
                type='button'
                onClick={ e => cartLocked ? unlockCart(csrCartId) : lockCart(csrCartId) }>
                {cartLocked ? 'Unlock Cart' : 'Lock Cart'}
            </button>
        </div>
    )

    const transferAnonymousCartButton = anonymous && !!csrCartId && (
        <div>
            <TransferCartModal
                isOpened={showTransferCartModal}
                onClose={onCloseTransferCartModal}
                onSubmit={onSubmitTransferCartModal}/>
            <button
                styleName='CsrRibbon__transferCartButton'
                type='button'
                onClick={onClickTransferCartButton}>
                Transfer Cart
            </button>
        </div>
    )

    return (
        <div styleName='CsrRibbonWrapper'>
            <div styleName='CsrRibbon'>
                <div>
                    {csrCustomerTitle}
                </div>
                {lockCartButton}
                {transferAnonymousCartButton}
                <a href='#'
                    onClick={e => {
                        e.preventDefault()
                        exitCsrMode()
                    }}>
                    Exit CSR Mode
                </a>
            </div>
            <div styleName='CsrRibbonBorder'/>
        </div>
    )
}

class CsrRibbonContainer extends Component {
    state = {
        showTransferCartModal: false
    }

    onClickTransferCartButton = () => {
        this.setState({
            showTransferCartModal: true
        })
    }

    onCloseTransferCartModal = () => {
        this.setState({
            showTransferCartModal: false
        })
    }

    onSubmitTransferCartModal = ({ emailAddress }) => {
        const { csrCartId, history, transferCart } = this.props
        transferCart(csrCartId, emailAddress).then(() => {
            history.push('/')
        })
    }

    render() {
        return (
            <CsrRibbon
                {...this.props}
                onClickTransferCartButton={this.onClickTransferCartButton}
                onCloseTransferCartModal={this.onCloseTransferCartModal}
                onSubmitTransferCartModal={this.onSubmitTransferCartModal}
                showTransferCartModal={this.state.showTransferCartModal}/>
        )
    }
}

const mapStateToProps = state => {
    return {
        anonymous: isAnonymous(state),
        cartLocked: isCartLocked(state),
        csrMode: isCsrMode(state),
        csrCartId: getCsrCartId(state),
        customer: getCustomer(state),
    }
}

/**
 * We want to be sure that the CsrOverrideReasonCodes are fetched when csr mode is enabled.
 * @param  {Object} resolver the ReduxResolver
 * @param  {Object} props    the component's properties
 * @return {Promise}          a Promise
 */
const resolveData = (resolver, props) => {
    if (props.csrMode) {
        return resolver.resolve(props.fetchReasonCodes)
    }
}

export default withRouter(connect(mapStateToProps, { exitCsrMode, fetchReasonCodes, lockCart, transferCart, unlockCart })(resolve(resolveData)(CsrRibbonContainer)))
