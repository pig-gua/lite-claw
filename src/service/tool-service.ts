const fs = require('fs')
const path = require('path')
const { app } = require('electron')

export type McpServer = {
    name: string
    type: string
    // streamable-http, websocket, webhook 参数
    url: string
    // stdio 参数
    command: string
    args: string[]
}

// 工具配置文件路径
const filePath = path.join(app.getPath('userData'), 'tool-config.json')

// 确保文件存在
function ensureFile() {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify({ mcpServers: [] }, null, 2))
    }
}

// 获取所有Mcp服务器
export function getMcpServers(): McpServer[] {
    ensureFile()
    return JSON.parse(fs.readFileSync(filePath, 'utf8')).mcpServers as McpServer[]
}

// 添加Mcp服务器
export function addMcpServer(serverConfig: McpServer) {
    ensureFile()
    const mcpServers = JSON.parse(fs.readFileSync(filePath, 'utf8')).mcpServers as McpServer[]
    if (mcpServers.find((m) => m.name === serverConfig.name)) {
        // 服务器已存在，不添加
        console.log('服务器已存在，不添加', serverConfig.name)
        throw new Error('服务器已存在')
    }
    mcpServers.push(serverConfig)
    fs.writeFileSync(filePath, JSON.stringify({ mcpServers }, null, 2))
}

// 更新Mcp服务器
export function updateMcpServer(serverConfig: McpServer) {
    ensureFile()
    const mcpServers = JSON.parse(fs.readFileSync(filePath, 'utf8')).mcpServers as McpServer[]
    const index = mcpServers.findIndex((m) => m.name === serverConfig.name)
    if (index === -1) {
        // 服务器不存在，不更新
        console.log('服务器不存在，不更新', serverConfig.name)
        throw new Error('服务器不存在')
    }
    mcpServers[index] = serverConfig
    fs.writeFileSync(filePath, JSON.stringify({ mcpServers }, null, 2))
}

// 删除Mcp服务器
export function deleteMcpServer(name: string) {
    ensureFile()
    const mcpServers = JSON.parse(fs.readFileSync(filePath, 'utf8')).mcpServers as McpServer[]
    const index = mcpServers.findIndex((m) => m.name === name)
    if (index === -1) {
        // 服务器不存在，不删除
        console.log('服务器不存在，不删除', name)
        throw new Error('服务器不存在')
    }
    mcpServers.splice(index, 1)
    fs.writeFileSync(filePath, JSON.stringify({ mcpServers }, null, 2))
}