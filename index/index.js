
const ipcRenderer = require('electron').ipcRenderer;

var camera, scene, renderer,rightArm;
ipcRenderer.on('open-image', (event,image) => {
   console.log(image)
  
})