const fs = require('fs')
const path = require('path')
const { app } = require('electron')
const yaml = require('js-yaml');

// metadata.yaml 格式定义
export type Skill = {
    name: string
    version?: string
    description?: string
    author?: string
    useWhen?: string
    notFor?: string
    constraints?: {tools: string[]}
    errorMessage?: string
}

// 技能仓库路径
const directoryPath = path.join(app.getPath('userData'), 'skill')

// 确保目录存在
function ensureDirectory() {
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath)
    }
}

// 获取所有技能
export function getSkills(): Skill[] {
    ensureDirectory()
    const skills: Skill[] = []
    const entries = fs.readdirSync(directoryPath, { withFileTypes: true })
    
    for (const entry of entries) {
        if (entry.isDirectory()) {
            // skill名称
            const skill: Skill = {name: entry.name}
            // 元数据检查
            const metadataPath = path.join(directoryPath, entry.name, 'metadata.yaml')
            if (fs.existsSync(metadataPath)) {
                const content = fs.readFileSync(metadataPath, 'utf8')
                const skillFromMetadata = yaml.load(content) as Skill
                // 把skillFromMetadata的字段赋值给skill, 除了name字段
                if(skill.name !== skillFromMetadata.name) {
                    skill.errorMessage += 'metadata.yaml 文件中 name 字段与目录名不一致;'
                }
                skill.version = skillFromMetadata.version
                skill.description = skillFromMetadata.description
                skill.author = skillFromMetadata.author
                skill.useWhen = skillFromMetadata.useWhen
                skill.notFor = skillFromMetadata.notFor
                skill.constraints = skillFromMetadata.constraints
            } else {
                skill.errorMessage += 'metadata.yaml 文件不存在;'
            }
            // skill.md 检查
            const skillMdPath = path.join(directoryPath, entry.name, 'SKILL.md')
            if (!fs.existsSync(skillMdPath)) {
                skill.errorMessage += 'SKILL.md 文件不存在;'
            }
            skills.push(skill)
        }
    }
    
    return skills
}
