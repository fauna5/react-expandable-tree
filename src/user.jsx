import React, {PropTypes} from 'react'
import Icon from './icon.jsx'
import cn from 'classnames'

export default class User extends React.Component {

	render() {
		const indent = (this.props.path.split('.').length * 15) + 5 + 'px'
		const path = this.props.path + '.' + this.props.data.userName
		const selected = this.props.selectedPath === path

		return (
			<div className={cn('user', {selected})}
				onClick={() => this.props.onExpand(this.props.path, 'user', this.props.data.userName)}>

				<div className={'user-panel' + (selected ? ' selected' : '')} style={{paddingLeft: indent}}>
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

User.propTypes = {
	data: PropTypes.object,
	onExpand: PropTypes.func,
	path: PropTypes.string,
	selectedPath: PropTypes.string,
}