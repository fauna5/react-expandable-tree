import CaretRight from './caretRight.jsx'
import CaretDown from './caretDown.jsx'
import Collapse from 'react-collapse'
import React from 'react'
import User from './user.jsx'

class Client extends React.Component {

	constructor() {
		super()
		this.state = {opened: false}
		this.headerClicked = this.headerClicked.bind(this)
	}

	headerClicked() {
		this.setState({opened: !this.state.opened})
	}


	render() {
		const users = []
		this.props.userData.forEach(function(user) {
			users.push(<User key={user.userName} data={user}></User>)
		}, this); 

		return (
			<div className={'client ' + (this.state.opened ? 'selected' : '')}>
				<div className="client-header" onClick={this.headerClicked}>
					{this.state.opened ? <CaretDown clickAction={this.headerClicked}/> : <CaretRight clickAction={this.headerClicked}/>}
					<span>{this.props.client.name}</span>
					<span className="client-active">ACTIVE</span>
				</div>
				<Collapse isOpened={this.state.opened}>
					<div className="user-container">					
						{users}
					</div>
				</Collapse>
			</div>
		)
	}
}

export default Client