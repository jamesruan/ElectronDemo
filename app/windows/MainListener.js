'use strict'
const {ipcMain, BrowserWindow} = require('electron')

const init = () => {
	ipcMain.on('async_main', (e, cmd) => {
		const MainWindow = require('./MainWindow.js')
		switch (cmd) {
		case 'exit':
			let windows = BrowserWindow.getAllWindows()
			windows.forEach((win) => {
				win.close()
			})
			break
		case 'expand':
			MainWindow.expand()
			break
		case 'shrink':
			MainWindow.shrink()
			break
		default:
			console.warn('main window: unknown cmd', cmd)
		}
	})

	ipcMain.on('async_task_window', (e, cmd) => {
		//init TaskWindow here, when app is 'ready'
		const TaskWindow = require('./TaskWindow.js')
		switch (cmd) {
		case 'open':
			TaskWindow.create()
			break
		case 'close':
			TaskWindow.close()
			break
		default:
			console.warn('task window: unknown cmd', cmd)
		}
	})
}

module.exports = {
	init: init
}
