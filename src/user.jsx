import React, {PropTypes} from 'react'
import Icon from './icon.jsx'
import cn from 'classnames'

export default class User extends React.Component {

	render() {
		const indent = (this.props.path.split('.').length * 15) + 5 + 'px'
		const path = this.props.path + '.' + this.props.data.userName
		const selected = this.props.selectedPath === path

		return (
			<div className={cn('expandable-tree__user', {'expandable-tree__selected': selected})}
				onClick={() => this.props.onExpand(this.props.path, 'user', this.props.data.userName)}>

				<div className={cn('expandable-tree__user-panel', {'expandable-tree__selected': selected})} style={{paddingLeft: indent}}>
					<Icon style="user" />
					<div className="expandable-tree__user-header">
						<div className="expandable-tree__fullname">
							<span className="expandable-tree__last-name">{this.props.data.firstName}</span>
							<span className="expandable-tree__first-name">{this.props.data.lastName}</span>
						</div>
						<div className="expandable-tree__user-name">
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