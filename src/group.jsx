import Client from './client.jsx'
import React from 'react'

const caretDown = <svg viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg"><path class="arrow" d="M1536 832q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z"/></svg>
const caretRight = <svg viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg"><path d="M1280 1024q0 26-19 45l-448 448q-19 19-45 19t-45-19-19-45v-896q0-26 19-45t45-19 45 19l448 448q19 19 19 45z"/></svg>

class Group extends React.Component {
	render() {
		const clients = []
		this.props.group.companies.forEach(function(client) {
			clients.push(<Client client={client}/>)
		}, this)
		return (
			<div className={"group " + (this.props.group.selected === true ? 'selected' : '')}>
				{this.props.group.selected === true ? caretDown : caretRight}
				<div className="group-header" onClick={this.props.actions}>{this.props.group.name}</div>
				<div className="client-container">
					{clients}
				</div>
			</div>
		)
	}
}

export default Group