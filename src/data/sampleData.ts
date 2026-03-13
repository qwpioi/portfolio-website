// 示例数据

import type { TechItem, StatData, ToolItem, MediaTag, Project, PortfolioItem, Article } from '@/types/portfolio';

export const sampleTechs: TechItem[] = [
  { id: '1', name: 'React', icon: '⚛️', color: '#61dafb' },
  { id: '2', name: 'Next.js', icon: '▲', color: '#000000' },
  { id: '3', name: 'TypeScript', icon: '📘', color: '#3178c6' },
  { id: '4', name: 'Node.js', icon: '🟢', color: '#339933' },
  { id: '5', name: 'Python', icon: '🐍', color: '#3776ab' },
  { id: '6', name: 'Docker', icon: '🐳', color: '#2496ed' },
];

export const sampleStats: StatData[] = [
  { label: '总项目数', value: 50, suffix: '+', color: 'text-blue-400' },
  { label: '已发布', value: 35, color: 'text-green-400' },
  { label: '经验', value: 3, suffix: '年+', color: 'text-purple-400' },
];

export const sampleTools: ToolItem[] = [
  { id: '1', name: 'Git', icon: '📦', color: '#f05032', url: 'https://git-scm.com' },
  { id: '2', name: 'VSCode', icon: '💻', color: '#007acc', url: 'https://code.visualstudio.com' },
  { id: '3', name: 'Figma', icon: '🎨', color: '#f24e1e', url: 'https://figma.com' },
  { id: '4', name: 'Terminal', icon: '⌨️', color: '#28a745' },
  { id: '5', name: 'Chrome', icon: '🌐', color: '#4285f4', url: 'https://chrome.com' },
];

export const sampleMediaTags: MediaTag[] = [
  { name: 'Figma', icon: '🎨' },
  { name: 'Sketch', icon: '✏️' },
  { name: 'Adobe CC', icon: '📷' },
];

export const sampleProjects: Project[] = [
  {
    id: '1',
    title: '电商平台',
    description: '全栈电商平台，支持购物车、支付、订单管理',
    category: 'Web 应用',
    image: 'https://picsum.photos/400/500?random=1',
  },
  {
    id: '2',
    title: '数据可视化',
    description: '企业级数据分析仪表板',
    category: '数据可视化',
    image: 'https://picsum.photos/400/500?random=2',
  },
  {
    id: '3',
    title: '移动应用',
    description: '跨平台移动应用（React Native）',
    category: '移动应用',
    image: 'https://picsum.photos/400/500?random=3',
  },
  {
    id: '4',
    title: 'AI 助手',
    description: '基于大语言模型的智能助手',
    category: '人工智能',
    image: 'https://picsum.photos/400/500?random=4',
  },
];

export const samplePortfolioItems: PortfolioItem[] = [
  {
    id: '1',
    image: 'https://picsum.photos/400/300?random=10',
    title: '品牌设计',
    description: '企业品牌形象设计',
  },
  {
    id: '2',
    image: 'https://picsum.photos/400/300?random=11',
    title: 'UI 设计',
    description: '移动应用界面设计',
  },
  {
    id: '3',
    image: 'https://picsum.photos/400/300?random=12',
    title: '网页设计',
    description: '响应式网站设计',
  },
  {
    id: '4',
    image: 'https://picsum.photos/400/300?random=13',
    title: '插画设计',
    description: '商业插画创作',
  },
  {
    id: '5',
    image: 'https://picsum.photos/400/300?random=14',
    title: '3D 建模',
    description: '产品 3D 渲染',
  },
  {
    id: '6',
    image: 'https://picsum.photos/400/300?random=15',
    title: '动效设计',
    description: '交互动效设计',
  },
];

export const sampleArticles: Article[] = [
  {
    id: '1',
    title: 'React 18 新特性详解',
    description: '深入解析 React 18 的并发渲染、自动批处理等新特性',
    category: '技术文章',
    image: 'https://picsum.photos/400/250?random=20',
    date: '2026-03-10',
    author: '左百智',
  },
  {
    id: '2',
    title: 'TypeScript 高级技巧',
    description: '提升代码质量的 TS 高级类型技巧',
    category: '技术文章',
    image: 'https://picsum.photos/400/250?random=21',
    date: '2026-03-08',
    author: '左百智',
  },
  {
    id: '3',
    title: '前端性能优化指南',
    description: '从加载速度到渲染性能的全方位优化',
    category: '性能优化',
    image: 'https://picsum.photos/400/250?random=22',
    date: '2026-03-05',
    author: '左百智',
  },
  {
    id: '4',
    title: 'CSS Grid 完全指南',
    description: '掌握现代 CSS 布局利器',
    category: 'CSS',
    image: 'https://picsum.photos/400/250?random=23',
    date: '2026-03-01',
    author: '左百智',
  },
  {
    id: '5',
    title: 'Node.js 最佳实践',
    description: '后端开发的经验总结',
    category: '后端开发',
    image: 'https://picsum.photos/400/250?random=24',
    date: '2026-02-28',
    author: '左百智',
  },
];
