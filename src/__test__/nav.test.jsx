
import jsdom from 'jsdom'

var doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
var win = doc.defaultView

global.document = doc
global.window = win

propagateToGlobal(win)

function propagateToGlobal (window) {
  for (let key in window) {
    if (!window.hasOwnProperty(key)) continue
    if (key in global) continue
    global[key] = window[key]
  }
}

import {initialData, userData} from './test-data.js'
import Nav from '../nav.jsx'
import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'
import renderer from 'react-test-renderer'

it('shows loading on initial load', () => {
	const component = renderer.create(
		<Nav/>
	)
	const tree = component.toJSON()
	expect(tree).toMatchSnapshot()
})

it('renders a tree of items', () => {
	const component = ReactTestUtils.renderIntoDocument(<Nav/>)
	component.onDataLoaded(initialData)

	const groups = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'group')
	expect(groups.length).toBe(3)
	expect(getGroupName(groups[0])).toBe('Japan')
	expect(getGroupName(groups[1])).toBe('UK')
	expect(getGroupName(groups[2])).toBe('USA')
})

it('expands when group is clicked', () => {
	const component = ReactTestUtils.renderIntoDocument(<Nav onGroupSelected={() => {}}/>)
	component.onDataLoaded(initialData)

	const topLevelGroups = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'group')
	ReactTestUtils.Simulate.click(topLevelGroups[1].querySelector('.group-header'))

	const subGroups = topLevelGroups[1].querySelectorAll('.group')
	expect(subGroups.length).toBe(3)
	expect(getGroupName(subGroups[0])).toBe('Automotive')
	expect(getGroupName(subGroups[1])).toBe('Electronics')
	expect(getGroupName(subGroups[2])).toBe('Food')
})

function getGroupName(group) {
	return group.querySelector('.group-header').textContent
}