import React from 'react'

class Caret extends React.Component {
	render() {
		let svg = ""
		if(this.props.direction === "down"){
			svg = <svg className="caret" onClick={this.props.clickAction} viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg"><path className="arrow" d="M1536 832q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z"/></svg>
		} else if(this.props.direction === "right") {
			svg = <svg className="caret" onClick={this.props.clickAction} viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg"><path d="M1280 1024q0 26-19 45l-448 448q-19 19-45 19t-45-19-19-45v-896q0-26 19-45t45-19 45 19l448 448q19 19 19 45z"/></svg>
		}
		return svg
	}
}

export default Caret