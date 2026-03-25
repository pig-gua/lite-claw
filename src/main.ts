import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import * as modelService from './service/model-service';
import * as toolService from './service/tool-service';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    // 初始化窗口大小
    width: 1024,
    height: 768,
    // 最小窗口大小
    minWidth: 1024,
    minHeight: 768,
    // 居中显示窗口
    center: true,
    // 隐藏标题栏
    titleBarStyle: 'hidden',
    ...(process.platform !== 'darwin' ? { titleBarOverlay: true } : {}),
    // 隐藏菜单栏
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  // Open the DevTools. Ctrl + Shift +I 可以手动打开 DevTools。
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// 模型服务 IPC 事件处理
ipcMain.handle('modelService:getModels', () => {
  return modelService.getModels();
});

ipcMain.handle('modelService:addModel', (_, model) => {
  return modelService.addModel(model);
});

ipcMain.handle('modelService:updateModel', (_, model) => {
  return modelService.updateModel(model);
});

ipcMain.handle('modelService:deleteModel', (_, name) => {
  return modelService.deleteModel(name);
});

ipcMain.handle('modelService:testModelService', (_, model) => {
  return modelService.testModelService(model);
});

// 工具服务 IPC 事件处理
ipcMain.handle('toolService:getMcpServers', () => {
  return toolService.getMcpServers();
});

ipcMain.handle('toolService:addMcpServer', (_, serverConfig) => {
  return toolService.addMcpServer(serverConfig);
});

ipcMain.handle('toolService:updateMcpServer', (_, serverConfig) => {
  return toolService.updateMcpServer(serverConfig);
});

ipcMain.handle('toolService:deleteMcpServer', (_, name) => {
  return toolService.deleteMcpServer(name);
});

ipcMain.handle('toolService:testMcpServer', (_, serverConfig) => {
  return toolService.testMcpServer(serverConfig);
});
