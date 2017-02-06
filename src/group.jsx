import Caret from './caret.jsx'
import Client from './client.jsx'
import Collapse from 'react-collapse'
import React from 'react'

class Group extends React.Component {
	render() {
		const path = this.props.path ? this.props.path + '.' + this.props.group.name : this.props.group.name

		const padding = this.props.path === "" ? 0 : this.props.path.split('.').length * 20
		const bgCol = this.props.path === "" ? 0 : this.props.path.split('.').length * 23

		const onExpand = () => this.props.onItemSelected(this.props.path, 'group', this.props.group.id, false)
		const onSelected = () => this.props.onItemSelected(this.props.path, 'group', this.props.group.id, true)

		return (
		<div className={'group ' + (this.props.group.selected === true ? 'selected' : '')}>
				<div className="group-panel" style={this.props.group.selected === true ? {'backgroundColor': '#' + bgCol + bgCol + bgCol} : {}}>
					<div className="group-caret" onClick={onExpand} style={{'paddingLeft': padding + 'px'}}>
						<Caret direction={this.props.group.selected === true ? 'down' : 'right'}/>
					</div>
					<div className="group-header" onClick={onSelected}>
						{this.props.group.name}
					</div>
				</div>
				<Collapse isOpened={this.props.group.selected || false}>
					{ this.props.group.clients && this.props.group.clients.map((client) => {
						return (
							<div className="client-container">
								<Client key={client.name} userData={this.props.userData} client={client} path={path} onItemSelected={this.props.onItemSelected}/>
							</div>
						)
					})}
					{this.props.group.groups && this.props.group.groups.map((group) => {
						return (
							<div className="group-container">
								<Group key={group.name} userData={this.props.userData} group={group} path={path} onItemSelected={this.props.onItemSelected}/>
							</div>
						)
					})}
				</Collapse>
			</div>
		)
	}
}

export default Group