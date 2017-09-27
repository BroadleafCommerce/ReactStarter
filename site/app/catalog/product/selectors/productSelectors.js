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
import { createSelector } from 'reselect'
import { formValueSelector } from 'redux-form'
import find from 'lodash/find'

export const getProductForView = createSelector(
    (state, props) => state.product[`${props.match.params.category}/${props.match.params.product}`],
    state => state.entities.products,
    (meta, products) => {
        if (!meta || !meta.id) {
            return { isFetching: true }
        }

        return {
            ...meta,
            ...products[meta.id]
        }
    }
)

export const getConfigureItemRequest = createSelector(
    (state, props) => state.configureItem[props.id],
    (result) => {
        if (!result) {
            return undefined
        }

        return result.configureItemRequest
    },
)

export const isConfiguringItem = createSelector(
    (state, props) => state.configureItem[props.id],
    result => {
        return !!result && !!result.configureItemRequest
    }
)

export const isFetchingConfiguration = createSelector(
    (state, props) => state.configureItem[props.id],
    result => {
        return !!result && result.isFetchingItem
    }
)
