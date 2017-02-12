import React, {PropTypes} from 'react'
import Client from './client.jsx'
import Collapse from 'react-collapse'
import Icon from './icon.jsx'
import cn from 'classnames'

export default class Group extends React.Component {

	render() {
		const path = this.props.path + '.' + this.props.group.id
		const treeLevel = this.props.path.split('.').length - 1
		const indent = treeLevel * 15 + 5
		const bgCol = treeLevel * 23
		const expanded = this.props.expandedPaths.includes(path)
		const selected = this.props.selectedPath === path
		const backgroundStyle = selected ? {'backgroundColor': '#394f59'} : expanded ? {'backgroundColor': '#' + bgCol + bgCol + bgCol} : {}

		return (
			<div className={cn('group', expanded)}>
				<div className="group-panel" style={backgroundStyle} onClick={() => this.props.onExpand(this.props.path, 'group', this.props.group.id)}>
					<div className="group-caret" style={{'paddingLeft': indent + 'px'}}>
						<Icon style={expanded === true ? 'caret-down' : 'caret-right'}/>
					</div>
					<div className="group-header">{this.props.group.name}</div>
				</div>
				<Collapse isOpened={expanded} hasNestedCollapse={true}>
					{this.props.group.clients &&
						<div className="client-container">
							{this.props.group.clients.map((client) => {
								return (
									<Client
										key={client.id}
										userData={this.props.userData}
										client={client}
										path={path}
										selectedPath={this.props.selectedPath}
										expandedPaths={this.props.expandedPaths}
										onExpand={this.props.onExpand}
									/>
								)
							})}
						</div>
					}
					<div className="group-container">
						{this.props.group.groups && this.props.group.groups.map((group) => {
							return (
								<Group
									key={group.id}
									userData={this.props.userData}
									group={group}
									path={path}
									selectedPath={this.props.selectedPath}
									expandedPaths={this.props.expandedPaths}
									onExpand={this.props.onExpand}
								/>
							)
						})}
					</div>
				</Collapse>
			</div>
		)
	}
}

Group.propTypes = {
	expandedPaths: PropTypes.array,
	group: PropTypes.object,
	onExpand: PropTypes.func,
	path: PropTypes.string,
	selectedPath: PropTypes.string,
	userData: PropTypes.array,
}