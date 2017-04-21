'use strict'
const dropzone = document.getElementById('mainDropZone')
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

dropzone.onmousedown = (e) => {
	if(e.button === 1) {
		ipcRenderer.send('async_main_exit')
	} else if (e.button === 0) {
		console.log('mouse 0 down')
		ipcRenderer.send('async_task_window', 'open')
	}
}

dropzone.ondragenter = (e) => {
	e.preventDefault()
	console.log('dragenter')
	e.dataTransfer.dropEffect = 'link'
	const file = e.dataTransfer.files[0]
	console.log(file.path)
}

dropzone.ondragover = (e) => {
	e.preventDefault()
	e.dataTransfer.dropEffect = "copy"
}

dropzone.ondragleave = (e) => {
	e.preventDefault()
	console.log('dragleave')
}

dropzone.ondrop = (e) => {
	e.preventDefault()
	console.log('drop', e)
}
