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
			name: 'uk',
			companies: [
				{name: 'Aadvark'},
				{name: 'Ariel'},
				{name: 'Tunnocks'}
			]
		},
		{
			name: 'usa',
			companies: [
				{
					name: 'Coca Cola'
				},
				{
					name: 'Hersheys'
				},
				{
					name: 'Ford'
				}
			]
		}
	]}

ReactDOM.render(
	<Nav data={data}/>,
	frame
)