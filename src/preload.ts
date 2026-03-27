// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';
import { Skill } from './service/skill-service';

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

// 工具服务
// 渲染进程调用方法: window.toolService.getMcpServers()
type McpServer = {
  name: string;
  type: string;
  url: string;
  command: string;
  args: string[];
};

export type Tool = {
    name: string
    description: string
    [key: string]: any
}

contextBridge.exposeInMainWorld('toolService', {
  getMcpServers: (): Promise<McpServer[]> => ipcRenderer.invoke('toolService:getMcpServers'),
  addMcpServer: (serverConfig: McpServer): Promise<void> => ipcRenderer.invoke('toolService:addMcpServer', serverConfig),
  updateMcpServer: (serverConfig: McpServer): Promise<void> => ipcRenderer.invoke('toolService:updateMcpServer', serverConfig),
  deleteMcpServer: (name: string): Promise<void> => ipcRenderer.invoke('toolService:deleteMcpServer', name),
  testMcpServer: (serverConfig: McpServer): Promise<Tool[]> => ipcRenderer.invoke('toolService:testMcpServer', serverConfig)
});

// 技能服务
// 渲染进程调用方法: window.skillService.getSkills()
contextBridge.exposeInMainWorld('skillService', {
  getSkills: (): Promise<Skill[]> => ipcRenderer.invoke('skillService:getSkills')
});
