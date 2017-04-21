'use strict'
const {BrowserWindow} = require('electron')
const MainListener = require('./MainListener.js')
const path = require('path')
const url = require('url')

const WIDTH = 80
const HEIGHT = 80
const FOCUSABLE = process.platform === 'linux' ? true : false

let win = null

const init = () => {
	if(win == null) {
		win = new BrowserWindow({
			width: WIDTH,
			height: HEIGHT,
			center: true,
			show: false,
			frame: false,
			transparent: true,
			backgroundColor: '#FF005A9C',
			skipTaskbar: true,
			alwaysOnTop: true,
			resizable: false,
			focusable: FOCUSABLE
		})

		win.loadURL(url.format({
			pathname: path.join(__dirname, 'MainWindow.html'),
			protocol: 'file',
			slashes: true
		}))

		win.on('ready-to-show', () => {
			win.show()
		})

		win.on('closed', () => {
			win = null
		})

		MainListener.init()
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
