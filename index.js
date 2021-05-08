const { app, BrowserWindow } = require('electron')
const path = require('path')
const electron = require('electron')

let window = null

function createWindow () {
    window = new BrowserWindow({
        width: 800,
        height: 479,
        resizable: false,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false
        },
        frame: true,


    })

    window.loadFile('index.html').then(() => console.log("Loaded"))
    // window.setMenu(null)


}

electron.ipcMain.on('close-window', ()=>{
    window.close()
})

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

