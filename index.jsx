import Nav from './src/nav.jsx'
import React from 'react'
import ReactDOM from 'react-dom'

require('./index-style.css')
require('./style.css')

const frame = document.createElement('div')
frame.className = 'container'
document.body.appendChild(frame)

const mainPanel = document.createElement('div')
mainPanel.className = 'main'
mainPanel.innerText = 'director'
document.body.appendChild(mainPanel)


const userData = [
	{
		firstName: 'User',
		lastName: 'One',
		userName: 'user1@caplin.com'
	},
	{
		firstName: 'User',
		lastName: 'Two',
		userName: 'user2@caplin.com'
	},
	{
		firstName: 'User',
		lastName: 'Three',
		userName: 'user3@caplin.com'
	}
]

const initialData = {
	groups: [
		{
			id: 1,
			name: 'Japan',
			groups: [
				{
					id: 2,
					name: 'Automotive',
					clients: [
						{
							id: 3,
							name: 'Mitsubishi'
						},
						{
							id: 4,
							name: 'Nissan'
						},
						{
							id: 5,
							name: 'Toyota'
						}
					]
				},
				{
					id: 6,
					name: 'Electronics',
					clients: [
						{
							id: 7,
							name: 'Canon'
						},
						{
							id: 8,
							name: 'Casio'
						},
						{
							id: 9,
							name: 'SONY'
						}
					]
				},
				{
					id: 10,
					name: 'Food',
					clients: [
						{
							id: 11,
							name: 'Asahi'
						},
						{
							id: 12,
							name: 'Nissin'
						},
						{
							id: 13,
							name: 'Sapporo'
						}
					]
				}
			]
		},
		{
			id: 13,
			name: 'UK',
			selected: true,
			groups: [
				{
					id: 14,
					name: 'Automotive',
					clients: [
						{
							id: 15,
							name: 'Ariel'
						},
						{
							id: 16,
							name: 'Caterham'
						},
						{
							id: 17,
							name: 'TVR'
						}
					]
				},
				{
					id: 18,
					name: 'Electronics',
					clients: [
						{
							id: 19,
							name: 'Bush'
						},
						{
							id: 21,
							name: 'Dyson'
						},
						{
							id: 22,
							name: 'Russell Hobbs'
						}
					]
				},
				{
					id: 23,
					name: 'Food',
					clients: [
						{
							id: 24,
							name: 'Bovril'
						},
						{
							id: 25,
							name: 'Findus'
						},
						{
							id: 26,
							name: 'Quorn'
						}
					]
				}
			]
		},
		{
			id: 27,
			name: 'USA',
			groups: [
				{
					id: 28,
					name: 'Automotive',
					clients: [
						{
							id: 29,
							name: 'Cadillac'
						},
						{
							id: 30,
							name: 'Ford'
						},
						{
							id: 31,
							name: 'General Motors'
						}
					]
				},
				{
					id: 32,
					name: 'Electronics',
					clients: [
						{
							id: 32,
							name: 'Apple'
						},
						{
							id: 33,
							name: 'Bose'
						},
						{
							id: 34,
							name: 'Dell'
						}
					]
				},
				{
					id: 35,
					name: 'Food',
					clients: [
						{
							id: 36,
							name: 'Coca Cola'
						},
						{
							id: 37,
							name: 'Ben & Jerry\'s'
						},
						{
							id: 38,
							name: 'Mars'
						}
					]
				}
			]
		}
	]
}



function onGroupSelected(itemSelected) {
	mainPanel.innerText = itemSelected + ' was clicked'
}

function onClientSelected(itemSelected) {
	mainPanel.innerText = itemSelected + ' was clicked'
	setTimeout(() => {
		component.onUserDataLoaded(userData)
	}, 1000)
}

function onUserSelected(itemSelected) {
	mainPanel.innerText = itemSelected + ' was clicked'
}

let component = null

function render() {
	component = ReactDOM.render(
		<Nav onGroupSelected={onGroupSelected} onClientSelected={onClientSelected} onUserSelected={onUserSelected}/>,
		frame
	)
	component.onUserDataLoaded(userData)
}

render()

setTimeout(() => {
	component.onDataLoaded(initialData)
}, 1000)