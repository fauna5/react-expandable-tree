import './style.scss'
import './spinner.css'
import React, {PropTypes} from 'react'
import Group from './group.jsx'

export default class Nav extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			data: this.props.data || null,
			userData: this.props.userData || [],
			selectedPath: "",
			expandedPaths: [],
			expandedItem: null
		}
	}

	handleExpand(path, type, itemName) {
		const fullPath = path ? path + '.' + itemName : itemName

		let newExpandedPaths = null
		if (this.state.expandedPaths.includes(fullPath)) { // remove if a close
			newExpandedPaths = this.state.expandedPaths.filter((item) =>
				item !== fullPath
			)
		} else { // add if it's an open
			newExpandedPaths = this.state.expandedPaths.filter((item) =>
				item.split('.').length !== fullPath.split('.').length
			)
			newExpandedPaths = [...newExpandedPaths, fullPath]
		}

		if (type === 'client') {
			this.props.onClientSelected(itemName)
			this.setState({userData: []})
		} else if (type === 'user') {
			this.props.onUserSelected(itemName)
		} else if (type === 'group') {
			this.props.onGroupSelected(itemName)
		}

		this.setState({
			expandedPaths: newExpandedPaths,
			selectedPath: fullPath
		})
	}

	onDataLoaded(data) {
		this.setState({data})
	}

	onUserDataLoaded(data) {
		this.setState({userData: data})
	}

	render() {
		return (
			<div className="expandable-tree__nav">
				{
					!this.state.data
						? <div className="expandable-tree__fading-circle--large">
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
						: this.state.data.groups.map((group) =>
							<Group
								key={group.id}
								userData={this.state.userData}
								group={group}
								path="ROOT"
								selectedPath={this.state.selectedPath}
								expandedPaths={this.state.expandedPaths}
								onExpand={(...args) => this.handleExpand(...args)}
							/>
						)
				}
			</div>
		)
	}
}

Nav.propTypes = {
	onClientSelected: PropTypes.func,
	onUserSelected: PropTypes.func,
	onGroupSelected: PropTypes.func,
	userData: PropTypes.array,
	data: PropTypes.object,
}