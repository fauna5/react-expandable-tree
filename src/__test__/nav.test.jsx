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
	const component = ReactTestUtils.renderIntoDocument(<Nav onGroupSelected={() => {}} />)
	component.onDataLoaded(initialData)

	const topLevelGroups = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'group')
	Simulate.click(topLevelGroups[1].querySelector('.group-header'))

	const subGroups = topLevelGroups[1].querySelectorAll('.group')
	expect(subGroups.length).toBe(3)
	expect(getGroupName(subGroups[0])).toBe('Automotive')
	expect(getGroupName(subGroups[1])).toBe('Electronics')
	expect(getGroupName(subGroups[2])).toBe('Food')
})

it('calls back on prop injected function when group is clicked', () => {
	const onGroupSelected = jest.fn()

	const component = ReactTestUtils.renderIntoDocument(<Nav onGroupSelected={onGroupSelected} />)
	component.onDataLoaded(initialData)

	const topLevelGroups = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'group')
	Simulate.click(topLevelGroups[1].querySelector('.group-header'))

	expect(onGroupSelected).toBeCalled()
})

it('marks the group as being selected when group is clicked', () => {
	const component = ReactTestUtils.renderIntoDocument(<Nav onGroupSelected={() => {}} />)
	component.onDataLoaded(initialData)

	const topLevelGroups = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'group')

	expect(isGroupSelected(topLevelGroups[0])).toBe(false)
	expect(isGroupSelected(topLevelGroups[1])).toBe(false)
	expect(isGroupSelected(topLevelGroups[2])).toBe(false)

	Simulate.click(topLevelGroups[1].querySelector('.group-header'))

	expect(isGroupSelected(topLevelGroups[0])).toBe(false)
	expect(isGroupSelected(topLevelGroups[1])).toBe(true)
	expect(isGroupSelected(topLevelGroups[2])).toBe(false)
})

it('collapses the group on the second click', () => {
	const component = ReactTestUtils.renderIntoDocument(<Nav onGroupSelected={() => {}} />)
	component.onDataLoaded(initialData)

	const topLevelGroups = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'group')
	Simulate.click(topLevelGroups[1].querySelector('.group-header'))

	expect(groupIsExpanded(topLevelGroups[0])).toBe(false)
	expect(groupIsExpanded(topLevelGroups[1])).toBe(true)
	expect(groupIsExpanded(topLevelGroups[2])).toBe(false)

	Simulate.click(topLevelGroups[1].querySelector('.group-header'))
	expect(groupIsExpanded(topLevelGroups[0])).toBe(false)
	expect(groupIsExpanded(topLevelGroups[1])).toBe(false)
	expect(groupIsExpanded(topLevelGroups[2])).toBe(false)
})

it('collapses the first group on the same level when the second group is clicked', () => {
	const component = ReactTestUtils.renderIntoDocument(<Nav onGroupSelected={() => {}} />)
	component.onDataLoaded(initialData)

	const topLevelGroups = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'group')
	Simulate.click(topLevelGroups[1].querySelector('.group-header'))

	expect(groupIsExpanded(topLevelGroups[0])).toBe(false)
	expect(groupIsExpanded(topLevelGroups[1])).toBe(true)
	expect(groupIsExpanded(topLevelGroups[2])).toBe(false)

	Simulate.click(topLevelGroups[2].querySelector('.group-header'))
	expect(groupIsExpanded(topLevelGroups[0])).toBe(false)
	expect(groupIsExpanded(topLevelGroups[1])).toBe(false)
	expect(groupIsExpanded(topLevelGroups[2])).toBe(true)
})

it('remembers expanded sub-groups that were expanded when top level group is collapsed and expanded', () => {
	const component = ReactTestUtils.renderIntoDocument(<Nav onGroupSelected={() => {}} />)
	component.onDataLoaded(initialData)

	const topLevelGroups = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'group')
	Simulate.click(topLevelGroups[1].querySelector('.group-header'))
	expect(groupIsExpanded(topLevelGroups[1])).toBe(true)

	const subGroups = topLevelGroups[1].querySelectorAll('.group')
	Simulate.click(subGroups[0].querySelector('.group-header'))
	expect(groupIsExpanded(subGroups[0])).toBe(true)

	Simulate.click(topLevelGroups[1].querySelector('.group-header'))
	expect(groupIsExpanded(topLevelGroups[1])).toBe(false)

	Simulate.click(topLevelGroups[1].querySelector('.group-header'))
	expect(groupIsExpanded(topLevelGroups[1])).toBe(true)
	expect(groupIsExpanded(subGroups[0])).toBe(true)
})

it('expands to show clients when group is clicked', () => {
	const component = ReactTestUtils.renderIntoDocument(<Nav onGroupSelected={() => { }} />)
	component.onDataLoaded(initialData)

	const topLevelGroups = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'group')
	Simulate.click(topLevelGroups[1].querySelector('.group-header'))

	const subGroups = topLevelGroups[1].querySelectorAll('.group')
	Simulate.click(subGroups[0].querySelector('.group-header'))

	expect(isGroupSelected(subGroups[0])).toBe(true)
	const clients = subGroups[0].querySelectorAll('.client')
	expect(clients.length).toBe(3)
	expect(getClientName(clients[0])).toBe('Ariel')
	expect(getClientName(clients[1])).toBe('Caterham')
	expect(getClientName(clients[2])).toBe('TVR')
})

