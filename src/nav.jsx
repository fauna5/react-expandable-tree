import React from 'react'

class Nav extends React.Component {
	render() {
		const groups = []
		this.props.data.groups.forEach(function(group) {
			groups.push(<div>{group.name}</div>)
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