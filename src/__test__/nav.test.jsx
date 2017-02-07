import Nav from '../nav.jsx'
import React from 'react'
import renderer from 'react-test-renderer'

it('renders', () => {
	const component = renderer.create(
		<Nav page = "http://www.facebook.com" > Facebook </Nav>
    )
	let tree = component.toJSON()
	expect(tree).toMatchSnapshot()
})
