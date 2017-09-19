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
