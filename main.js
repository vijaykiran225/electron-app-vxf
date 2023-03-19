// Modules to control application life and create native browser window
const {app, BrowserWindow,ipcMain,Notification} = require('electron')
const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })




  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

function doAction(event, title) {
  const fs = require('fs');

  try {
    const data = fs.readFileSync(`/Users/vj/Documents/${title}`, 'utf8');
    return (data);
  } catch (err) {
    return (err);
  }

}


async function makeHTTPcall(event, userId) {
  // body...
  var axios = require('axios');

  var config = {
    method: 'get',
    url: `https://jsonplaceholder.typicode.com/users/${userId}`,
    headers: { }
  };

  try{
    let response = await axios(config)
    let data = JSON.stringify(response.data);
    // console.log(data);
    const NOTIFICATION_TITLE = 'Your Buddy'
    const NOTIFICATION_BODY = 'HTTP call returned 200 data'

    new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })
    
    return data;
  }catch( error) {
    console.log(error);
    const NOTIFICATION_TITLE = 'Your Buddy'
    const NOTIFICATION_BODY = `HTTP call failed ${error.response.status}`

    new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })
    return error.response.status;
  }

}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  
  ipcMain.handle('command', doAction);

  ipcMain.handle('http', makeHTTPcall);


  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
