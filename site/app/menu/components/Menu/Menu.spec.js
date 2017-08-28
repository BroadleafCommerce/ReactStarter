import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { Menu, MenuItem, SubMenuItem } from './Menu'

const getComponent = ({menuItems}) => {
    const component = shallow(
        <Menu menuItems={menuItems}/>
    )

    return {
        component,
        menuItems: component.find(MenuItem),
    }
}

describe('Menu Component', () => {

    it('should render a simple set of menu items', () => {
        const props = {
            menuItems : [
                {
                    label : 'Item1',
                    url : '/item1',
                },
                {
                    label : 'Item2',
                    url : '/item2',
                },
                {
                    label : 'Item3',
                    url : '/item3',
                }
            ]
        }

        const { menuItems } = getComponent(props)

        expect(menuItems).to.have.length(3)
        expect(menuItems.get(0).props.url).to.equal(props.menuItems[0].url)
        expect(menuItems.get(1).props.url).to.equal(props.menuItems[1].url)
        expect(menuItems.get(2).props.url).to.equal(props.menuItems[2].url)
    })

    it('should render a nested submenu', () => {
        const props = {
            menuItems : [
                {
                    label : 'Item',
                    url : '/item',
                    submenu : [
                        {
                            label : 'SubItem',
                            url : '/subItem'
                        }
                    ]
                }
            ]
        }

        const {menuItems} = getComponent(props)

        expect(menuItems).to.have.length(1)
        expect(menuItems.get(0).props.url).to.equal(props.menuItems[0].url)
        expect(menuItems.get(0).props.submenu).to.have.length(1)

        const subMenuItem = menuItems.at(0).shallow().find(SubMenuItem)
        expect(subMenuItem.get(0).props.url).to.equal(props.menuItems[0].submenu[0].url)
    })
})
