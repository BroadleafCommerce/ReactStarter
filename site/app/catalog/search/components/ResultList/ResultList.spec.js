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
