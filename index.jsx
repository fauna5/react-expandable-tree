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
					companies: [
						{name: 'Mitsubishi'},
						{name: 'Nissan'},
						{name: 'Toyota'}
					]
				},
				{
					name: 'Electronics',
					companies: [
						{name: 'Canon'},
						{name: 'Casio'},
						{name: 'SONY'}
					]
				},
				{
					name: 'Food',
					companies: [
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
					companies: [
						{name: 'Ariel'},
						{name: 'Caterham'},
						{name: 'TVR'}
					]
				},
				{
					name: 'Electronics',
					companies: [
						{name: 'Bush'},
						{name: 'Dyson'},
						{name: 'Russell Hobbs'}
					]
				},
				{
					name: 'Food',
					companies: [
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
					companies: [
						{name: 'Cadillac'},
						{name: 'Ford'},
						{name: 'General Motors'}
					]
				},
				{
					name: 'Electronics',
					companies: [
						{name: 'Apple'},
						{name: 'Bose'},
						{name: 'Dell'}
					]
				},
				{
					name: 'Food',
					companies: [
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