import Collapse from 'react-collapse'
import Icon from './icon.jsx'
import React from 'react'
import User from './user.jsx'

class Client extends React.Component {

	onExpanded = () => {
		this.props.onItemSelected(this.props.path, 'client', this.props.client.id, false)
	}

	onSelected = () => {
		this.props.onItemSelected(this.props.path, 'client', this.props.client.id, true)
	}

	render() {

		const indent = this.props.path.split('.').length * 20

		let users = []
		if(this.props.userData.length == 0 && this.props.client.selected) {
			users = <div key={'loading'} className="users-loading" style={{paddingLeft: (indent + 50) + 'px'}}>
					<span className="spinner">loading...</span>
				</div>
		} else {
			users = this.props.userData.map((user) => {
				return <User key={user.userName} path={this.props.path + '.' + this.props.client.name} data={user} onItemSelected={this.props.onItemSelected}/>
			})
		}

		return (
			<div className={'client ' + (this.props.client.selected ? 'selected' : '')}>
				<div className="client-panel" style={{paddingLeft: indent + 'px'}} onClick={this.onSelected}>
					<div className="client-header">
						<Icon style={this.props.client.selected ? 'caret-down' : 'caret-right'}/>
						<Icon style='building'/>
						<span className="clientName">{this.props.client.name}</span>
						<span className="client-active">ACTIVE</span>
					</div>
				</div>
				<Collapse isOpened={this.props.client.selected || false}>
					<div className="user-container">
						{users}
					</div>
				</Collapse>
			</div>
		)
	}
}

export default Client