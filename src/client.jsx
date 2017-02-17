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
			<div className={cn('expandable-tree__client', {'expandable-tree__selected': selected})}>
				<div className="expandable-tree__client-panel"
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
								<div className="expandable-tree__fading-circle expandable-tree__fading-circle_small">
									<div className="expandable-tree__circle"></div>
									<div className="expandable-tree__circle expandable-tree__circle2"></div>
									<div className="expandable-tree__circle expandable-tree__circle3"></div>
									<div className="expandable-tree__circle expandable-tree__circle4"></div>
									<div className="expandable-tree__circle expandable-tree__circle5"></div>
									<div className="expandable-tree__circle expandable-tree__circle6"></div>
									<div className="expandable-tree__circle expandable-tree__circle7"></div>
									<div className="expandable-tree__circle expandable-tree__circle8"></div>
									<div className="expandable-tree__circle expandable-tree__circle9"></div>
									<div className="expandable-tree__circle expandable-tree__circle10"></div>
									<div className="expandable-tree__circle expandable-tree__circle11"></div>
									<div className="expandable-tree__circle expandable-tree__circle12"></div>
								</div>
								<span>loading...</span>
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