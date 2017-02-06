import Collapse from 'react-collapse'
import Icon from './icon.jsx'
import React from 'react'
import User from './user.jsx'

export default class Client extends React.Component {

	onExpand = () => {
		this.props.onExpand(this.props.path, 'client', this.props.client.id, false)
	}

	render() {
		const path = this.props.path + '.' + this.props.client.id
		const indent = (this.props.path.split('.').length - 1) * 15 + 5
		const expanded = this.props.expandedPaths.includes(path)

		let users = []
		if (this.props.userData.length == 0 && expanded) {
			users = 
				<div key={'loading'} className="users-loading" style={{ paddingLeft: (indent + 50) + 'px' }}>
					<div className="sk-fading-circle small">
						<div className="sk-circle1 sk-circle"></div>
						<div className="sk-circle2 sk-circle"></div>
						<div className="sk-circle3 sk-circle"></div>
						<div className="sk-circle4 sk-circle"></div>
						<div className="sk-circle5 sk-circle"></div>
						<div className="sk-circle6 sk-circle"></div>
						<div className="sk-circle7 sk-circle"></div>
						<div className="sk-circle8 sk-circle"></div>
						<div className="sk-circle9 sk-circle"></div>
						<div className="sk-circle10 sk-circle"></div>
						<div className="sk-circle11 sk-circle"></div>
						<div className="sk-circle12 sk-circle"></div>
					</div>
					<span className="spinner">loading...</span>
				</div>
		} else {
			users = this.props.userData.map((user) => {
				return <User key={user.userName} path={path} data={user} onExpand={this.props.onExpand} />
			})
		}

		return (
			<div className={'client ' + (expanded ? 'expanded' : '')}>
				<div className="client-panel" style={{ paddingLeft: indent + 'px' }} onClick={this.onExpand}>
					<div className="client-header">
						<Icon style={(expanded ? 'caret-down' : 'caret-right')} />
						<Icon style='building' />
						<div className="client-name">{this.props.client.name}</div>
						<div className="client-active">ACTIVE</div>
					</div>
				</div>
				<Collapse isOpened={expanded}>
					<div className="user-container">
						{users}
					</div>
				</Collapse>
			</div>
		)
	}
}