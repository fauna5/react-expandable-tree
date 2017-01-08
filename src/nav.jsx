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
	}

	onItemSelected(event) {
		const groupName = this.findParentWithTag(event.target, 'div').querySelector('.group-header').innerText
		const newSelectedState = this.state.data.groups.map((group) => {
			if(group.name === groupName && !group.selected) {
				group.selected = true
			} else {
				group.selected = false
			}
			return group
		})
		this.setState({data: {groups: newSelectedState}})
		this.state.itemSelectedCallBack(groupName)
	}

	render() {
		const groups = []
		this.state.data.groups.forEach(function(group) {
			groups.push(<Group key={group.name} group={group} actions={this.onItemSelected}/>)
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
}

export default Nav