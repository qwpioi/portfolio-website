// 核心类型导出
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { BasicInfo, ContactInfo } from './basicInfo';
import type { TechStackItem, Proficiency } from './techStack';
import type { ProjectStats, Project } from './project';
import type { ToolIcon } from './toolIcon';
import type { Article } from './article';
import type { WorkItem } from './work';
import type {
  Settings,
  LayoutSettings,
  AnimationSettings,
  ResponsiveSettings
} from './settings';

export type { BasicInfo, ContactInfo } from './basicInfo';
export type { TechStackItem, Proficiency } from './techStack';
export type { ProjectStats, Project } from './project';
export type { ToolIcon } from './toolIcon';
export type { Article } from './article';
export type { WorkItem } from './work';
export type {
  Settings,
  LayoutSettings,
  AnimationSettings,
  ResponsiveSettings
} from './settings';

// 核心根模型
export interface PortfolioData {
  basicInfo: BasicInfo;       // 基础信息
  techStack: TechStackItem[]; // 技术栈
  projectStats: ProjectStats; // 项目统计
  toolIcons: ToolIcon[];      // 常用工具图标
  featuredProjects: Project[];// 精选项目
  latestArticles: Article[];  // 最新文章
  works: WorkItem[];          // 作品展示
  settings: Settings;         // 全局设置
}

/* eslint-enable @typescript-eslint/no-unused-vars */
