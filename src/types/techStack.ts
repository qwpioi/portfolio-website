// 技术栈类型定义

export type Proficiency = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface TechStackItem {
  id: string;                 // 唯一 ID
  name: string;               // 技术名称
  icon?: string;              // 图标 URL
  description: string;        // 简介（悬浮展示）
  proficiency?: Proficiency;  // 熟练度（V1.1 版本）
  projectId?: string;         // 关联项目 ID（点击跳转）
}
