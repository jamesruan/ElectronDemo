'use strict'
const {app} = require('electron')
const MainWindow = require('./windows/MainWindow.js')

app.on('ready', MainWindow.create)

app.on('window-all-closed', ()=> {
	if(process.platfrom !== 'darwin') {
		app.quit()
	}
})

app.on('activate', ()=> {
	MainWindow.create()
})
