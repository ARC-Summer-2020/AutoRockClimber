
const ipcRenderer = require('electron').ipcRenderer;

ipcRenderer.on('open-image', (event,image) => {
   console.log(image)
  
})