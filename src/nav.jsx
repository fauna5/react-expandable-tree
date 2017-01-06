import Group from './group.jsx'
import React from 'react'

class Nav extends React.Component {
	render() {
		const groups = []
		this.props.data.groups.forEach(function(group) {
			groups.push(<Group group={group} actions={this.props.actions}/>)
		}, this)
		return (
			<div className="nav">
				<p>Groups</p>
				{groups}
			</div>
		)
	}
}

export default Nav