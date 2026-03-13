// 全局配置文件
// 根据 TECH_DESIGN.md 的配置要求

import type { Settings } from './types';

/**
 * 全局配置
 */
export const config = {
  // 布局比例
  layout: {
    firstRowRatio: '1:1',        // 首行左右比例
    secondRowRatio: '5:4',       // 第二行左右比例
    projectCardRatio: '16:9',    // 项目卡片图片比例
    workImageRatio: '4:3',       // 作品图片比例
  },

  // 动画配置
  animation: {
    scrollSpeed: 30,             // 作品滚动速度（px/s）
    animationDuration: 300,      // 基础动画时长（ms）
    autoScroll: true,            // 作品自动滚动
    scrollPauseOnHover: true,    // 悬浮暂停滚动
  },

  // 响应式断点
  responsive: {
    mobileBreakpoint: 768,       // 移动端断点（px）
    tabletBreakpoint: 1024,      // 平板端断点（px）
  },

  // 展示数量
  display: {
    featuredProjects: 4,         // 精选项目展示数量
    latestArticles: 4,           // 最新文章展示数量
    worksRows: 3,                // 作品展示行数
  },

  // LocalStorage 键名
  storageKeys: {
    portfolioData: 'portfolio_data',
    editMode: 'portfolio_edit_mode',
    draftData: 'portfolio_draft_data',
  },
} as const;

/**
 * 默认设置（用于初始化）
 */
export const defaultSettings: Settings = {
  layout: {
    firstRowRatio: config.layout.firstRowRatio,
    secondRowRatio: config.layout.secondRowRatio,
    projectCardRatio: config.layout.projectCardRatio,
    workImageRatio: config.layout.workImageRatio,
  },
  animation: {
    scrollSpeed: config.animation.scrollSpeed,
    animationDuration: config.animation.animationDuration,
    autoScroll: config.animation.autoScroll,
    scrollPauseOnHover: config.animation.scrollPauseOnHover,
  },
  responsive: {
    mobileBreakpoint: config.responsive.mobileBreakpoint,
    tabletBreakpoint: config.responsive.tabletBreakpoint,
  },
};

/**
 * 默认作品集数据（用于首次加载）
 */
export const defaultPortfolioData = {
  basicInfo: {
    id: 'basic-info',
    name: '张三',
    gender: '男',
    age: 24,
    education: '本科',
    graduationSchool: 'XX 大学',
    avatar: '/assets/avatars/default.png',
    infoOrder: ['name', 'gender', 'age', 'education', 'graduationSchool'],
  },
  techStack: [] as Array<{ id: string; name: string; description: string }>,
  projectStats: {
    total: 0,
    published: 0,
  },
  toolIcons: [] as Array<{ id: string; name: string; icon: string; description: string }>,
  featuredProjects: [] as Array<{ id: string; title: string; cover: string; description: string; publishTime: string; details: string }>,
  latestArticles: [] as Array<{ id: string; title: string; cover: string; author: string; publishTime: string; summary: string; content: string }>,
  works: [] as Array<{ id: string; image: string; description: string }>,
  settings: defaultSettings,
};
