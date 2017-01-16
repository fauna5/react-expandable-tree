import Nav from './src/nav.jsx'
import React from 'react'
import ReactDOM from 'react-dom'

require('./style.css')

const frame = document.createElement('div')
frame.className = 'container'

document.body.appendChild(frame)

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
			name: 'Japan',
			groups: [
				{
					name: 'Automotive',
					clients: [
						{name: 'Mitsubishi'},
						{name: 'Nissan'},
						{name: 'Toyota'}
					]
				},
				{
					name: 'Electronics',
					clients: [
						{name: 'Canon'},
						{name: 'Casio'},
						{name: 'SONY'}
					]
				},
				{
					name: 'Food',
					clients: [
						{name: 'Asahi'},
						{name: 'Nissin'},
						{name: 'Sapporo'}
					]
				}
			]
		},
		{
			name: 'UK',
			selected: true,
			groups: [
				{
					name: 'Automotive',
					clients: [
						{name: 'Ariel'},
						{name: 'Caterham'},
						{name: 'TVR'}
					]
				},
				{
					name: 'Electronics',
					clients: [
						{name: 'Bush'},
						{name: 'Dyson'},
						{name: 'Russell Hobbs'}
					]
				},
				{
					name: 'Food',
					clients: [
						{name: 'Bovril'},
						{name: 'Findus'},
						{name: 'Quorn'}
					]
				}
			]
		},
		{
			name: 'USA',
			groups: [
				{
					name: 'Automotive',
					clients: [
						{name: 'Cadillac'},
						{name: 'Ford'},
						{name: 'General Motors'}
					]
				},
				{
					name: 'Electronics',
					clients: [
						{name: 'Apple'},
						{name: 'Bose'},
						{name: 'Dell'}
					]
				},
				{
					name: 'Food',
					clients: [
						{name: 'Coca Cola'},
						{name: 'Ben & Jerry\'s'},
						{name: 'Mars'}
					]
				}
			]
		}
	]
}

function selected(itemSelected) {
	console.log('%s was clicked', itemSelected)
}

function render() {
	ReactDOM.render(
		<Nav data={initialData} userData={userData} onItemSelected={selected}/>,
		frame
	)
}

render()