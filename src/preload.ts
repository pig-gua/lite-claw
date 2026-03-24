// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';

// 模型类型定义
type Model = {
  name: string;
  description: string;
  endpoint: string;
  model: string;
  token: string;
  headers: Record<string, string>;
};

// 模型服务
// 渲染进程调用方法: window.modelService.getModels()
contextBridge.exposeInMainWorld('modelService', {
  getModels: (): Promise<Model[]> => ipcRenderer.invoke('modelService:getModels'),
  addModel: (model: Model): Promise<void> => ipcRenderer.invoke('modelService:addModel', model),
  updateModel: (model: Model): Promise<void> => ipcRenderer.invoke('modelService:updateModel', model),
  deleteModel: (name: string): Promise<void> => ipcRenderer.invoke('modelService:deleteModel', name),
  testModelService: (model: Model): Promise<boolean> => ipcRenderer.invoke('modelService:testModelService', model)
});

