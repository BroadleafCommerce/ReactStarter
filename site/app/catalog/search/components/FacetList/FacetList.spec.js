/*
 * #%L
 * React Site Starter
 * %%
 * Copyright (C) 2009 - 2017 Broadleaf Commerce
 * %%
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *       http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
