# lite-claw

一个基于 Electron + TypeScript + Vite 的桌面应用项目。

## 项目简介

该项目是一个使用 Electron 框架开发的桌面应用，结合了 TypeScript 和 Vite 构建工具，提供了现代化的开发体验。

## 技术栈

- **Electron**: 跨平台桌面应用框架
- **TypeScript**: 类型安全的 JavaScript 超集
- **Vite**: 现代前端构建工具
- **Electron Forge**: Electron 应用打包和分发工具

## 安装

本项目使用 `npm` 作为包管理器，请确保已安装 Node.js 环境。

```bash
# 安装依赖
npm install
```

## 运行

```bash
# 启动开发模式
npm start
```

## 构建与打包

```bash
# 制作安装包
npm run make
```

## 项目结构

```
lite-claw/
├── src/                # 源代码目录
│   ├── main.ts         # 主进程代码
│   ├── preload.ts      # 预加载脚本
│   ├── renderer.ts     # 渲染进程代码
│   └── index.css       # 样式文件
├── out/                # 构建输出目录
│   ├── lite-claw-win32-x64/  # 未打包的应用目录
│   └── make/           # 安装包目录
├── forge.config.ts     # Electron Forge 配置
├── package.json        # 项目配置和依赖
└── vite.*.config.ts    # Vite 配置文件
```

## 构建输出说明

构建后，`out` 目录会生成两种类型的包：

1. **未打包的应用程序目录** (`lite-claw-win32-x64/`)：
   - 可直接运行的应用程序目录
   - 包含所有必要的文件和依赖
   - 适合开发测试或直接部署
2. **安装包** (`make/squirrel.windows/x64/`)：
   - Squirrel.Windows 安装包
   - 包含安装程序和相关文件
   - 支持自动更新功能
   - 适合发布给最终用户

## 许可证

MIT License
