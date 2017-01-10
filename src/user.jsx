import CaretRight from './caretRight.jsx'
import React from 'react'

class User extends React.Component {

	render() {
		return (
			<div className="user">
				{this.props.data.userName}
			</div>
		)
	}
}

export default User