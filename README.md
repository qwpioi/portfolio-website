# 个人作品集网站

基于 React + TypeScript + Vite + Tailwind CSS 开发的个人作品集展示网站。

## 🎯 项目特点

- **五行布局**：严格的五行布局设计，展示个人核心信息
- **LocalStorage**：本地存储，无需后端
- **响应式设计**：适配 PC/平板/手机
- **交互动画**：流畅的悬浮、点击、滚动效果
- **本地管理**：隐藏式内容管理入口

## 🚀 技术栈

| 类别 | 技术 |
|------|------|
| 核心框架 | React 18+ |
| 开发语言 | TypeScript |
| 构建工具 | Vite 5.x |
| UI 组件库 | Ant Design 5.x（待安装） |
| 样式方案 | Tailwind CSS 3.x |
| 动画处理 | GSAP + CSS3 |
| 状态管理 | Context API + useReducer |
| 数据存储 | LocalStorage |

## 📦 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 📁 项目结构

```
portfolio-website/
├── public/
│   └── assets/              # 静态资源
│       ├── avatars/         # 头像
│       ├── projects/        # 项目图片
│       ├── articles/        # 文章图片
│       └── works/           # 作品图片
├── src/
│   ├── components/
│   │   ├── common/          # 通用组件
│   │   ├── layout/          # 布局组件
│   │   └── modules/         # 业务模块组件
│   ├── context/             # 状态管理
│   ├── hooks/               # 自定义 Hooks
│   ├── utils/               # 工具函数
│   ├── types/               # TypeScript 类型
│   ├── pages/               # 页面组件
│   ├── styles/              # 全局样式
│   ├── config.ts            # 全局配置
│   ├── App.tsx              # 根组件
│   └── main.tsx             # 入口文件
├── tailwind.config.js       # Tailwind 配置
├── vite.config.ts           # Vite 配置
└── package.json
```

## 🎨 五行布局

```
┌─────────────────────────────────────────┐
│ 第一行：基础信息 + 技术栈 (1:1)          │
├─────────────────────────────────────────┤
│ 第二行：项目统计 + 工具图标 (5:4)        │
├─────────────────────────────────────────┤
│ 第三行：精选项目 (4 个卡片)              │
├─────────────────────────────────────────┤
│ 第四行：最新文章 (4 个卡片)              │
├─────────────────────────────────────────┤
│ 第五行：作品展示 (三行滚动图片)          │
└─────────────────────────────────────────┘
```

## 📝 开发规范

- 使用 TypeScript，禁止使用 `any`
- 组件使用函数式 + Hook
- 样式优先使用 Tailwind CSS
- 代码格式化：Prettier
- 代码检查：ESLint

## 📄 相关文档

- [PRD.md](../PRD.md) - 产品需求文档
- [TECH_DESIGN.md](../TECH_DESIGN.md) - 技术设计文档
- [AGENTS.md](../AGENTS.md) - AI 执行规则

## 🚧 开发进度

- [x] 项目初始化
- [x] Tailwind CSS 配置
- [x] TypeScript 类型定义
- [x] 核心 Hooks（useLocalStorage）
- [x] 全局 Context（DataContext, EditContext）
- [x] 通用组件（BackToTop, LoadingSkeleton）
- [ ] 五行布局组件
- [ ] 业务模块组件
- [ ] 本地管理界面
- [ ] 响应式优化
- [ ] 性能优化

## 📦 待安装依赖

```bash
# UI 组件库
npm install antd @ant-design/icons

# 动画库
npm install gsap

# 工具库
npm install lodash-es
```

## 🌐 部署

### Vercel 部署

1. 安装 Vercel CLI
```bash
npm i -g vercel
```

2. 部署
```bash
vercel
```

### Netlify 部署

1. 构建
```bash
npm run build
```

2. 上传 `dist` 文件夹到 Netlify

## 📝 License

MIT
