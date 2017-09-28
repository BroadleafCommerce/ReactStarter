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
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addItemToWishlist, fetchWishlist, removeItemFromWishlist } from 'account/actions'
import { itemInWishlist } from 'account/selectors'
import { isAnonymous } from 'auth/selectors'
import Button from 'material-kit/components/Button'

class WishlistButton extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
        id: PropTypes.number.isRequired,
        onAddItemClick: PropTypes.func,
    }

    _onClick = e => {
        const { addItemToWishlist, anonymous, id, history, itemInWishlist, onAddItemClick, removeItemFromWishlist } = this.props

        if (anonymous) {
            history.push('/login')
        } else if (itemInWishlist) {
            removeItemFromWishlist({ itemId: itemInWishlist.id })
        } else {
            if (!onAddItemClick) {
                addItemToWishlist({ productId: id })
            } else {
                return onAddItemClick(e)
            }
        }

        e.preventDefault()
        e.stopPropagation()
        return false
    }

    render() {
        const { itemInWishlist } = this.props
        return (
            <Button danger={itemInWishlist} fab simple onClick={this._onClick} type='submit'>
                <i className='material-icons'>{itemInWishlist ? 'favorite' : 'favorite_border'}</i>
            </Button>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        anonymous: isAnonymous(state),
        itemInWishlist: itemInWishlist(state, props),
    }
}

export default withRouter(connect(mapStateToProps, { addItemToWishlist, fetchWishlist, removeItemFromWishlist })(WishlistButton))
