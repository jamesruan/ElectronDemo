'use strict'
const {globalShortcut, BrowserWindow} = require('electron')
const MainListener = require('./MainListener.js')
const path = require('path')
const url = require('url')

const WIDTH = 80
const HEIGHT = 80
const LIST_WIDTH = 160
const LIST_HEIGHT = 320
const FOCUSABLE = process.platform === 'linux' ? true : false

let win = null

const init = () => {
	if(win == null) {
		const {width, height} = require('electron').screen.getPrimaryDisplay().workAreaSize
		win = new BrowserWindow({
			width: WIDTH,
			height: HEIGHT,
			x: width - LIST_WIDTH,
			y: height - LIST_HEIGHT,
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
		globalShortcut.register('CommandOrControl+F1', () => {
			console.log('^F1 pressed')
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
	},
	expand: () => {
		if (win != null) {
			win.setSize(LIST_WIDTH, LIST_HEIGHT)
		}
	},
	shrink: () => {
		if (win != null) {
			win.setSize(WIDTH, HEIGHT)
		}
	},
}
