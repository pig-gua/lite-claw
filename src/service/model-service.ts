const fs = require('fs')
const path = require('path')
const { app } = require('electron')

export type Model = {
  name: string
  description: string
  endpoint: string
  model: string
  token: string
  headers: Record<string, string>
}

// 模型配置文件路径
const filePath = path.join(app.getPath('userData'), 'model-config.json')

// 确保文件存在
function ensureFile() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({models: []}, null, 2))
  }
}

// 获取所有模型
export function getModels(): Model[] {
  ensureFile()
  return JSON.parse(fs.readFileSync(filePath, 'utf8')).models as Model[]
}

// 添加模型
export function addModel(model: Model) {
  ensureFile()
  const models = JSON.parse(fs.readFileSync(filePath, 'utf8')).models as Model[]
  if (models.find((m) => m.name === model.name)) {
    // 模型已存在，不添加
    console.log('模型已存在，不添加', model.name)
    throw new Error('模型已存在')
  }
  models.push(model)
  fs.writeFileSync(filePath, JSON.stringify({models}, null, 2))
}

// 更新模型
export function updateModel(model: Model) {
  ensureFile()
  const models = JSON.parse(fs.readFileSync(filePath, 'utf8')).models as Model[]
  const index = models.findIndex((m) => m.name === model.name)
  if (index === -1) {
    // 模型不存在，不更新
    console.log('模型不存在，不更新', model.name)
    throw new Error('模型不存在')
  }
  models[index] = model
  fs.writeFileSync(filePath, JSON.stringify({models}, null, 2))
}

// 删除模型
export function deleteModel(name: string) {
  ensureFile()
  const models = JSON.parse(fs.readFileSync(filePath, 'utf8')).models as Model[]
  const index = models.findIndex((m) => m.name === name)
  if (index === -1) {
    // 模型不存在，不删除
    console.log('模型不存在，不删除', name)
    throw new Error('模型不存在')
  }
  models.splice(index, 1)
  fs.writeFileSync(filePath, JSON.stringify({models}, null, 2))
}

// 测试模型服务
export function testModelService(model: Model): Promise<boolean> {
  console.log('测试模型服务', model);
  return new Promise((resolve) => {
    // 构造测试请求数据
    const testData = {
      model: model.model,
      messages: [
        {
          role: "user",
          content: "Hello, test message"
        }
      ],
      max_tokens: 10
    }
    
    // 解析 endpoint URL
    const url = new URL(model.endpoint)
    const isHttps = url.protocol === 'https:'
    const httpModule = isHttps ? require('https') : require('http')
    
    const options = {
      hostname: url.hostname,
      port: url.port || (isHttps ? 443 : 80),
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${model.token}`,
        ...model.headers
      }
    }
    
    // 发送测试请求
    const req = httpModule.request(options, (res: { statusCode: number }) => {
      console.log(`测试模型服务响应状态码: ${res.statusCode}`)
      if (res.statusCode === 200) {
        resolve(true)
      } else {
        resolve(false)
      }
    })
    
    req.on('error', (error: any) => {
      console.error('测试模型服务错误:', error)
      resolve(false)
    })
    
    req.write(JSON.stringify(testData))
    req.end()
  });
}
