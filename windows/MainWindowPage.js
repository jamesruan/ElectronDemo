'use strict'
const dropzone = document.getElementById('mainDropZone')
const {remote, ipcRenderer} = require('electron')
const Mousetrap = require('mousetrap')

const new_popup = () => {
	const {Menu, MenuItem} = remote
	let menu = new Menu()
	let debug = new MenuItem({
		role: 'toggledevtools'
	})
	menu.append(debug)
	return menu
}

window.addEventListener('contextmenu', (e) => {
	e.preventDefault()
	new_popup().popup()
})

Mousetrap.bind('f12', () => {
	console.log('key F12 pressed')
})

const expand = () => {
	
	ipcRenderer.send('async_main', 'expand')
	dropzone.onmouseover = null
}

const shrink = () => {
	ipcRenderer.send('async_main', 'shrink')
	dropzone.onmouseover = expand
}

dropzone.onmouseover = expand
dropzone.onmouseout = shrink

dropzone.onmousedown = (e) => {
	if(e.button === 1) {
		ipcRenderer.send('async_main', 'exit')
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
