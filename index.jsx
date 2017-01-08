import Nav from './src/nav.jsx'
import React from 'react'
import ReactDOM from 'react-dom'

require('./style.css')

const frame = document.createElement('div')
frame.className = 'container'

document.body.appendChild(frame)

const data = {
	groups: [
		{
			name: 'Japan',
			companies: [
				{name: 'Asahi'},
				{name: 'Mitsubishi'},
				{name: 'SONY'}
			]
		},
		{
			name: 'UK',
			selected: true,
			companies: [
				{
					name: 'Aadvark',
					selected: true
				},
				{name: 'Ariel'},
				{name: 'Tunnocks'}
			]
		},
		{
			name: 'USA',
			companies: [
				{name: 'Coca Cola'},
				{name: 'Hersheys'},
				{name: 'Ford'}
			]
		}
	]
}

function click(event) {
	const groupName = findParentWithTag(event.target, 'div').querySelector('.group-header').innerText
	data.groups.map((group) => {
		if(group.name === groupName && !group.selected) {
			group.selected = true
		} else {
			group.selected = false
		}
		return group
	})
	render()
}

function findParentWithTag(el, tag) {
	let element = el
	const upperCaseTag = tag.toUpperCase()
	while (element.parentNode) {
		element = element.parentNode
		if (element.tagName === upperCaseTag) {
			return element
		}
	}
	return null
}

function render() {
	ReactDOM.render(
		<Nav data={data} actions={click}/>,
		frame
	)
}

render()