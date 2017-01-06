import React from 'react'

class Client extends React.Component {

	render() {
		return (
			<div className="client">
				<svg viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg"><path d="M1280 1024q0 26-19 45l-448 448q-19 19-45 19t-45-19-19-45v-896q0-26 19-45t45-19 45 19l448 448q19 19 19 45z"/></svg>
				<div className="client-header">{this.props.client.name}</div>
				<div className="client-active">ACTIVE</div>
			</div>
		)
	}
}

export default Client