import React from "react"
import ReactDOM from "react-dom"

import styles from "Styles/apps/index.scss"

class App extends React.Component {
	render() {
		return (
		<div className={styles.app}></div>)
	}
}

document.addEventListener("DOMContentLoaded", () => {
	ReactDOM.render(<App />, document.getElementById("mount"))
})
