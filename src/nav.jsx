import Group from './group.jsx'
import React from 'react'

class Nav extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			data: this.props.data,
			userData: this.props.userData || [],
			expandedPaths: [], //TODO 
			expandedItem: null
		}
	}

	handleExpand = (path, type, itemName, expanded) => {
		const fullPath = path ? path + '.' + itemName : itemName

		let newExpandedPaths
		if (this.state.expandedPaths.includes(fullPath)) { // remove if a close
			newExpandedPaths = this.state.expandedPaths.filter((item) => {
				return item !== fullPath
			})
		} else { // add and notify if it's an open
			newExpandedPaths = this.state.expandedPaths.filter((item) => {
				return item.split('.').length !== fullPath.split('.').length
			})
			newExpandedPaths = [...newExpandedPaths, fullPath];
			
			if (type === 'client') {
				this.props.onClientSelected(itemName)
				this.setState({ userData: [] })
			} else if (type === 'user') {
				this.props.onUserSelected(itemName)
			} else if (type === 'group') {
				this.props.onGroupSelected(itemName)
			}
		}
		console.log(newExpandedPaths)
		this.setState({expandedPaths: newExpandedPaths})
	}

	onDataLoaded = (data) => {
		this.setState({ data: data })
	}

	onUserDataLoaded = (data) => {
		this.setState({ userData: data })
	}

	render(data) {
		if (!this.state.data) {
			//loading
			return (
				<div className="nav">
					<span className="spinner">loading...</span>
				</div>
			)
		}
		const groups = []
		this.state.data.groups.forEach(function (group) {
			groups.push(<Group key={group.id} userData={this.state.userData} group={group} path="ROOT" expandedPaths={this.state.expandedPaths} onExpand={this.handleExpand} />)
		}, this)
		return (
			<div className="nav">
				{groups}
			</div>
		)
	}
}

export default Nav