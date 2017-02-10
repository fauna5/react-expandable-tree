import {initialData, userData} from './src/__test__/test-data.js'
import Nav from './src/nav.jsx'
import React from 'react'
import ReactDOM from 'react-dom'

require('./index-style.css')

const frame = document.createElement('div')
frame.className = 'container'
document.body.appendChild(frame)

const mainPanel = document.createElement('div')
mainPanel.className = 'main'
mainPanel.innerText = 'react-expandable-tree'
document.body.appendChild(mainPanel)

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