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
import {shallow} from 'enzyme'
import {expect} from 'chai'
import {ResultList} from './ResultList'
import ResultListItem from '../ResultListItem'

const getComponent = (results) => {
    const component = shallow(
        <ResultList results={results}/>
    )

    return {
        component,
    }
}

describe('ResultList component', () => {

    it('should render 1 ResultListItem', () => {
        const {component} = getComponent([{id : 1}])

        expect(component.find(ResultListItem)).to.have.length(1)
    })

    it('should render 2 ResultListItems', () => {
        const {component} = getComponent([{id : 1}, {id : 2}])

        expect(component.find(ResultListItem)).to.have.length(2)
    })

    it('should render no ResultListItems', () => {
        const {component} = getComponent([])

        expect(component.find(ResultListItem)).to.have.length(0)
    })
})
