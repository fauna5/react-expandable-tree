import Caret from './caret.jsx'
import Client from './client.jsx'
import Collapse from 'react-collapse'
import React from 'react'

class Group extends React.Component {
	render() {
		const clients = []
		const path = this.props.path ? this.props.path + '.' + this.props.group.name : this.props.group.name

		if(this.props.group.clients) {
			this.props.group.clients.forEach(function(client) {
				clients.push(<Client key={client.name} userData={this.props.userData} client={client} path={path} onItemSelected={this.props.onItemSelected}/>)
			}, this)
		}

		const groups = []
		if(this.props.group.groups) {
			this.props.group.groups.forEach(function(group) {
				groups.push(<Group key={group.name} userData={this.props.userData} group={group} path={path} onItemSelected={this.props.onItemSelected}/>)
			}, this)
		}

		const padding = this.props.path === "" ? 0 : this.props.path.split('.').length * 20

		const onClickFunction = () => this.props.onItemSelected(this.props.path, this.props.group.name)

		return (
			<div className={'group ' + (this.props.group.selected === true ? 'selected' : '')}>
				<div className="group-panel" onClick={onClickFunction} style={{'paddingLeft': padding + 'px'}}>
					<Caret direction={this.props.group.selected === true ? 'down' : 'right'}/>
					<div className="group-header">
						{this.props.group.name}
					</div>
				</div>
				<Collapse isOpened={this.props.group.selected || false}>
					<div className="client-container">
						{clients}
					</div>
					<div className="group-container">
						{groups}
					</div>
				</Collapse>
			</div>
		)
	}
}

export default Group