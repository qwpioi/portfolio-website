// 工具图标类型定义

export interface ToolIcon {
  id: string;                 // 唯一 ID
  icon: string;               // 图标 URL
  name: string;               // 工具名称（悬浮展示）
  description: string;        // 工具简介
  officialUrl?: string;       // 官网链接（V1.1 版本）
}
