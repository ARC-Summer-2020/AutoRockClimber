const { dialog } = require('electron')
const { app } = require('electron').app
var usbList=[];
module.exports = {
    template: [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Open Image',
                    accelerator: 'CmdOrCtrl+O',
                    click (menuItem, browserWindow, event) {
                        dialog.showOpenDialog(
                            { properties: [ 'openFile'], filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif'] }]}
                            ).then(result =>
                                {
                                    browserWindow.webContents.send('open-image', result)
                                }
                            ).catch(err => {
                                console.log(err)
                            })
                        }
                },
                {
                    label: 'Exit',
                    accelerator: 'CmdOrCtrl+Q',
                    role: 'close',
                    click(){
                        if (process.platform !== 'darwin') {
                            app.quit()
                        }
                        else{

                        }
                    }
                }
            ]

        },
        {
            label: 'Edit',
            submenu: [
                {role: 'undo'},
                {role: 'redo'},
                {type: 'separator'},
                {role: 'cut'},
                {role: 'copy'},
                {role: 'paste'},
                {role: 'pasteandmatchstyle'},
                {role: 'delete'},
                {role: 'selectall'}
            ]
        },
        {
            label: 'View',
            submenu: [
                {role: 'reload'},
                {role: 'forcereload'},
                {role: 'toggledevtools'},
                {type: 'separator'},
                {role: 'resetzoom'},
                {role: 'zoomin'},
                {role: 'zoomout'},
                {type: 'separator'},
                {role: 'togglefullscreen'}
            ]
        },
        {
            role: 'window',
            submenu: [
                {role: 'minimize'},
                {role: 'close'}
            ]
        },
    ]
}