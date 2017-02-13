import React, {PropTypes} from 'react'
import Group from './group.jsx'

require('./style.scss')
require('./spinner.css')

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

		let newExpandedPaths
		if (this.state.expandedPaths.includes(fullPath)) { // remove if a close
			newExpandedPaths = this.state.expandedPaths.filter((item) => {
				return item !== fullPath
			})
		} else { // add if it's an open
			newExpandedPaths = this.state.expandedPaths.filter((item) => {
				return item.split('.').length !== fullPath.split('.').length
			})
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
			<div className="nav">
				{
					!this.state.data
						? <div className="sk-fading-circle large">
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
						: this.state.data.groups.map((group) => {
							return <Group
										key={group.id}
										userData={this.state.userData}
										group={group}
										path="ROOT"
										selectedPath={this.state.selectedPath}
										expandedPaths={this.state.expandedPaths}
										onExpand={(...args) => this.handleExpand(...args)}
									/>
						})
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