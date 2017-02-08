import ReactTestUtils, {Simulate} from 'react-addons-test-utils'
import {initialData, userData} from './test-data.js'
import Nav from '../nav.jsx'
import React from 'react'

it('shows loading on initial load', () => {
	const component = ReactTestUtils.renderIntoDocument(<Nav />)
	expect(ReactTestUtils.findRenderedDOMComponentWithClass(component, 'sk-fading-circle')).toBeDefined()
})

it('shows the tree when initial data is pushed in', () => {
	const component = ReactTestUtils.renderIntoDocument(<Nav />)
	component.onDataLoaded(initialData)

	const groups = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'group')
	expect(groups.length).toBe(3)
	expect(getGroupName(groups[0])).toBe('Japan')
	expect(getGroupName(groups[1])).toBe('UK')
	expect(getGroupName(groups[2])).toBe('USA')
})

it('expands when group is clicked', () => {
	const onGroupSelected = jest.fn()

	const component = ReactTestUtils.renderIntoDocument(<Nav onGroupSelected={onGroupSelected} />)
	component.onDataLoaded(initialData)

	const topLevelGroups = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'group')
	Simulate.click(topLevelGroups[1].querySelector('.group-header'))

	expect(onGroupSelected).toBeCalled()
	const subGroups = topLevelGroups[1].querySelectorAll('.group')
	expect(subGroups.length).toBe(3)
	expect(getGroupName(subGroups[0])).toBe('Automotive')
	expect(getGroupName(subGroups[1])).toBe('Electronics')
	expect(getGroupName(subGroups[2])).toBe('Food')
})

it('expands to show clients when group is clicked', () => {
	const component = ReactTestUtils.renderIntoDocument(<Nav onGroupSelected={() => { }} />)
	component.onDataLoaded(initialData)

	const topLevelGroups = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'group')
	Simulate.click(topLevelGroups[1].querySelector('.group-header'))

	const subGroups = topLevelGroups[1].querySelectorAll('.group')
	Simulate.click(subGroups[0].querySelector('.group-header'))

	const clients = subGroups[0].querySelectorAll('.client')
	expect(clients.length).toBe(3)
	expect(getClientName(clients[0])).toBe('Ariel')
	expect(getClientName(clients[1])).toBe('Caterham')
	expect(getClientName(clients[2])).toBe('TVR')
})

it('expands to show user loading when client is clicked', () => {
	const component = ReactTestUtils.renderIntoDocument(<Nav onGroupSelected={() => { }} onClientSelected={() => { }} />)
	component.onDataLoaded(initialData)

	const topLevelGroups = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'group')
	Simulate.click(topLevelGroups[1].querySelector('.group-header'))

	const subGroups = topLevelGroups[1].querySelectorAll('.group')
	Simulate.click(subGroups[0].querySelector('.group-header'))

	const clients = subGroups[0].querySelectorAll('.client')
	Simulate.click(clients[0].querySelector('.client-header'))

	const userLoading = clients[0].querySelector('.user-container')
	expect(userLoading.textContent).toBe('loading...')
})

it('expands to show users when client is clicked and data is loading', () => {
	const onClientSelected = jest.fn()

	const component = ReactTestUtils.renderIntoDocument(<Nav onGroupSelected={() => { }} onClientSelected={onClientSelected} />)
	component.onDataLoaded(initialData)

	const topLevelGroups = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'group')
	Simulate.click(topLevelGroups[1].querySelector('.group-header'))

	const subGroups = topLevelGroups[1].querySelectorAll('.group')
	Simulate.click(subGroups[0].querySelector('.group-header'))

	const clients = subGroups[0].querySelectorAll('.client')
	Simulate.click(clients[0].querySelector('.client-header'))

	expect(onClientSelected).toBeCalled()
	component.onUserDataLoaded(userData)

	const users = clients[0].querySelectorAll('.user')
	expect(users.length).toBe(3)
	expect(getUserName(users[0])).toBe('user1@caplin.com')
	expect(getUserName(users[1])).toBe('user2@caplin.com')
	expect(getUserName(users[2])).toBe('user3@caplin.com')
})

it('calls back on prop injected function when user is clicked', () => {
	const onUserSelected = jest.fn()

	const component = ReactTestUtils.renderIntoDocument(<Nav onGroupSelected={() => { }} onClientSelected={() => { }} onUserSelected={onUserSelected} />)
	component.onDataLoaded(initialData)

	const topLevelGroups = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'group')
	Simulate.click(topLevelGroups[1].querySelector('.group-header'))

	const subGroups = topLevelGroups[1].querySelectorAll('.group')
	Simulate.click(subGroups[0].querySelector('.group-header'))

	const clients = subGroups[0].querySelectorAll('.client')
	Simulate.click(clients[0].querySelector('.client-header'))

	component.onUserDataLoaded(userData)
	const users = clients[0].querySelectorAll('.user')
	Simulate.click(users[0])

	expect(onUserSelected).toBeCalled()
})

function getGroupName(groupElement) {
	return groupElement.querySelector('.group-header').textContent
}

function getClientName(clientElement) {
	return clientElement.querySelector('.client-header .client-name').textContent
}

function getUserName(userElement) {
	return userElement.querySelector('.user-name').textContent
}