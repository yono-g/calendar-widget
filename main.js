const electron = require('electron');
const Menu = require('menu');
const Tray = require('tray');
const nativeImage = require('native-image');

const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.

// Report crashes to our server.
electron.crashReporter.start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  var electronScreen = electron.screen;
  var size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 300,
    height: 400,
    y: 0,
    x: size.width,
    transparent: true,
    frame: false,
    resizable: false,
    show: false,
    skipTaskbar: true
  });

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Open the DevTools.
//  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  // フォーカスが外れたらウインドウを閉じる
  mainWindow.on('blur', function() {
    mainWindow.hide();
  });

  // タスクバーに格納する
  var trayIcon = new Tray(nativeImage.createFromPath(__dirname + '/image/icon.png'));

  // タスクバーのアイコンがクリックされたらウィンドウを表示する
  trayIcon.on('click', function () {
    if (mainWindow.isVisible()) {
      return mainWindow.hide();
    }
    mainWindow.show();
  });

  // タスクバーのアイコンが右クリックされたら終了のメニューを表示する
  trayIcon.on('right-click', function () {
    var menu = Menu.buildFromTemplate([
      { label: 'Quit', accelerator: 'Command+Q', click: function() { app.quit(); } }
    ]);
    this.popUpContextMenu(menu);
  });
});

// Dockに表示されないように隠す
app.dock.hide();
