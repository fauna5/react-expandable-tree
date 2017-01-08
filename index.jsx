import Nav from './src/nav.jsx'
import React from 'react'
import ReactDOM from 'react-dom'

require('./style.css')

const frame = document.createElement('div')
frame.className = 'container'

document.body.appendChild(frame)

const initialData = {
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

function selected(itemSelected) {
	console.log('%s was clicked', itemSelected)
}

function render() {
	ReactDOM.render(
		<Nav data={initialData} onItemSelected={selected}/>,
		frame
	)
}

render()