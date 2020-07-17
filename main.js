// Modules to control application life and create native browser window
const electron = require('electron')
const {app, BrowserWindow,Menu,ipcMain} = require('electron')
const menuTemplate=require('./menu/menu.js').template
const { dialog } = require('electron')
var mainWindow=null;
function createWindow () {
  mainWindow = new BrowserWindow({webPreferences: {
    nodeIntegration: true
  }});
  mainWindow.loadFile('./index/index.html')
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', function () {
    mainWindow = null
  })
    let menu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menu);
}
app.on('ready', createWindow)
// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
