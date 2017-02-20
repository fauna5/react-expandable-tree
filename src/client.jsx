import React, {PropTypes} from 'react'
import Collapse from 'react-collapse'
import Icon from './icon.jsx'
import User from './user.jsx'
import cn from 'classnames'

export default class Client extends React.Component {

	render() {
		const path = this.props.path + '.' + this.props.client.id
		const indent = ((this.props.path.split('.').length - 1) * 15) + 5
		const expanded = this.props.expandedPaths.includes(path)
		const selected = this.props.selectedPath === path

		return (
			<div className="expandable-tree__client">
				<div className={cn('expandable-tree__client-panel', {'expandable-tree__client-panel--selected': selected})}
					style={{paddingLeft: indent + 'px'}}
					onClick={() => this.props.onExpand(this.props.path, 'client', this.props.client.id)}
				>
					<div className="expandable-tree__client-header">
						<Icon style={(expanded ? 'caret-down' : 'caret-right')} />
						<Icon style="building" />
						<div className="expandable-tree__client-name">{this.props.client.name}</div>
						<div className="expandable-tree__client-active">ACTIVE</div>
					</div>
				</div>
				<Collapse isOpened={expanded} hasNestedCollapse={true}>
					<div className="expandable-tree__user-container">
						{this.props.userData.length == 0 && expanded
							? <div className="expandable-tree__users-loading" style={{paddingLeft: (indent + 50) + 'px'}}>
								<div className="expandable-tree__fading-circle--small">
									<div className="expandable-tree__fading-circle-dot"></div>
									<div className="expandable-tree__fading-circle-dot expandable-tree__fading-circle-dot--circle2"></div>
									<div className="expandable-tree__fading-circle-dot expandable-tree__fading-circle-dot--circle3"></div>
									<div className="expandable-tree__fading-circle-dot expandable-tree__fading-circle-dot--circle4"></div>
									<div className="expandable-tree__fading-circle-dot expandable-tree__fading-circle-dot--circle5"></div>
									<div className="expandable-tree__fading-circle-dot expandable-tree__fading-circle-dot--circle6"></div>
									<div className="expandable-tree__fading-circle-dot expandable-tree__fading-circle-dot--circle7"></div>
									<div className="expandable-tree__fading-circle-dot expandable-tree__fading-circle-dot--circle8"></div>
									<div className="expandable-tree__fading-circle-dot expandable-tree__fading-circle-dot--circle9"></div>
									<div className="expandable-tree__fading-circle-dot expandable-tree__fading-circle-dot--circle10"></div>
									<div className="expandable-tree__fading-circle-dot expandable-tree__fading-circle-dot--circle11"></div>
									<div className="expandable-tree__fading-circle-dot expandable-tree__fading-circle-dot--circle12"></div>
								</div>
								<span className="expandable-tree__users-loading-text">loading...</span>
							</div>
							: this.props.userData.map((user) =>
								<User
									key={user.userName}
									path={path}
									data={user}
									selectedPath={this.props.selectedPath}
									onExpand={this.props.onExpand} />
							)
						}
					</div>
				</Collapse>
			</div>
		)
	}
}

Client.propTypes = {
	client: PropTypes.object,
	expandedPaths: PropTypes.array,
	onExpand: PropTypes.func,
	path: PropTypes.string,
	selectedPath: PropTypes.string,
	userData: PropTypes.array,
}