import CaretRight from './caretRight.jsx'
import React from 'react'

class Client extends React.Component {

	render() {
		return (
			<div className="client">
				<CaretRight/>
				<div className="client-header">{this.props.client.name}</div>
				<div className="client-active">ACTIVE</div>
			</div>
		)
	}
}

export default Client