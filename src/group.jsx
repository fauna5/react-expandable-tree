import CaretDown from './caretDown.jsx'
import CaretRight from './caretRight.jsx'
import Client from './client.jsx'
import Collapse from 'react-collapse'
import React from 'react'

class Group extends React.Component {
	render() {
		const clients = []
		this.props.group.companies.forEach(function(client) {
			clients.push(<Client client={client} key={client.name}/>)
		}, this)
		return (
			<div className={"group " + (this.props.group.selected === true ? 'selected' : '')}>
				{this.props.group.selected === true ? <CaretDown clickAction={this.props.actions}/> : <CaretRight clickAction={this.props.actions}/>}
				<div className="group-header" onClick={this.props.actions}>
					{this.props.group.name}
				</div>
				<Collapse isOpened={this.props.group.selected || false}>
					<div className="client-container">
						{clients}
					</div>
				</Collapse>
			</div>
		)
	}
}

export default Group