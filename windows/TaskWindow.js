'use strict'
const {BrowserWindow} = require('electron')
const url = require('url')
const path = require('path')

let win = null

const init = () => {
	if(win == null) {
		const {width, height} = require('electron').screen.getPrimaryDisplay().workAreaSize
		win = new BrowserWindow({
			width: width,
			height: height,
			center: true,
			show: false,
			frame: false,
			transparent: true,
			backgroundColor: '#40FFFFFF',
			skipTaskbar: true,
			alwaysOnTop: false,
			resizable: false,
			fullscreen: true
		})

		win.loadURL(url.format({
			pathname: path.join(__dirname, 'TaskWindow.html'),
			protocol: 'file',
			slashes: true
		}))

		win.on('ready-to-show', () => {
			win.show()
		})

		win.on('closed', () => {
			win = null
		})

	}
	return win
}

module.exports = {
	create: () => {
		return init()
	},
	close: () => {
		if (win != null) {
			win.close()
		}
	}
}
