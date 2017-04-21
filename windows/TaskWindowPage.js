'use strict'
const taskzone = document.getElementById('TaskZone')
const {remote, ipcRenderer} = require('electron')

const new_popup = () => {
	const {Menu, MenuItem} = remote
	let menu = new Menu()
	let debug = new MenuItem({
		role: 'toggledevtools',
		accelerator: 'F12'
	})
	menu.append(debug)
	return menu
}

window.addEventListener('contextmenu', (e) => {
	e.preventDefault()
	new_popup().popup()
})

taskzone.onmousedown = (e) => {
	if (e.button === 0) {
		console.log('mouse 0 down')
		ipcRenderer.send('async_task_window', 'close')
	}
}