it('collapses the client on the second click', () => {
	const component = ReactTestUtils.renderIntoDocument(<Nav onGroupSelected={() => {}} onClientSelected={() => {}}/>)
	component.onDataLoaded(initialData)

	const topLevelGroups = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'group')
	Simulate.click(topLevelGroups[1].querySelector('.group-header'))

	const subGroups = topLevelGroups[1].querySelectorAll('.group')
	Simulate.click(subGroups[0].querySelector('.group-header'))

	const clients = subGroups[0].querySelectorAll('.client')
	Simulate.click(clients[0].querySelector('.client-header'))

	expect(clientIsExpanded(clients[0])).toBe(true)
	expect(clientIsExpanded(clients[1])).toBe(false)
	expect(clientIsExpanded(clients[2])).toBe(false)

	Simulate.click(clients[0].querySelector('.client-header'))

	expect(clientIsExpanded(clients[0])).toBe(false)
	expect(clientIsExpanded(clients[1])).toBe(false)
	expect(clientIsExpanded(clients[2])).toBe(false)
})

it('collapses the first client on the same level when the second client is clicked', () => {
	const component = ReactTestUtils.renderIntoDocument(<Nav onGroupSelected={() => {}} onClientSelected={() => {}}/>)
	component.onDataLoaded(initialData)

	const topLevelGroups = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'group')
	Simulate.click(topLevelGroups[1].querySelector('.group-header'))

	const subGroups = topLevelGroups[1].querySelectorAll('.group')
	Simulate.click(subGroups[0].querySelector('.group-header'))

	const clients = subGroups[0].querySelectorAll('.client')
	Simulate.click(clients[0].querySelector('.client-header'))

	expect(clientIsExpanded(clients[0])).toBe(true)
	expect(clientIsExpanded(clients[1])).toBe(false)
	expect(clientIsExpanded(clients[2])).toBe(false)

	Simulate.click(clients[1].querySelector('.client-header'))

	expect(clientIsExpanded(clients[0])).toBe(false)
	expect(clientIsExpanded(clients[1])).toBe(true)
	expect(clientIsExpanded(clients[2])).toBe(false)
})

it('expands to show user loading when client is clicked', () => {
	const component = ReactTestUtils.renderIntoDocument(<Nav onGroupSelected={() => {}} onClientSelected={() => {}} />)
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

it('marks the client as selected when client is clicked', () => {
	const component = ReactTestUtils.renderIntoDocument(<Nav onGroupSelected={() => { }} onClientSelected={() => {}} />)
	component.onDataLoaded(initialData)

	const topLevelGroups = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'group')
	Simulate.click(topLevelGroups[1].querySelector('.group-header'))

	const subGroups = topLevelGroups[1].querySelectorAll('.group')
	Simulate.click(subGroups[0].querySelector('.group-header'))

	const clients = subGroups[0].querySelectorAll('.client')

	expect(isClientSelected(clients[0])).toBe(false)
	Simulate.click(clients[0].querySelector('.client-header'))

	expect(isClientSelected(clients[0])).toBe(true)
})

it('expands to show users when client is clicked and user data is loaded', () => {
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
	expect(getUserName(users[0])).toBe('user1@client.com')
	expect(getUserName(users[1])).toBe('user2@client.com')
	expect(getUserName(users[2])).toBe('user3@client.com')
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

it('marks the user as selected when clicked', () => {
	const component = ReactTestUtils.renderIntoDocument(<Nav onGroupSelected={() => { }} onClientSelected={() => { }} onUserSelected={() => {}} />)
	component.onDataLoaded(initialData)

	const topLevelGroups = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'group')
	Simulate.click(topLevelGroups[1].querySelector('.group-header'))

	const subGroups = topLevelGroups[1].querySelectorAll('.group')
	Simulate.click(subGroups[0].querySelector('.group-header'))

	const clients = subGroups[0].querySelectorAll('.client')
	Simulate.click(clients[0].querySelector('.client-header'))

	component.onUserDataLoaded(userData)
	const users = clients[0].querySelectorAll('.user')

	expect(isUserSelected(users[0])).toBe(false)
	Simulate.click(users[0])

	expect(isUserSelected(users[0])).toBe(true)
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

function groupIsExpanded(groupElement) {
	return groupElement.className === 'group expanded'
}

function clientIsExpanded(clientElement) {
	return clientElement.querySelector('.users-loading') !== null
}

function isGroupSelected(groupElement) {
	return groupElement.querySelector('.group-panel').style.backgroundColor === 'rgb(57, 79, 89)'
}

function isClientSelected(clientElement) {
	return clientElement.querySelector('.client-panel').className.includes('selected')
}

function isUserSelected(userElement) {
	return userElement.querySelector('.user-panel').className.includes('selected')
}