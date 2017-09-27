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
import {FacetList} from './FacetList'
import Facet, {ActiveFacet, InactiveFacet} from '../Facet'

const getComponent = (searchFacet) => {
    const component = shallow(
        <FacetList searchFacet={searchFacet}/>
    )

    return {
        component,
    }
}

describe('ResultList component', () => {

    it('should render 1 Facet', () => {
        const {component} = getComponent([{
            label : 'Facet',
            fieldName : 'facet',
            active : false,
            values : [{
                value : 'value',
                active : false,
            }]
        }])

        expect(component.find(Facet)).to.have.length(1)
    })

    it('should render 2 Facets', () => {
        const {component} = getComponent([{
            label : 'Facet',
            fieldName : 'facet',
            active : false,
            values : [{
                value : 'value',
                active : false,
            }]
        }, {
            label : 'Facet2',
            fieldName : 'facet2',
            active : false,
            values : [{
                value : 'value2',
                active : false,
            }]
        }])

        expect(component.find(Facet)).to.have.length(2)
    })

    it('should render no Facet', () => {
        const {component} = getComponent([])

        expect(component.find(Facet)).to.have.length(0)
    })

    it('should render 1 ActiveFacet', () => {
        const {component} = getComponent([{
            label : 'Facet',
            fieldName : 'facet',
            active : true,
            values : [{
                value : 'value',
                active : true,
            }]
        }])

        expect(component.find(Facet).shallow().dive().find(ActiveFacet)).to.have.length(1)
    })
    
    it('should render 1 ActiveFacet', () => {
        const {component} = getComponent([{
            label : 'Facet',
            fieldName : 'facet',
            active : true,
            values : [{
                value : 'value',
                active : true,
            }]
        }, {
            label : 'facet2',
            fieldName : 'facet2',
            active : false,
            values : [{
                value : 'value2',
                active : false,
            }]
        }])

        expect(component.find(Facet)).to.have.length(2)
        expect(component.find(Facet).at(0).shallow().dive().find(ActiveFacet)).to.have.length(1)
        expect(component.find(Facet).at(1).shallow().dive().find(InactiveFacet)).to.have.length(1)
    })
})
