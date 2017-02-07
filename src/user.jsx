import Icon from './icon.jsx'
import React from 'react'

export default class User extends React.Component {

	render() {
		const indent = (this.props.path.split('.').length * 15) + 5 + 'px'
		const path = this.props.path + '.' + this.props.data.userName
		const selected = this.props.selectedPath === path

		return (
			<div className={'user' + (selected ? ' selected' : '')}
				onClick={() => this.props.onExpand(this.props.path, 'user', this.props.data.userName)}>
				<div className={'user-panel' + (selected ? ' selected' : '')} style={{ paddingLeft: indent }}>
					<Icon style="user" />
					<div className="user-header">
						<div className="fullname">
							<span className="last-name">{this.props.data.firstName}</span>
							<span className="first-name">{this.props.data.lastName}</span>
						</div>
						<div className="user-name">
							{this.props.data.userName}
						</div>
					</div>
				</div>
			</div>
		)
	}
}