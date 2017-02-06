import Group from './group.jsx'
import React from 'react'

class Nav extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: this.props.data,
			userData: this.props.userData || [],
		}
	}

	handleItemSelected = (path, type, itemName, selected) => {
		this.updateSelectedStatus(path, itemName, selected)
		if(selected) {
			if(type === 'client'){
				this.props.onClientSelected(itemName)
				this.setState({userData: []})
			} else if (type === 'user'){
				this.props.onUserSelected(itemName)
			} else if (type === 'group'){
				this.props.onGroupSelected(itemName)
			}
		}
	}

	onDataLoaded = (data) => {
		this.setState({data: data})
	}

	onUserDataLoaded = (data) => {
		this.setState({userData: data})
	}

	render(data) {
		if(!this.state.data) {
			//loading
			return (
				<div className="nav">
					<span className="spinner">loading...</span>
				</div>
			)
		}
		const groups = []
		this.state.data.groups.forEach(function(group) {
			groups.push(<Group key={group.name} userData={this.state.userData} group={group} path="" onItemSelected={this.handleItemSelected}/>)
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

	updateSelectedStatus(path, itemName, selected) {
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
				if(listItem.id === itemName && (!listItem.selected || selected)) {
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