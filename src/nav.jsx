import Group from './group.jsx'
import React from 'react'

class Nav extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: this.props.data,
			itemSelectedCallBack: this.props.onItemSelected
		}
		this.onItemSelected = this.onItemSelected.bind(this)
		this.findParentWithTag = this.findParentWithTag.bind(this)
		this.getGroupFromObject = this.getGroupFromObject.bind(this)
	}

	onItemSelected(path, groupName) {
		const updatedData = this.getGroupFromObject(path, this.state.data, groupName)
		this.setState({data: updatedData})
		this.state.itemSelectedCallBack(groupName)
	}

	render() {
		const groups = []
		this.state.data.groups.forEach(function(group) {
			groups.push(<Group key={group.name} group={group} path="" onItemSelected={this.onItemSelected}/>)
		}, this)
		return (
			<div className="nav">
				<p>Groups</p>
				{groups}
			</div>
		)
	}

	findParentWithTag(el, tag) {
		let element = el
		const upperCaseTag = tag.toUpperCase()
		while (element.parentNode) {
			element = element.parentNode
			if (element.tagName === upperCaseTag) {
				return element
			}
		}
		return null
	}

	getGroupFromObject(path, data, selectedGroupName) {
		const parts = path.split('.')
		let currentLevel = data
		if(parts[0] != "") {
			while (parts.length > 0) {
				let groupNameToFind = parts.shift()
				let groupsToSearch = currentLevel.groups
				let foundGroup = null
				
				for (var i = 0; i < groupsToSearch.length; i++) {
					var group = groupsToSearch[i];
					if(group.name === groupNameToFind) {
						foundGroup = group
						break
					}
				}

				if(foundGroup) {
					currentLevel = foundGroup
				} else {
					return null
				}
			}
		}		

		const newSelectedState = currentLevel.groups.map((group) => {
			if(group.name === selectedGroupName && !group.selected) {
				group.selected = true
			} else {
				group.selected = false
			}
			return group
		})
		currentLevel.groups = newSelectedState
		return data
	}
}

export default Nav