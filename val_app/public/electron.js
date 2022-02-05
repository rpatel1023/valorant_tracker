const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let backend;
backend = path.join(process.cwd(), 'backend/api.exe')
var execfile = require("child_process").execFile;
const { exec } = require('child_process');

execfile(
  backend,
  {
   windowsHide: true,
  },
  (err, stdout, stderr) => {
   if (err) {
   console.log(err);
   }
   if (stdout) {
   console.log(stdout);
   }
   if (stderr) {
   console.log(stderr);
   }
  }
 )

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({width: 1310, height: 875, resizable: false, icon: 'public/v_track.ico', title: "Valorant Tracker"});
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    exec('taskkill /f /t /im api.exe', (err, stdout, stderr) => {
      if (err) {
       console.log(err)
      return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
     });
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
  
});