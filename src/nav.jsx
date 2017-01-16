import Group from './group.jsx'
import React from 'react'

class Nav extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: this.props.data,
			userData: this.props.userData,
			itemSelectedCallBack: this.props.onItemSelected
		}
		this.onItemSelected = this.onItemSelected.bind(this)
		this.findParentWithTag = this.findParentWithTag.bind(this)
		this.getGroupFromObject = this.updateSelectedStatus.bind(this)
	}

	onItemSelected(path, itemName) {
		this.updateSelectedStatus(path, itemName)
		this.state.itemSelectedCallBack(itemName)
	}

	render() {
		const groups = []
		this.state.data.groups.forEach(function(group) {
			groups.push(<Group key={group.name} userData={this.state.userData} group={group} path="" onItemSelected={this.onItemSelected}/>)
		}, this)
		return (
			<div className="nav">
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

	updateSelectedStatus(path, itemName) {
		const pathItems = path.split('.')
		let currentLevel = this.state.data
		if(pathItems[0] != "") {
			while (pathItems.length > 0) {
				let itemNameToFInd = pathItems.shift()
				let itemsToSearch = currentLevel.groups || currentLevel.clients
				let foundItem = null

				for (var i = 0; i < itemsToSearch.length; i++) {
					var item = itemsToSearch[i]
					if(item.name === itemNameToFInd) {
						foundItem = item
						break
					}
				}

				if(foundItem) {
					currentLevel = foundItem
				} else {
					return
				}
			}
		}

		if(currentLevel.groups || currentLevel.clients){
			//it's not a leaf node, close other items in the group
			let list = currentLevel.groups || currentLevel.clients
			list = list.map((listItem) => {
				if(listItem.name === itemName && !listItem.selected) {
					listItem.selected = true
				} else {
					listItem.selected = false
				}
				return listItem
			})
			this.setState({data: this.state.data})
		} else {
			const updatedData = this.state.userData.map((user) => {
				if(user.userName === itemName && !user.selected) {
					user.selected = true
				} else {
					user.selected = false
				}
				return user
			})
			this.setState({userData: updatedData})
		}
	}
}

export default Nav