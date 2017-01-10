import CaretDown from './caretDown.jsx'
import CaretRight from './caretRight.jsx'
import Client from './client.jsx'
import Collapse from 'react-collapse'
import React from 'react'

class Group extends React.Component {
	render() {
		const clients = []
		if(this.props.group.companies) {
			this.props.group.companies.forEach(function(client) {
				clients.push(<Client client={client} key={client.name}/>)
			}, this)
		}

		const groups = []
		if(this.props.group.groups) {
			const path = this.props.path ? this.props.path + '.' + this.props.group.name : this.props.group.name
			this.props.group.groups.forEach(function(group) {
				groups.push(<Group key={group.name} group={group} path={path} onItemSelected={this.props.onItemSelected}/>)
			}, this)
		}

		const onClickFunction = () => this.props.onItemSelected(this.props.path, this.props.group.name)

		return (
			<div className={'group ' + (this.props.group.selected === true ? 'selected' : '')}>
				{this.props.group.selected === true ? <CaretDown clickAction={onClickFunction}/> : <CaretRight clickAction={onClickFunction}/>}
				<div className="group-header" onClick={onClickFunction}>
					{this.props.group.name}
				</div>
				<Collapse isOpened={this.props.group.selected || false}>
					<div className="client-container"> {/* TODO - needed? */}
						{clients}
					</div>
					<div className="group-container" style={{'marginLeft': '20px'}}>
						{groups}
					</div>
				</Collapse>
			</div>
		)
	}
}

export default Group