/**
 * The preload script runs before. It has access to web APIs
 * as well as Electron's renderer process modules and some
 * polyfilled Node.js functions.
 * 
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('pipeline', {
    trigger: (command) => ipcRenderer.invoke('command', command),
    http: (userId) => ipcRenderer.invoke('http', userId),
    mvnBuild: (path) => ipcRenderer.invoke('mvnBuild', { path: path }),
    handleMvnResponse: (callback) => ipcRenderer.on('status', callback),
    fillServices: (path) => ipcRenderer.invoke('fillServices', { path: path })

})