import Icon from './icon.jsx'
import React from 'react'

export default class User extends React.Component {

	userClicked = () => {
		this.props.onExpand(this.props.path, 'user', this.props.data.userName)
	}

	render() {
		const indent = (this.props.path.split('.').length * 15) + 5 + 'px'

		return (
			<div className={'user ' + (this.props.data.selected ? 'selected' : '')} onClick={this.userClicked}>
				<div className="user-panel" style={{paddingLeft: indent}}>
					<Icon style="user"/>
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